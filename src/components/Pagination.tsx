import { observer } from "mobx-react-lite";
import { mealTableStore } from "../stores/MealTableStore";

export const usePagination = (list: any[] | undefined) => {
    if (!list) return []

    const totalPage = Math.ceil(list.length / mealTableStore.itemsPerPage)
    mealTableStore.setTotalPages(totalPage)

    const start = (mealTableStore.currentPage - 1) * mealTableStore.itemsPerPage
    const end = start + mealTableStore.itemsPerPage
    return list.slice(start, end)
};



export const Pagination = observer(() => {
    const { currentPage, totalPages, setPage } = mealTableStore;

    const getPages = () => {
        const pages = [];

        const generatePages = (from: number, to: number) => {
            for (let i = from; i <= to; i++) {
                pages.push(i);
            }
        }

        if (totalPages <= 10) {
            generatePages(1, totalPages)
        } else {
            if (currentPage <= 7) {
                generatePages(1, 7)
            } else {
                generatePages(currentPage - 6, currentPage)
            }

            if (currentPage < totalPages - 1) {
                pages.push("...");
            }
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {getPages().map((page, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-black" : "bg-black"
                        }`}
                    onClick={() => typeof page === "number" && setPage(page)}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
});