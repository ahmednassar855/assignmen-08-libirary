import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import { userModel } from '../../../databases/models/user.model.js';
import { sendEmail, sendEmailForResetPassword } from './../../emails/user.email.js';


export const signUp = asyncHandler(async (req, res) => {
    const { name, email, age, phone, password, confirm_password } = req.body;
    let checkEmailIsExist = await userModel.findOne({ email });
    if (checkEmailIsExist) return res.json({ message: "This email is already reserved" })
    if (password !== confirm_password) return res.json({ message: "passwords are not matching" })
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
    let newUser = await userModel.insertMany({ name, email, age, phone, password: hash } )
    res.json({ message: "Added user successfully", newUser })
    sendEmail({ email })
})

export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let userIsExist = await userModel.findOne({ email });
    if (!userIsExist || !(await bcrypt.compare(password, userIsExist.password))) {
        return res.json({ message: "Incorrect email or password" })
    }
    userIsExist['password'] = undefined;   // delete password from userIsExist object
    if (userIsExist.isVerified !== true) return res.json({ message: "Your email is not verified" })
    let token = jwt.sign({ userIsExist }, process.env.JWT_KEY)
    res.json({ message: "login successfully", token })
})

export const verifyUser = asyncHandler(async (req, res) => {
    let { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY_EMAIL_CONFIRMATION, async function (err, decoded) {
        if (!err) {
            let verifiedUser = await userModel.findOneAndUpdate({ email: decoded.email }, { isVerified: true }, { new: true , projection : { _id :0 , password :0}})
            res.json({ message: "success verified", verifiedUser })
        } else {
            res.json({ message: "Not Verified" })
        }
    })
})

export const updateUserByUserId = asyncHandler(async (req, res) => {
    const { age, name } = req.body;
    let updatedUser = await userModel.findByIdAndUpdate({ _id: req.userId }, { age, name }, { new: true })
    res.json({ message: "updated user data sucessfully", updatedUser })
})

export const softDelete = asyncHandler ( async ( req , res ) => {
    let updatedUser = await userModel.findByIdAndUpdate({ _id: req.userId }, { isVerified : false }, { new: true   , projection : { _id :0 , password :0}}  )
    res.json({ message: "user is de-avticated", updatedUser })
} )


export const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    let checkEmailIsExist = await userModel.findOne({ email });
    if (!checkEmailIsExist) return res.json({ message: "This email does not exist!!!" })
    sendEmailForResetPassword({ email })
    res.json({ message: "Forget password , send email for verification" })
})


export const passwordToReset = asyncHandler(async (req, res) => {
    const { password , confirm_password} = req.body;
    let { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY_EMAIL_CONFIRMATION, async function (err, decoded) {
        if (!err) {
            if (password !== confirm_password) return res.json({ message: "passwords are not matching" })
            const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
            let updatedPasswordUser = await userModel.findOneAndUpdate({ email: decoded.email }, { password:hash }, { new: true  , projection : { _id :0 , password :0}})
            res.json({ message: "success verified", updatedPasswordUser })
        } else {
            res.json({ message: "Not Verified" })
        }
    })
})




