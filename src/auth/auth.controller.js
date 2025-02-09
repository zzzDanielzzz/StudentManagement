import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const registerStudent = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture
        data.role = "STUDENT_ROLE"
        const user = await User.create(data);

        return res.status(201).json({
            message: "El usuario ha sido creado",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
}

export const registerTeacher = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture
        data.role = "TEACHER_ROLE"
        const user = await User.create(data);

        return res.status(201).json({
            message: "El usuario ha sido creado",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        });
    }
}


export const login = async (req, res) =>{
    const {email, username, password} = req.body
    try {
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if (!user) {
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)
        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: err.message
            })
        }
        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture,
                role: user.role

            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}