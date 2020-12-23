import jwt = require("jsonwebtoken");

const generateToken = (userId : any) => {
    const jwttoken = jwt.sign({ userId }, 'myprasagsecret', { expiresIn: '7 days' });
    return "Bearer "+jwttoken
}

const generateTokenPassword = (userId : any) => {
    const jwttoken = jwt.sign({ userId }, 'prasangforgotmail', { expiresIn: '1 days' });
    return jwttoken
}

export { generateTokenPassword , generateToken as default }