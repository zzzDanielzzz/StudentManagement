import User from "../user/user.model.js"
import Course from "../course/course.model.js"

export const emailExists = async(email = " ") => {
    const existe = await User.findOne({email})
    if (existe) {
        throw new Error(`The email ${email} is already registered`)
    }
}

export const userNameExists = async(username = " ") =>{
    const existe = await User.findOne({username})
    if (existe) {
        throw new Error(`The username ${username} is already registered`)
    }

}

export const userExists = async(uid = " ") => {
    const existe = await User.findById(uid)
    if (!existe) {
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const isTeacherValid = async (teacherId = " ") => {
    const teacher = await User.findById(teacherId);
    if (!teacher) {
        throw new Error('El profesor no existe');
    }
    if (teacher.role !== 'TEACHER_ROLE') {
        throw new Error('El usuario especificado no tiene rol de profesor');
    }
    return true;
}

export const canEnrollInCourse = async (courseId = "", userId = "") => {
    // Verificar si el curso existe y está activo
    const course = await Course.findOne({ _id: courseId, status: true });
    if (!course) {
        throw new Error('El curso no existe o no está activo');
    }

    // Verificar si el estudiante ya está inscrito en este curso
    const isEnrolled = course.student.includes(userId);
    if (isEnrolled) {
        throw new Error('El estudiante ya está inscrito en este curso');
    }

    // Verificar el límite de 3 cursos
    const user = await User.findById(userId);
    if (user.courses.length >= 3) {
        throw new Error('El estudiante ya está inscrito en el máximo de cursos permitidos (3)');
    }
    if(user.role !== "STUDENT_ROLE"){
        throw new Error("El usuario no es un estudiante")
    }

    return true;
}

export const isStudentValid = async (uid = "") => {
    const user = await User.findById(uid);
    if (!user) {
        throw new Error('El usuario no existe');
    }
    if (user.role !== 'STUDENT_ROLE') {
        throw new Error('Solo los estudiantes pueden realizar esta acción');
    }
    return true;
}

export const courseExists = async (id = "") => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error('El curso no existe');
    }
    return true;
}