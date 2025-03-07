export type filterType = {
    condition: "equal" | "include" | "not_include"
    key: string,
    value: string
}