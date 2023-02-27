import  jwt  from 'jsonwebtoken';


export const isAuth = ( req , res  , next ) => {
    let token = req.header('token')
    jwt.verify( token , process.env.JWT_KEY ,function ( err , decoded ) {
        if ( err ){
            res.json({ err })
        }else {
            req.userId = decoded.userIsExist._id ;   
            console.log(req.userId);
            next()
        }
    }); 
}

export const authEmailConfirmation = ( req , res  , next ) => {
    let token = req.params('token')
    jwt.verify( token , process.env.JWT_KEY_EMAIL_CONFIRMATION ,function ( err , decoded ) {
        if ( err ){
            res.json({ err })
        }else {
            console.log(req.user);
            req.user = decoded;   // need to check req.user or req.what ????
            next()
        }
    }); 
}