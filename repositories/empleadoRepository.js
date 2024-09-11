import empleadoModel from "../models/empleadoModel.js";

const empleadoRepository = {
    getEmpleadoById: async (id) => {
        return await empleadoModel.getEmpleadoById(id);
    },
    getEmpleadoByCorreo: async (correo) => {
        return await empleadoModel.getEmpleadoByCorreo(correo);
    },
    createEmpleado: async (empleado) => {
        return await empleadoModel.createEmpleado(empleado);
    },
    updateEmpleado: async (id, empleado) => {
        return await empleadoModel.updateEmpleado(id, empleado);
    },
    deleteEmpleado: async (id) => {
        return await empleadoModel.deleteEmpleado(id);
    },
    obtenerEmpleados: async () => {
        return await empleadoModel.obtenerEmpleado()
    }
};

export default empleadoRepository;
