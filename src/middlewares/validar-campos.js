import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Error en la validación",
            errors: errors.array().map(error => ({
                message: error.msg
            }))
        });
    }
    next();
}