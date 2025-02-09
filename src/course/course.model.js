import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timeStamps: true
})

export default model("Course", courseSchema);