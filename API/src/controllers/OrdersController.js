const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class IngredientsController {
    async create (req, res) {
        const { status, details } = req.body

        await knex('dishes').insert({
            status, details
        })

        return res.status(201).json()
    }

    async delete(request, response){
        const { id } = request.params

        await knex('orders').where({ id }).delete()

        return response.json()
    }

    async show(req, res){
        const { id } = req.params

        const ingredient = await knex('orders').where({ name }).first()

        return res.json(ingredient)
    }
}

module.exports = IngredientsController