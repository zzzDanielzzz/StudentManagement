import Course from "./course.model.js";
import User from "../user/user.model.js";

export const createCourse = async (req, res) => {
    try {
        const { teacher, ...courseData } = req.body;
        
        const course = await Course.create({...courseData, teacher});

        await User.findByIdAndUpdate(teacher,{ $push: { courses: course._id } });

        const teacherData = await User.findById(teacher, 'name');

        return res.status(201).json({
            message: "Curso creado exitosamente",
            name: course.name,
            description: course.description,
            teacher: {
                uid: course.teacher,
                name: teacherData.name
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el curso",
            error: err.message
        });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const courseData  = req.body;

        const course = await Course.findByIdAndUpdate(id, courseData, { new: true });

        res.status(200).json({
            message: "Curso actualizado exitosamente",
            name: course.name,
            description: course.description
        });
    } catch (err) {
        res.status(500).json({
            message: "Error al actualizar el curso",
            error: err.message
        });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;  

        const course = await Course.findById(id);
        
        await User.updateMany({ _id: { $in: course.student } },{ $pull: { courses: id } });

         await Course.findByIdAndUpdate(id, 
            { 
                status: false,
                student: [] 
            }, 
            { new: true }
        );

        res.status(200).json({
            message: "Curso eliminado exitosamente",

        });
    } catch (err) {
        res.status(500).json({
            message: "Error al eliminar el curso",
            error: err.message
        });
    }
} 
