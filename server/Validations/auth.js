import {body} from "express-validator"

export const registerValidation = [
    body('name', 'Укажите имя').isLength({ min: 3 }),
    body('surname', 'Укажите фамилию').isLength({ min: 3 }),
    body('email', 'Неверный формат почты').isEmail(),
    body('mobilePhone', 'Укажите номер телефона').optional(),
    body('country', 'Укажите вашу страну').isLength({min: 3}),
    body('city', 'Укажите ваш город').isLength({min: 2}),
    body('street', 'Укажите ваш город').isLength({min: 5}),
    body('house', 'Укажите ваш дом').isNumeric(),
    body('building', 'Укажите корпус вашего дома').isNumeric().optional(),
    body('flat', 'Укажите номер вашей квартиры').isNumeric().optional(),
    body('postalCode', 'Укажите ваш почтовый индекс').isPostalCode("any"),
    body('isPrivateHouse', 'Укажите вы живите в частном доме?').isBoolean(),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
]