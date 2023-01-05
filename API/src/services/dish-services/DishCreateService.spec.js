const DishCreateService = require('./DishCreateService')
const DishesRepositoryInMemory = require('../../repositories/DishesRepositoryInMemory')

describe('DishCreateService', () => {
    it('dish should be created', async () => {

        const dish = {
            name: "um teste",
            description: "x, w, c On the rocks",
            price: "55,55",
            type: "test",
            ingredients: ["x", "w", "c"]
        }

        const dishesRepositoryInMemory = new DishesRepositoryInMemory()
        const dishCreateService = new DishCreateService(dishesRepositoryInMemory)

        console.log(dish)
        const dishCreated = await dishCreateService.execute(dish)


        expect(dishCreated).toHaveProperty('id')
    })
})