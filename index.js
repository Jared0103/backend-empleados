import express from 'express'
import empleadosRoutes from './routes/empleadoRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()

const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/empleado', empleadosRoutes)

const PORT = process.env.PORT || 3020

app.listen(PORT, () =>{
    console.log(`executing server: ${PORT}`)
} )

