// import bcrypt from 'bcryptjs';

const hashPassword = (password:string) => {
    if(password.length < 8){
        throw new Error("Password Must be 8");
    }

    // return bcrypt.hash(password,10);
    return password;
}

export { hashPassword as default }