import { useEffect, useState } from "react";
import { mealTableStore } from "../stores/MealTableStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MealResponse } from "../types/meals";

export const useLoadMeals = () => {
    const [debouncedSearch, setDebouncedSearch] = useState(mealTableStore.searchValue)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(mealTableStore.searchValue);
        }, 1000);

        return () => clearTimeout(handler);
    }, [mealTableStore.searchValue])


    return useQuery({
        queryKey: ['meals', debouncedSearch],
        queryFn: async (): Promise<MealResponse> => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearch}`,
            )
            return await response.json().then(res => res.meals)
        },
        placeholderData: keepPreviousData,
    })
}