import { Router } from "express"
import { registerStudent, registerTeacher, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.post(
    "/registerStudent",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    deleteFileOnError,
    registerStudent
)

router.post(
    "/registerTeacher",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    deleteFileOnError,
    registerTeacher
)


router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login

)

export default router