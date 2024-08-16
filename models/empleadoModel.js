import {db} from '../config/firebase.js'

const empleadoModel = {
    getEmpleadoById: async (id) => {
        return db.collection('empleados').doc(id).get()
    },
    createEmpleado: async (empleado) => {
        return db.collection('empleados').add(empleado)
    },
    updateEmpleado: async (id, empleado) => {
        return db.collection('empleados').doc(id).update(empleado)
    },
    deleteEmpleado: async (id) => {
        return db.collection('empleados').doc(id)
    }
}

export default empleadoModel