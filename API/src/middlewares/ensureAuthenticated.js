const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')

function ensureAuthenticated(req, res, next) {
    console.log('algo')
    const authHeader = req.headers.authorization


    if (!authHeader) {
        throw new AppError('JWT Token não existe', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const subToken = verify(token, authConfig.jwt.secret)

        const data = JSON.parse(subToken.sub)

        req.user = data

        console.log(req.user.isAdm)

        if (req.user.isAdm == 1) {
            return next()
        } else {
            throw 'error'
        }
    } catch {
        throw new AppError('Apenas administradores podem inserir pratos no sistema', 401)
    }
}

module.exports = ensureAuthenticated