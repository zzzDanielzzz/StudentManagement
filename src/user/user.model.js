import { Schema, model, version} from "mongoose";

const userSchema = Schema({ // Esquema de como se manda la informacion a la base de datos.
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    userName:{
        type: String,
        required: [true, "User name is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email es required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]

},
{
    versionKey: false,
    timeStamps: true

})

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}
export default model("User", userSchema)