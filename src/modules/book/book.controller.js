import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../../../databases/models/user.model.js';
import { catchAsyncHandler } from '../../utlis/catchAsyncError.js';
import { sendEmail, sendEmailForResetPassword } from './../../emails/user.email.js';
import moment from 'moment';
import { bookModel } from '../../../databases/models/book.model.js';




export const addBook = catchAsyncHandler(async (req, res) => {
    const userdata =  req.userData;
    const { name , category , code , fine_rate  } =  req.body;
    if ( userdata.user_type !== "admin" ) return res.json({ message : " You Are not authorizes to add new book" })
    let bookIsExist = await bookModel.findOne({ name })
    if (bookIsExist) return res.json({ message : "This book name is already exist!!!!" })
    let newBook = await bookModel.insertMany({ name , category , code , fine_rate , created_by : userdata._id })
    res.json({ message : "Add book Successfully" , newBook ,userdata })    
})

export const getBooks = catchAsyncHandler( async ( req , res) => {
    let books = await bookModel.find({} , { fine:0 , fine_rate :0 });
    if (books) return  res.json({ message : "all books" , books });
    res.json({ message : "empty books store" })
})


export const deleteBook = catchAsyncHandler( async ( req , res ) => {
    const { id }  =  req.params;
    const userdata =  req.userData;
    if (userdata.user_type !== "admin") return res.json({ message : "You Are not authorizes to add new book" })
    let book = await bookModel.findByIdAndDelete({ _id : id });
    if (!book) return res.json({ message : "This book id does not exist" })
    res.json({message : "Deleted successfully" , book })
})

export const reserveBook = catchAsyncHandler ( async (req , res) => {
    const { id }  =  req.params;
    const { reserved_days } = req.body;
    const userdata =  req.userData;
    let startedReserve = moment().format('YYYY,MM,DD');
    let endedReserveDate =  moment().add(reserved_days, 'days').format('YYYY-MM-DD')

    let d1 = moment(startedReserve);
    let d2 = moment(endedReserveDate);
    let days = d2.diff(d1, 'days');
    console.log(startedReserve , endedReserveDate , days);
   
    let book = await bookModel.findById({ _id : id });
    if ( !book ) return res.json({message : "There is no book with tis id" , book  })
    if ( book.isReserved == true ) return res.json({message : "This book is reserved already" , book  })
    let updatReservedStatusBook = await bookModel.findByIdAndUpdate({ _id : id } , { isReserved : true  , reserved_by : userdata._id , reservedDate :  startedReserve, returnedDate : endedReserveDate} , {new : true});    
    res.json({message : "reservation successfully" , updatReservedStatusBook})
})



