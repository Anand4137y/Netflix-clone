const jwt = require('jsonwebtoken')
const User = require('../mongoDb/models/userModel')



const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"]

        if (!token) {
            return res.status(400).json({ success: false, message: "Unauthorized -No Token Provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({ success: true, message: "Unauthorized -No Token Provided" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal Protect Route" })
    }
}
module.exports = protectRoute