import { mealTableStore } from "../stores/MealTableStore";
import { MealResponse, MealType } from "../types/meals";


export function getMealIngredients(meal: MealType | undefined) {
    if (!meal) return [];

    // return Object.entries(meal)
    //     .filter(([key, value]) => key.includes('strIngredient') && value)
    //     .map(([_, value]) => value);

    return Object.keys(meal)
        .filter(key => key.startsWith('strIngredient') && meal[key as keyof MealType])
        .map((key) => meal[key as keyof MealType]);

}

export const getSelectedMeals = (list: MealResponse | undefined) => {
    if (!list) return []
    return list.filter(meal => mealTableStore.selected.includes(meal.idMeal))
}


export const getSelectedIngredients = (selectedMeals: MealResponse | undefined) => {
    return [...new Set(
        getSelectedMeals(selectedMeals)
            .flatMap(meal => getMealIngredients(meal))
    )]
}