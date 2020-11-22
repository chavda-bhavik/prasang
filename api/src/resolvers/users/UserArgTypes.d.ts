export interface addUser {
    data : {
        name:string
        email:string
        password:string
        username:string
        contactNo:string
        roleId:string
    }
}
export interface editUser {
    data : {
        userId:string
        name?:string
        email?:string
        password?:string
        username?:string
        contactNo?:string
        roleId?:string
    }
}
export interface deleteUser {
    data : {
        userId: string
    }
}
export interface login {
    data : {
        email:string
        password:string
    }
}