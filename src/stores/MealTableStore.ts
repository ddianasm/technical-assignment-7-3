import { MealType } from "../types/meals";
import { filterType } from "../types/table.types";
import { action, makeAutoObservable, reaction } from "mobx"

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    } as T;
}

class MealTableStore {
    filters: filterType | never[] = []
    sort: [] = []
    searchValue: string = ""
    currentPage: number = 1
    totalPages: number = 1
    itemsPerPage: number = 4
    selected: Array<MealType["idMeal"]> = []

    constructor() {
        makeAutoObservable(this, { setTotalPages: action }, { autoBind: true })

        // Отримую стейт з localStorage
        const storedData = localStorage.getItem(this.constructor.name)
        if (storedData) {
            Object.assign(this, JSON.parse(storedData))
        }

        // Зберігаю стейт
        const saveState = debounce(() => {
            localStorage.setItem(this.constructor.name, JSON.stringify(this))
        }, 500)

        reaction(
            () => JSON.stringify(this),
            () => saveState()
        )
    }

    setFilters(filters: filterType | never[]) {
        this.filters = filters;
    }

    setSort(sort: []) {
        this.sort = sort;
    }

    setSearchValue(value: string) {
        this.searchValue = value;
    }

    setPage(page: number) {
        this.currentPage = page;
    }

    setTotalPages(count: number) {
        this.totalPages = count;
    }

    toggleSelect(id: MealType["idMeal"]) {
        if (this.selected.includes(id)) {
            this.selected = this.selected.filter(item => item !== id);
        } else {
            this.selected = [...this.selected, id]
        }
    }

    isSelect(id: MealType["idMeal"]) {
        return !!this.selected.find(selectedId => selectedId === id)
    }

    clearSelection() {
        this.selected = [];
    }
}

export const mealTableStore = new MealTableStore()