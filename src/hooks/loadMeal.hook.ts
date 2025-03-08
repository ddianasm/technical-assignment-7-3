import { useQuery } from "@tanstack/react-query";
import { MealType } from "../types/meals";


const mealFetch = async (id: MealType["idMeal"]): Promise<MealType> => {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    )
    return await response
        .json()
        .then(res => {
            if (res.meals.lenght === 0) throw new Error("Meal by id not found")
            return res.meals[0]
        })
}

export const useLoadMeal = (mealId: MealType["idMeal"]) => {
    return useQuery({
        queryKey: ['meal', mealId],
        queryFn: () => mealFetch(mealId),
        enabled: !!mealId,
    })
}