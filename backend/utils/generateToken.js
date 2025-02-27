const jwt = require('jsonwebtoken')

const generateToken = (userId,res)=>{
    
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"})
    res.cookie("jwt-netflix",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    })
    return token
}
module.exports = generateToken