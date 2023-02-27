import nodemailer from 'nodemailer'
import { emial_confirmation_from, emial_reset_password } from './email.html.js';
import jwt from 'jsonwebtoken';


export const sendEmail = async (options) => {

    let token = jwt.sign({email : options.email} , process.env.JWT_KEY_EMAIL_CONFIRMATION)
    let transporter = nodemailer.createTransport({
        service: "gmail", 
        auth : {
            user : process.env.SEND_EMAIL_FROM,
            pass : process.env.EMAIL_PASSWORD,
        }
    });

    let info = await transporter.sendMail( {
        from: ' "Test Library Project Node js" <ahmed.nassar855@gmail.com>',
        to: options.email,
        subject: "Hello",
        html: emial_confirmation_from(token),
    })
    // console.log(info);
}


export const sendEmailForResetPassword = async (options) => {

    let token = jwt.sign({email : options.email} , process.env.JWT_KEY_EMAIL_CONFIRMATION)
    let transporter = nodemailer.createTransport({
        service: "gmail", 
        auth : {
            user : process.env.SEND_EMAIL_FROM,
            pass : process.env.EMAIL_PASSWORD,
        }
    });

    let info = await transporter.sendMail( {
        from: ' "Test Library Project Node js" <ahmed.nassar855@gmail.com>',
        to: options.email,
        subject: "Reset Password",
        html: emial_reset_password(token),
    })
    // console.log(info);
}
