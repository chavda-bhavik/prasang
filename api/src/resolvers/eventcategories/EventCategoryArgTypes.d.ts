export interface addCategory {
  name: string;
  image: any;
  description: string;
}
export interface editCategory {
  categoryId: string;
  name?: string;
  image?: string;
}
export interface deleteCategory {
  categoryId: string;
}
export interface fetchCategory {
  categoryId?: string;
}
