const knex = require('../database/knex')

class DishesController{
    async create (req, res){
        const { name, description, price, type, ingredients } = req.body

        await knex('dishes').insert({
            name, description, price, type, ingredients
        })

        return res.status(201).json()
    }

    async show (req, res) {
        const { id } = req.params

        const dish = await knex('dishes').where({ id })

        return res.json(dish)
    }

    async delete(request, response){
        const { id } = request.params

        await knex('dishes').where({ id }).delete()

        return response.json()
    }  
}

module.exports = DishesController