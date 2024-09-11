import {db} from '../config/firebase.js'

const empleadoModel = {
    getEmpleadoById: async (id) => {
        return db.collection('empleados').doc(id).get()
    },
    getEmpleadoByCorreo: async (correo) => {
        const mail = await db.collection('empleados').where('correo', '==', correo).get()
        
        if (mail.empty) {
            return null
        }

        return mail.docs[0]
    },
    createEmpleado: async (empleado) => {
        return db.collection('empleados').add(empleado)
    },
    updateEmpleado: async (id, empleado) => {
        return db.collection('empleados').doc(id).update(empleado)
    },
    deleteEmpleado: async (id) => {
        return db.collection('empleados').doc(id).delete()
    },
    obtenerEmpleado: async () => {
        const empleados = await db.collection('empleados').get()
        return empleados.docs
    }
}

export default empleadoModel