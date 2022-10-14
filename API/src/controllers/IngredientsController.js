const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class IngredientsController {
    async create (req, res) {
        const { name } = req.body

        const database = await sqliteConnection()
        const verifyIngredientExistence = await database.get('SELECT * FROM ingredients WHERE name = (?)', [name])

        if(verifyIngredientExistence){
            throw new AppError('Esse ingrediente já existe')
        }

        await database.run('INSERT INTO ingredients (name) VALUES (?)', [name])

        return res.status(201).json()
    }

    async delete(request, response){
        const { id } = request.params

        await knex('ingredients').where({ id }).delete()

        return response.json()
    }

    async show(request, response){
        const { id } = request.params

        const ingredient = await knex('ingredients').where({ id }).first()

        return response.json(ingredient)
    }
}

module.exports = IngredientsController