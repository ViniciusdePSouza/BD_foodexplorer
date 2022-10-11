const AppError = require('../utils/AppError')

class UserController {
    create(req, res){
        const { name, email, password } = req.body;

        res.json({  name,  email, password });
    }
}

module.exports = UserController;