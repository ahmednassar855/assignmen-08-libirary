import Joi from "joi";

 
 export const signupSchema = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().min(14).max(100).required(),
    phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: Joi.ref('password'),
    isVerified : Joi.boolean().default(false)
 })


 export const signinSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
 })

 export const updateUserSchema = Joi.object({
   name : Joi.string().min(3).max(20).optional(),
   age: Joi.number().min(14).max(100).optional(),
   phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).optional(),
})

 export const emailSchema = Joi.object({
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

export const passwordSchema = Joi.object({
   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   confirm_password: Joi.ref('password'),
})