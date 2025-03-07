import { MealType } from "../types/meals";
import { filterType } from "../types/table.types";
import { action, makeAutoObservable, reaction } from "mobx"
import { MealResponse } from "../types/meals"
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'

class MealTableStore {
    filters: filterType | never[] = []
    sort: [] = []
    searchValue: string = ""
    currentPage: number = 1
    totalPages: number = 1
    itemsPerPage: number = 2
    selected: Array<MealType["idMeal"]> = []
    // data: MealResponse | undefined
    // status: "success" | "error" | "pending" = "pending"
    // error: Error | null = null
    // isFetching = false

    constructor() {
        makeAutoObservable(this, { setTotalPages: action }, { autoBind: true });
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
            this.selected.push(id);
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