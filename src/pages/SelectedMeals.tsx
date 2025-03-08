import { useMemo } from "react"
import { MealCard } from "../components/MealCard"
import { MealsContainer } from "../components/MealsContainer"
import { useLoadMeals } from "../hooks/loadMeals.hook"
import { getSelectedIngredients, getSelectedMeals } from "../utils/utils"



export const SelectedMeals = () => {
    const { status, data, error, isFetching } = useLoadMeals()
    const selectedMeals = useMemo(() => getSelectedMeals(data), [data])
    const selectedIngredients = useMemo(() => getSelectedIngredients(data), [data])

    return (
        <div>
            <div>Selected meals:</div>
            <MealsContainer>
                {isFetching ? <div>Background Updating...</div> : null}

                {
                    status === "pending" ? (
                        <div>Loading...</div>
                    ) :
                        status === "success" ? (
                            selectedMeals.map((meal, index) => (
                                <MealCard key={index} data={meal} />
                            ))
                        ) : (
                            <span>Error: {error?.message}</span>
                        )
                }
            </MealsContainer>

            <div>Selected ingredients:</div>
            <ul>
                {selectedIngredients.map((ingredient, key) => (
                    <li key={key}>{ingredient}</li>
                ))}
            </ul>
        </div>
    )
}