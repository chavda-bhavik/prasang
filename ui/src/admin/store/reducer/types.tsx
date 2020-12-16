export interface IUsers {
    userList: any[]
}

export interface ICategorys {
    categoryList: any[],
    category:{},
    categoryId:string,
    loading:false,
    error:""
}

export interface IAuth {
    userList: any[],
    user:null,
    token:null,
    userId:string,
    loading:false,
    error:""
}