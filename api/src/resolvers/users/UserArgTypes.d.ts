export interface addUser {
    data : {
        name:string
        email:string
        password:string
        username:string
        contactNo:string
        image:any
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
        image:any
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
export interface enableUser {
    data : {
        userId:string,
        IsEnable:boolean
    }
}

export interface changePassword {
    data : {
        password:string,
        oldPassword:string
    }
}
export interface forgotPasswords {
    data : {
        email:string
    }
}

export interface forgotPassword {
    data:{
        email:string,
        password:string
    }
}