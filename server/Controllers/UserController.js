import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import {secret} from "../secret.js";

// регистрация

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            role: req.body.role,
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

        console.log(user)

        const token = jwt.sign({
                _id: user._id,
                role: user.role,
            }, secret,
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.status(200).json({
            ...userData, token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        })
    }
}

// логин

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
            }, secret,
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.status(200).json({
            ...userData, token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось авторизоваться",
        })
    }
}

// изменение информации о пользователе

export const update = async (req, res) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)

            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            await User.findOneAndUpdate({
                _id: decoded._id
                },
                {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                role: req.body.role,
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

            res.status(200).json({
                success: true,
                message: "Данные обновлены"
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Нет доступа',
            });
        }
    }
}

// получение пользователя

export const getMe = async (req, res) => {
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
            }, secret,
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
};

// получение всех пользователей

export const getAll = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить пользователей',
        });
    }
};

// удаление пользователя

export const remove = async (req, res) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)

            User.findById(decoded._id).deleteOne().exec()

            res.status(200).json({
                success: true,
                message: "Пользователь удален"
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Нет доступа',
            });
        }
    }
}