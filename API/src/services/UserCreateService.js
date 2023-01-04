const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateService {
    constructor(userRepository) { 
        this.userRepository = userRepository
    }

    async execute({ name, email, password, isAdm }) {

        const verifyUserExists = await this.userRepository.findByEmail(email)

        if (verifyUserExists) {
            throw new AppError('Esse email já está em uso!')
        }

        const hashedPassword = await hash(password, 8)

        await this.userRepository.create({ name, email, password: hashedPassword, isAdm })

    }
}

module.exports = UserCreateService