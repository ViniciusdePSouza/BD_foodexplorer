const knex = require('../database/knex')

const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/diskStorage')

class IngredientsPhotoController {
    async update(req, res) {

        const diskStorage = new DiskStorage()

        const { ingredient_id } = req.params
        const photoFilename = request.file.filename 

        const ingredient = await knex('ingredients').where({ id: ingredient_id })

        if(!ingredient){
            throw new AppError('Ingrediente não existe')
        }

        if(ingredient.photo){
            await diskStorage.deleteFile(ingredient.photo)
        }

        const fileName = await diskStorage.saveFile(photoFilename)
        ingredient.photo = fileName

        await knex('ingredients').update(ingredient).where({ id: ingredient_id })

        return res.json(ingredient)
    }
}

module.exports = IngredientsPhotoController