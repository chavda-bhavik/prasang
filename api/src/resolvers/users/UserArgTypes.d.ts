export interface addUser {
    name:string
    email:string
    password:string
    username:string
    contactNo:string
    roleId:string
}
export interface editUser {
    userId:string
    name?:string
    email?:string
    password?:string
    username?:string
    contactNo?:string
    roleId?:string
}
export interface deleteUser {
    userId: string
}