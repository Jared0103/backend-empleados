import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.header['authorization']
    if (!token) {
        return res.status(500).json({
            success: false,
            message: 'No token provided'
        })
    }

    jwt.verify(token, process.env.SUPER_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Invalid token'
            })
        }
        req.body = decoded
       // req.empleadoId = decoded.id
       // req.perfil = decoded.id
        next()
    })
}

export default authMiddleware