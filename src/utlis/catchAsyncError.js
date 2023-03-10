

export function catchAsyncHandler ( fun ) {
    return ( req , res , next ) => {
        fun( req , res ).catch(err => {
            next(err)
        } )
    }
}