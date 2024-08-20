import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authService = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10)
    },
    comparePassword: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    },
    generateToken: (empleado) => {
        return jwt.sign(
            {
                id: empleado.id,
                perfil: empleado.perfil
            },

            process.env.SUPER_SECRET,
            {
                expiresIn: '1h'
            }
        )
    }
}

export default authService