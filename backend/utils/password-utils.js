import bcrypt from "bcrypt"

class PasswordUtils {
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    static async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default PasswordUtils