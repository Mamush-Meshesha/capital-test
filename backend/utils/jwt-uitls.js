
const jwt = require("jsonwebtoken")

module.exports = {
    generateToken(res, id) { 
        const token = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: 3600 *60*60
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 *60*60,
            sameSite: "strict"
        })
    }
}