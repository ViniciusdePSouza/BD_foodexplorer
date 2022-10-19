const { Router } = require('express')

const dishesRoutes = Router()

const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const DishesController = require('../controllers/DishesController')
const DishesPhotoController = require('../controllers/DishesPhotoController')

const dishesController = new DishesController()
const dishesPhotoController = new DishesPhotoController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

dishesRoutes.post('/', ensureAuthenticated, dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.patch('/photo/:dish_id', upload.single('photo'), dishesPhotoController.update)

module.exports = dishesRoutes