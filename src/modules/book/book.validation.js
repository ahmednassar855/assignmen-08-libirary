import Joi from "joi";

 
 export const addBookSchema = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    category : Joi.string().min(3).max(20).required(),
    code : Joi.string().min(3).max(20).required(),
    isReserved : Joi.boolean().default(false),
    created_by : Joi.string(),
    reserved_by : Joi.string(),
    fine_rate : Joi.number().min(0).max(100).default(0),
    fine: Joi.number().min(0).max(100).default(0),
    late: Joi.number().min(0).max(100).default(0),
    reservedDate : Joi.string(),
    returnedDate : Joi.string(),
 })

