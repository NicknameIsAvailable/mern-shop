import jwt from "jsonwebtoken";
import {secret} from "../secret.js";
import User from "../Models/User.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res, next) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret);
            req.user = await User.findById(decoded._id).exec()

            if (!req.user.role.includes('deliver')) {
                return res.status(403).json({
                    message: 'у вас недостаточно прав',
                })
            }

            next()
        } catch (err) {
            console.log(err)
            return res.status(403).json({
                success: false,
                message: 'Нет доступа',
            })
        }
    } else {
        return res.status(403).json({
            message: "нет доступа"
        })
    }
}