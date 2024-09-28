/**
 * @param takes the same callback function of every app.<verb>('/',()=>{} !this callback!) route, 
 */
const asyncHandler = (requestCallback) =>{
    return (req,res,next)=>{
        Promise.resolve(requestCallback(req,res,next)).catch((err)=>next(err))
    }
}
//purpose: avoid lots of try-catch

export default asyncHandler;