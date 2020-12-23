export interface IUsers {
    userList: any[],
    error:"",
    loading:false,
    userId:null,
    enable:any
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

export interface IEvent {
    eventList: any[],
    event:{},
    eventId:string,
    loading:false,
    error:""
}

export interface IDashboard {
    dashboards:{},
    loading:false,
    error:""
}