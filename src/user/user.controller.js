import { hash } from "argon2";
import User from "./user.model.js"
import Course from "../course/course.model.js"

export const getUserById = async (req, res) =>{
    try {
        const { uid } = req.params;
        const user = await User.findById(uid)

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            succes: true,
            user
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
       const { limite = 5, desde = 0 } = req.query  
       const query = { status: true }

       const [total, users] = await Promise.all([
        User.countDocuments(query), // solo trae el numero de documentos activos
        User.find(query)  // Busca los documentos que esten activos
            .skip(Number(desde))
            .limit(Number(limite))
       ])
       
       return res.status(200).json({
        succes: true,
        total,
        users
       })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params

        const  user = await User.findByIdAndUpdate(uid, {status: false}, {new: true}) /*{new: true} -> nos trae el parametro actualizado */

        return res.status(200).json({
            succes: true,
            message: "Usuario eliminado",
            user
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword } = req.body

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            succes: true,
            message: "Contrasena actualizada",
            
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al actualizar la contrasena",
            error: err.message
        })
    }
}

export const enrollInCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const { courseId } = req.body;

        await Course.findByIdAndUpdate(courseId,{ $push: { student: uid } });

        await User.findByIdAndUpdate(uid, { $push: { courses: courseId } });

        return res.status(200).json({
            success: true,
            message: "Estudiante inscrito exitosamente en el curso"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al inscribir al estudiante en el curso",
            error: err.message
        });
    }
}

export const getUserCourses = async (req, res) => {
    try {
        const { uid } = req.params;
        const { limite = 5, desde = 0 } = req.query;
        const query = { student: uid, status: true };

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .select('name description teacher')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            courses
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos del estudiante",
            error: err.message
        });
    }
}


export const getTeacherCourses = async (req, res) => {
    try {
        const { uid } = req.params;
        const { limite = 10, desde = 0 } = req.query;
        const query = { teacher: uid, status: true };

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .select('name description status')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            courses
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos del profesor",
            error: err.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        
        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: "Perfil actualizado exitosamente",
            user
        });

        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el perfil",
            error: err.message
        });
    }
}
