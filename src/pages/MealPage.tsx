import { MealType } from "../types/meals"
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from "react"
import { useParams } from 'react-router-dom'

const getMeal = async (id: MealType["idMeal"]): Promise<MealType> => {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    )
    return await response.json().then(res => {
        if (res.meals.lenght === 0) throw new Error("Meal by id not found")
        return res.meals[0]
    })
}
function useMeal(mealId: MealType["idMeal"]) {
    return useQuery({
        queryKey: ['meal', mealId],
        queryFn: () => getMeal(mealId),
        enabled: !!mealId,
    })
}

function getIngredients(data: MealType | undefined) {
    if (!data) return [];

    // return Object.entries(data)
    //     .filter(([key, value]) => key.includes('strIngredient') && value)
    //     .map(([_, value]) => value);

    return Object.keys(data)
        .filter(key => key.startsWith('strIngredient') && data[key as keyof MealType])
        .map((key) => data[key as keyof MealType]);

}

export const MealPage = () => {
    const { id } = useParams<{ id: string }>();

    const { status, data, error, isFetching } = useMeal(id!)

    const ingredients = useMemo(() => getIngredients(data), [data])

    return (
        <div>
            {
                status === "pending" ? (
                    <div>Loading...</div>
                ) :
                    status === "success" ? (
                        <div className="container mx-auto p-4">
                            <div className="flex flex-col lg:flex-row items-center">
                                <img className="w-full lg:w-1/3 rounded-lg" src={data.strMealThumb} alt={data.strMeal} />
                                <div className="lg:ml-8 mt-4 lg:mt-0">
                                    <h1 className="text-3xl font-bold">{data.strMeal}</h1>
                                    <p className="text-xl text-gray-600">Area: {data.strArea}</p>
                                    <p className="text-xl text-gray-600">Category: {data.strCategory}</p>
                                    <p className="mt-4 whitespace-pre-wrap">Recipe: {data.strInstructions}</p>
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Ingredients:</h3>
                                        <ul className="list-disc pl-5">
                                            {
                                                ingredients.map((value, index) => (
                                                    <li key={index}>{value}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    {data.strYoutube && (
                                        <div className="mt-4">
                                            <a href={data.strYoutube} target="_blank" rel="noopener noreferrer" className="text-primary-500">Watch the Meal Video</a>
                                        </div>
                                    )}
                                    {data.strTags && (
                                        <div className="mt-4">
                                            <h3 className="font-semibold">Tags:</h3>
                                            <p>{data.strTags}</p>
                                        </div>
                                    )}
                                    {data.strSource &&
                                        <div className="mt-4">
                                            <h3 className="font-semibold">Source:</h3>
                                            <a href={data.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500">Data Source</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <span>Error: {error?.message}</span>
                    )
            }
        </div>
    )
}