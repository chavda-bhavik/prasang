import jwt = require("jsonwebtoken");

const generateToken = (userId : any) => {
    const jwttoken = jwt.sign({ userId }, 'myprasagsecret', { expiresIn: '7 days' });
    return jwttoken
}

export { generateToken as default }