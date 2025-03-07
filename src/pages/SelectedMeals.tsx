import { MealCard } from "../components/MealCard"
import { useLoadMeals } from "../hooks/loadMeals.hook"

export const SelectedMeals = () => {
    const { status, data, error, isFetching } = useLoadMeals()

    return (
        <div>
            <div>Selected meals:</div>
            <div className="flex flex-col items-center w-full">
                {<div>{isFetching ? 'Background Updating...' : ' '}</div>}

                {
                    status === "pending" ? (
                        <div>Loading...</div>
                    ) :
                        status === "success" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                                {data?.map((meal, index) => (
                                    <MealCard key={index} data={meal} />
                                ))}
                            </div>
                        ) : (
                            <span>Error: {error?.message}</span>
                        )
                }
            </div>
        </div>
    )
}