import { MealCard } from "../components/MealCard";
import { mealTableStore } from "../stores/MealTableStore";
import { observer } from "mobx-react-lite";
import { Pagination, usePagination } from "../components/Pagination";
import cn from "classnames"
import { useLoadMeals } from "../hooks/loadMeals.hook";
import { MealsContainer } from "../components/MealsContainer";


export const MealsPage = observer(() => {
    const { status, data, error, isFetching } = useLoadMeals()
    const paginationData = usePagination(data)

    return (
        <div>
            <h1>Meals</h1>
            <div className="flex flex-row gap-2">
                <div>Пошук: </div>
                <input
                    type="text"
                    className={cn(
                        "w-full max-w-md px-4 py-2 text-lg",
                        "border-2 border-gray-300 rounded-lg",
                        "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    )}
                    onInput={(e) => mealTableStore.setSearchValue(e.currentTarget.value)}
                />
            </div>

            <div className="flex flex-row gap-2">
                <div>Фільтри: </div>
            </div>
            <Pagination />

            <MealsContainer>
                {isFetching ? <div>Background Updating...</div> : null}

                {
                    status === "pending" ? (
                        <div>Loading...</div>
                    ) :
                        status === "success" ? (
                            paginationData?.map((meal, index) => (
                                <MealCard key={index} data={meal} />
                            ))
                        ) : (
                            <span>Error: {error?.message}</span>
                        )
                }
            </MealsContainer >
        </div >
    )
})