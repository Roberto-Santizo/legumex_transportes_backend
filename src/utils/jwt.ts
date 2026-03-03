import { User } from "../entities/User";
import jwt from "jsonwebtoken";

// { id: user.id, name: user.name, lastName: user.lastName, role: user.role, email: user.email }

export const generateJWT = (user: User): string => {
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '180d' })
    return token
}