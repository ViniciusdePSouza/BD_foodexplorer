const { Router } = require('express')

const usersRouter = require('./users.routes')
const ingredientsRoutes = require('./ingredients.routes')
const dishRoutes = require('./dishes.routes')

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/ingredients", ingredientsRoutes)
routes.use("/dishes", dishRoutes)

module.exports = routes