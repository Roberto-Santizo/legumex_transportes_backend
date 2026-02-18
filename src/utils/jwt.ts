import { JwtPayload } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '180d' })
    return token
}