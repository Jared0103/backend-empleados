import empleadoModel from "../models/empleadoModel.js";

const empleadoRepository = {
    getEmpleadoById: async (id) => {
        await empleadoModel.getEmpleadoById(id)
    },
    createEmpleado: async (empleado) => {
        await empleado.createEmpleado(empleado)
    },
    updateEmpleado: async (id, empleado) => {
        await empleadoModel.updateEmpleado(id,empleado)
    },
    deleteEmpleado: async (id) => {
        await empleadoModel.deleteEmpleado(id)
    }
}

export default empleadoRepository