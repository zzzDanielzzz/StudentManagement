'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConecction } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import courseRoutes from "../src/course/course.routes.js"
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/studentManagement/v1/auth", authRoutes)
    app.use("/studentManagement/v1/user", userRoutes)
    app.use("/studentManagement/v1/course", courseRoutes)
}

const conectarDB = async () => {
    try{
        await dbConecction()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runnning on port ${process.env.PORT}`)

    }catch(err){
        console.log(`Server inist failed: ${err}`)
    }
}