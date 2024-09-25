import jwt from "jsonwebtoken"

class JWTUtils {
    static generateAcessToken(payload, options = {}) {
        const { expiresIn = "1d" } = options
        
        return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn} )
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN)
    }

    static verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
    }
}

export default JWTUtils