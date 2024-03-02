import { check, validationResult } from "express-validator"; 

// Crear Usuario
const registro = async (req, res) => {
    const { nombre, email, password } = req.body;

    await check("nombre").notEmpty().withMessage("El Nombre es Obligatorio").run(req);
    await check("email").isEmail().withMessage("El Email no existe").run(req);
    await check("password").isLength({ min: 6 }).withMessage("La Contrseña debe contener almenos 6 caracteres").run(req);
    await check("repit_password").equals(password).withMessage("Las Contrseñas no coinciden").run(req);

    let validation = validationResult(req);
    
    if(!validation.isEmpty()){
        return res.render("auth/registrarse",{
            errores: validation.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
}