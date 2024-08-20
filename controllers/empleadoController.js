import empleadoRepository from '../repositories/empleadoRepository.js'
import authService from '../services/authService.js'

const empleadoController = {
    createEmpleado: async (req, res) => {
        try {
            const empleado = req.body
            empleado.contrasena = authService.hashPassword(empleado.contrasena)
            const created = await empleadoRepository.createEmpleado(empleado)
            res.status(201).json({
                success: true,
                id: created.id
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    loginEmpleado: async (req, res) => {
        try {
            const { correo, contrasena } = req.body
            const existsCorreo = await empleadoRepository.getEmpleadoById(correo)
            if (!existsCorreo.exists) {
                return res.status(404).json({
                    success: false,
                    message: 'Empleado no existe'
                })
            }
            const empleado = existsCorreo.data()
            if (!authService.comparePassword(contrasena, empleado.contrasena)) {
                return res.status(404).json({
                    success: false,
                    message: 'Contrasena Invalida'
                })
            }
            const token = authService.generateToken(empleado)
            res.status(201).json({
                success: true,
                message: token
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default empleadoController