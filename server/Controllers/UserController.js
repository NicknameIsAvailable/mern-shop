import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            mobilePhone: req.body.mobilePhone,
            avatarUrl: req.body.avatarUrl,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            house: req.body.house,
            building: req.body.building,
            flat: req.body.flat,
            postalCode: req.body.postalCode,
            isPrivateHouse: req.body.isPrivateHouse,
            passwordHash: hash
        })


        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id,
            }, '~A|1Q5m5ki7Gg4za',
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData, token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        })
    }
}