export interface addCategory {
    name: string
    imagePath: string
}
export interface editCategory {
    categoryId: string
    name?: string
    imagePath?: string
}
export interface deleteCategory {
    categoryId: string
}
