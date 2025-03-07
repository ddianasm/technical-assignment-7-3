export type MealType = {
    idMeal: string
    strMeal: string
    strDrinkAlternate: string | null
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string | null
    strIngredient1: string | null
    strIngredient2: string | null
    strIngredient3: string | null
    strIngredient4: string | null
    strSource: string | null
}

export type MealResponse = MealType[]