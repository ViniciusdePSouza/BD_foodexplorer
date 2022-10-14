const knex = require('../database/knex')

class DishesController{
    async create (req, res){
        const { name, description, price, type, ingredients } = req.body

        await knex('dishes').insert({
            name, description, price, type, ingredients
        })

        return res.status(201).json()
    }
}

module.exports = DishesController