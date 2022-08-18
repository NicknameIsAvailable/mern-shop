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

        if (user) {
            res.send({message: "Такой пользователь уже существует"})
        }

        console.log(user)

        const token = jwt.sign({
                _id: user._id,
                role: user.role,
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

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }

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
            message: "Не удалось авторизоваться",
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин и пароль"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, '~A|1Q5m5ki7Gg4za',
        {
            expiresIn: "30d"
        })

        const { passwordHash, ...userData } = user._doc;

        res.json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};