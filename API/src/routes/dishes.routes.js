const { Router } = require('express')

const dishesRoutes = Router()

const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const DishesController = require('../controllers/DishesController')
const DishesPhotoController = require('../controllers/DishesPhotoController')

const dishesController = new DishesController()
const dishesPhotoController = new DishesPhotoController()

const ensureAdm = require('../middlewares/ensureAdm')
const ensureAuth = require('../middlewares/ensureAuth')

dishesRoutes.use(ensureAuth)

dishesRoutes.post('/', ensureAdm, dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/', ensureAdm, dishesController.delete)
dishesRoutes.patch('/photo/:dish_id', ensureAdm, upload.single('photo'), dishesPhotoController.update)

module.exports = dishesRoutes