import empleadoRepository from '../repositories/empleadoRepository.js';
import authService from '../services/authService.js';

const empleadoController = {
    createEmpleado: async (req, res) => {
        try {
            const empleado = req.body;
            empleado.contrasena = authService.hashPassword(empleado.contrasena);
            const created = await empleadoRepository.createEmpleado(empleado);
            const id = created.id;
            res.status(201).json({
                success: true,
                id
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    loginEmpleado: async (req, res) => {
        try {
            const { correo, contrasena } = req.body;
            const existsCorreo = await empleadoRepository.getEmpleadoByCorreo(correo);
            if (!existsCorreo) {
                return res.status(404).json({
                    success: false,
                    message: 'Empleado inexistente'
                });
            }
            const empleado = existsCorreo.data();
            if (!authService.comparePassword(contrasena, empleado.contrasena)) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña inválida'
                });
            }
            const token = authService.generateToken(empleado);
            res.status(200).json({
                success: true,
                token
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    obtenerEmpleados: async (req, res) => {
        try {
            const emppleadosDocs = await empleadoRepository.obtenerEmpleados()
            if (emppleadosDocs.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No hay empleados'
                })
            }

            const empleados = emppleadosDocs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return res.status(201).json({
                success: true,
                message: empleados
            })


        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    deleteEmpleado: async (req, res) => {
        const id = req.params.id
        try {
            const deleted = await empleadoRepository.deleteEmpleado(id)
                res.status(201).json({
                    success: true,
                    message: deleted
                });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

export default empleadoController;
