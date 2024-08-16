import express from 'express'
import empleadosRoutes from './routes/empleadoRoutes.js'

const app = express()

app.use(express.json())
app.use('/api/empleado', empleadosRoutes)

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
    console.log("🚀 ~ PORT:", PORT)
    console.log(`Server running in: ${PORT}`);
})


