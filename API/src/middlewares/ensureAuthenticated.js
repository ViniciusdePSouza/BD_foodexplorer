const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError('JWT Token não existe', 401)
    }

    const [, token] = authHeader.split(' ')

    try{
       console.log({ sub: user_id } = verify(token, authConfig.jwt.secret))

       req.user = {
        id: Number(user_id)
       }

       console.log(req.user)

       return next()
    } catch {
        throw new AppError('JWT Token inválido', 401)
    }
}

module.exports = ensureAuthenticated