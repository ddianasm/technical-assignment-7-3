import { observer } from "mobx-react-lite";
import type { MealType } from "../types/meals";
import { Link } from 'react-router-dom'
import { mealTableStore } from "../stores/MealTableStore";

export const MealCard = observer(({ data: { idMeal, strMeal, strMealThumb, strCategory, strArea } }: { data: MealType }) => {

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={strMealThumb} alt={strMeal} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{strMeal}</div>
                <p className="text-gray-700 text-base">
                    <strong>Category:</strong> {strCategory}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Area:</strong> {strArea}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex flex-row">
                <Link
                    to={`/meal/${idMeal}`}
                    className="inline-block bg-primary-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                    View Recipe
                </Link>
                <div
                    className="inline-block bg-primary-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer"
                    onClick={() => mealTableStore.toggleSelect(idMeal)}
                >{mealTableStore.isSelect(idMeal) ? "Unselect" : "Select"}</div>
            </div>
        </div>
    )
})