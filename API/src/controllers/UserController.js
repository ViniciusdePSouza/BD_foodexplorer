const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')

class UserController {
   async create(req, res){
        const { name, email, password, isAdm } = req.body;

        const database = await sqliteConnection()
        const verifyUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(verifyUserExists){
            throw new AppError('Esse email ja está em uso!')
        }

        const hashedPassword = await hash(password, 8)

        await database.run('INSERT INTO users (name, email, password, isAdm) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, isAdm])

        return res.status(201).json()       
    }

    async update(req, res){
        const { name, email, isAdm, password, oldPassword} = req.body;
        const { id }= req.params;

        const database = await sqliteConnection()
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

        if (!user){
            throw new AppError('Usuário não encontrado')
        }

        const userEmailUpdated = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(userEmailUpdated && userEmailUpdated.id !== id) {
            throw new AppError('Email não disponível')
        }

        user.name = name ?? user.name
        user.email = email ?? user.email
        user.isAdm = isAdm ?? user.isAdm

        if(password && !oldPassword){
            throw new AppError('Informe a antiga senha, por favor')
        }

        if(password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)

            if(!checkOldPassword){
                throw new AppError('Senha inválida ')
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            isAdm = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, [user.name, user.email, user.isAdm, user.password, id])

        return res.json()
    }
}
module.exports = UserController;