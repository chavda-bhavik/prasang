import jwt = require("jsonwebtoken");

const getUserId = (req, requireAuth = false) => {
    const header = req ? req.headers.authorization : req.connection.context.authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'myprasagsecret')
        return (<any>decoded).userId
    }

    if (requireAuth) {
        throw new Error('Authentication required')
    } 
    
    return null
}

export { getUserId as default }