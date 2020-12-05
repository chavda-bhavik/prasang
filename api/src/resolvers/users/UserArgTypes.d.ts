export interface addUser {
    data : {
        name:string
        email:string
        password:string
        username:string
        contactNo:string
        IsEnable?:boolean
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
        IsEnable?:boolean
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

export interface forgotPassword {
    data:{
        email:string,
        password:string
    }
}