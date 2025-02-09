import { Router } from "express";
import { createCourse, updateCourse, deleteCourse } from "./course.controller.js";
import { createCourseValidator, updateCourseValidator, deleteCourseValidator } from "../middlewares/validators.js";

const router = Router()

router.post(
    "/createCourse",
    createCourseValidator,
    createCourse
)

router.put(
    "/updateCourse/:id",
    updateCourseValidator,
    updateCourse
)

router.delete(
    "/deleteCourse/:id",
    deleteCourseValidator,
    deleteCourse
)

export default router