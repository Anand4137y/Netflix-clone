const User = require("../mongoDb/models/userModel")
const bcrypt = require('bcryptjs')
const generateToken = require("../utils/generateToken")

//      Sign-Up Api
 async function signup(req,res){
    try {
        const {email,password,username} = req.body

        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        // const emailRegex = ;
        // if(!emailRegex.test(email)){
        //     return res.status(400).json({success:false,message:"Invalid email"})
        // }
        if(password.length < 6){
            return res.status(400).json({message:"password must at least 6 character"})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const existingUserByEmail = await User.findOne({email})
        const existingUsername = await User.findOne({username})


        if(existingUserByEmail && existingUsername){
            return res.status(400).json({message:"email & username alredy exist"})
        }



        const newUser = new User({
            email,
            password:hashpassword,
            username,
            Image:"",
            searchhistort:[]
        })

        if(newUser){
          generateToken(newUser._id,res)  
        }
        await newUser.save()
        res.status(200).json({newUser})

    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"internal signup error"})
    }
}
//    login api
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password does not match" });
        }

        generateToken(user._id, res); // Generate token first

        return res.status(200).json({ message: "Login successfully", user });

    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: "Internal login error" });
    }
}


//    logout api
 async function logout(req,res){
    try {
        res.clearCookie()
        res.status(200).json({message:"Logout Successfully"})

    } catch (error) {
        res.status(500).json({message:"Internal Logout error"})
    }

}

module.exports = {signup,login,logout}