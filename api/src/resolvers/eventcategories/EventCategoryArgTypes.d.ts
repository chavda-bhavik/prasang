export interface addCategory {
    name: string
    image: any
}
export interface editCategory {
    categoryId: string
    name?: string
    image?: string
}
export interface deleteCategory {
    categoryId: string
}
