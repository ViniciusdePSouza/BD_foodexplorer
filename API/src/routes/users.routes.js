const { Router } = require('express')

const usersRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UserController = require('../controllers/UserController')
const userController = new UserController()

usersRoutes.post('/', userController.create)
usersRoutes.put('/', ensureAuthenticated, userController.update)
usersRoutes.delete('/:id', userController.delete)

module.exports = usersRoutes