import { Router } from 'express';
import empleadoController from '../controllers/empleadoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router()

router.post('/login', empleadoController.loginEmpleado)
router.post('/create', authMiddleware, empleadoController.createEmpleado)
router.get('/get-all', authMiddleware, empleadoController.obtenerEmpleados)
router.delete('/borrar/:id', authMiddleware, empleadoController.deleteEmpleado)

export default router
