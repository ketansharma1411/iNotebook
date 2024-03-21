const jwt = require('jsonwebtoken');
const secretKey='ketan@1'

const forlogin=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).json({error:'Wrong authentication token'})
    }
    try{

    const decoded = jwt.verify(token, secretKey);
    req.user=decoded.user
    }
    catch(error){
        return res.send('some error occured '+error)
    }
    next()
}
module.exports=forlogin