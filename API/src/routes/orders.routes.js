const { Router } = require('express')

const ordersRoutes = Router()

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

ordersRoutes.post('/:user_id', ordersController.create)
ordersRoutes.put('/:id', ordersController.update)
ordersRoutes.delete('/:id', ordersController.delete)
ordersRoutes.get('/:id', ordersController.show)
ordersRoutes.get('/', ordersController.index)

module.exports = ordersRoutes