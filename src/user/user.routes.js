import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, enrollInCourse, getUserCourses, getTeacherCourses, updateProfile } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, enrollCourseValidator, getUserCoursesValidator, getTeacherCoursesValidator, updateProfileValidator } from "../middlewares/validators.js";


const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)
router.post("/enroll/:uid", enrollCourseValidator, enrollInCourse)
router.get("/courses/:uid", getUserCoursesValidator, getUserCourses)
router.get("/teacherCourses/:uid", getTeacherCoursesValidator, getTeacherCourses)
router.put("/updateProfile/:uid", updateProfileValidator, updateProfile)

export default router