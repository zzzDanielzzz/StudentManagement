import { body, param } from "express-validator";
import { emailExists, userExists, userNameExists, isTeacherValid, canEnrollInCourse, isStudentValid, courseExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    body("userName").not().isEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("email").not().isEmpty().withMessage("El email es obligatorio"),
    body("email").isEmail().withMessage("El email no es valido"),
    body("email").custom(emailExists),
    body("username").custom(userNameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("El password debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"),
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("El email no es valido"),
    body("userName").optional().isString().withMessage("El nombre de usuario no es valido"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 4 caracteres"),
    validarCampos

]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const  deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    param("uid").custom(isStudentValid),
    validarCampos,
    deleteFileOnError
]

export const  updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("el password debe contener 8 caracteres"),
    validarCampos,
    deleteFileOnError
]

export const  createCourseValidator = [
    body('name', 'El nombre es obligatorio').exists().notEmpty(),
    body('description', 'La descripción es obligatoria').exists().notEmpty(),
    body('teacher', 'El ID del profesor es obligatorio').exists().notEmpty(),
    body('teacher', 'El ID del profesor debe ser un ID de MongoDB válido').isMongoId(),
    body('teacher').custom(isTeacherValid),
    validarCampos
]

export const enrollCourseValidator = [
    body('courseId').isMongoId().withMessage('ID de curso inválido'),
    body('courseId').custom((courseId, { req }) => canEnrollInCourse(courseId, req.params.uid)),
    param('uid').isMongoId().withMessage('ID de usuario inválido'),
    param('uid').custom(userExists),
    validarCampos
];

export const getUserCoursesValidator = [
    param('uid').isMongoId().withMessage('ID de usuario inválido'),
    param('uid').custom(userExists),
    param('uid').custom(isStudentValid),
    validarCampos
];

export const getTeacherCoursesValidator = [
    param('uid').isMongoId().withMessage('ID de usuario inválido'),
    param('uid').custom(userExists),
    param('uid').custom(isTeacherValid),
    validarCampos
];

export const updateCourseValidator = [
    param('id').isMongoId().withMessage('ID de curso inválido'),
    param('id').custom(courseExists),
    validarCampos
];

export const deleteCourseValidator = [
    param('id').isMongoId().withMessage('ID de curso inválido'),
    param('id').custom(courseExists),
    validarCampos
];

export const updateProfileValidator = [
    param('uid').isMongoId().withMessage('ID de usuario inválido'),
    param('uid').custom(userExists),
    param('uid').custom(isStudentValid),
    validarCampos
];


