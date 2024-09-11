import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    // Acceso correcto al encabezado de autorización
    const authHeader = req.headers['authorization'];

    // Verificar si el encabezado de autorización está presente
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'No authorization header provided'
        });
    }

    // Dividir el encabezado en 'Bearer' y el token
    const tokenParts = authHeader.split(' ');
    
    // Verificar que el formato del token sea correcto (debe ser 'Bearer <token>')
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token format'
        });
    }

    const token = tokenParts[1];  // Obtener el token

    // Verificar el token con jwt
    jwt.verify(token, process.env.SUPER_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Aquí puedes asignar los datos decodificados a la solicitud (req)
        req.user = decoded; // Asigna el token decodificado a `req.user`
        
        // O usa campos específicos si es necesario
        // req.empleadoId = decoded.id;
        // req.perfil = decoded.perfil;

        next();  // Continuar con la siguiente función middleware
    });
};

export default authMiddleware;
