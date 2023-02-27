import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name : {
        type: String,
        minlength : 3,
        maxLength : 20,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    age : {
        type : Number,
        min: 14,
        max : 100
    },
    phone: {
        type: String,
        min: 7,
        max : 14,
    },
    password : {
        type: String,
        required : true
    },
    isVerified: {
        type: Boolean,
        default: false
    }

} , { timestamps : true })

export const userModel = mongoose.model('user' , userSchema)
