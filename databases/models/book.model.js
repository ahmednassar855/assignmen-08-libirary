import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name : {
        type: String,
        minlength : 3,
        maxLength : 20,
        required : true,
        unique: true
    },
    category : {
        type: String,
        minlength : 3,
        maxLength : 20,
        required : true
    },
    code : {
        type : String,
        minlength : 3,
        maxLength : 50,
        required : true
    },
    isReserved : {
        type : Boolean,
        default: false,
    },
    reservedDate : {
        type : String,
        default : "date",
    },
    returnedDate : {
        type : String,
        default : "date",
    },
    late : {
        type : Number,
        default : 0,
    },
    fine_rate : {
        type : Number,
        default : 0,
    },
    fine : {
        type : Number,
        default : 0,
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref : 'user',
        required: true
    },
    reserved_by : {
        type: mongoose.Types.ObjectId,
        ref : 'user',
        default : null
    }
} , { timestamps : true })

export const bookModel = mongoose.model('book' , bookSchema)
