const { Router } = require('express')

const ingredientsRoutes = Router()

const IngredientsController = require('../controllers/IngredientsController')
const ingredientsController = new IngredientsController()

ingredientsRoutes.post('/', ingredientsController.create)
ingredientsRoutes.delete('/:id', ingredientsController.delete)
ingredientsRoutes.get('/', ingredientsController.show)

module.exports = ingredientsRoutes