import jwt from "jsonwebtoken";
import {secret} from "../secret.js";
import User from "../Models/User.js";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

// покупка всех товаров из корзины

export const createOrder = async (req, res) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)
            const user = await User.findById(decoded._id)

            if (user.cart.length !== 0) {
                const order = new Order({
                    user: decoded._id,
                    products: user.cart,
                    deliverType: req.body.deliverType,
                    deliverCountry: req.body.deliverCountry,
                    deliverCity: req.body.deliverCity,
                    deliverStreet: req.body.deliverStreet,
                    deliverHouse: req.body.deliverHouse,
                    deliverBuilding: req.body.deliverBuilding,
                    deliverFlat: req.body.deliverFlat,
                    deliverPostalCode: req.body.deliverPostalCode,
                    isPrivateHouse: req.body.isPrivateHouse,
                })

                await order.save()

                for (const productId of user.cart) {
                    await  Product.findOneAndUpdate({_id: productId},
                        {
                            $inc: { count: -1 },
                        },
                        {
                            returnDocument: 'after',
                        },
                    )
                }

                await user.save()

                res.json({
                    success: true,
                    message: "Заказ создан"
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: "Корзина пуста"
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Не удалось создать заказ"
            });
        }
    }
}

// покупка одного товара

export const buyOne = async (req, res) => {
    const productId = req.params.id
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)

            const order = new Order({
                user: decoded._id,
                products: productId,
                deliverType: req.body.deliverType,
                deliverCountry: req.body.deliverCountry,
                deliverCity: req.body.deliverCity,
                deliverStreet: req.body.deliverStreet,
                deliverHouse: req.body.deliverHouse,
                deliverBuilding: req.body.deliverBuilding,
                deliverFlat: req.body.deliverFlat,
                deliverPostalCode: req.body.deliverPostalCode,
                isPrivateHouse: req.body.isPrivateHouse,
            })

            await order.save()

            await Product.findOneAndUpdate({_id: productId},
                {
                    $inc: { count: -1 },
                },
                {
                    returnDocument: 'after',
                },
            )

            res.json({
                success: true,
                message: "Товар заказан"
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Не удалось создать заказ"
            });
        }
    }
}

// Удаление заказа

export const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)
            const user = await User.findById(decoded._id)

            const order = await Order.findById(orderId).exec()

            for (const productId of order.products) {
                await Product.findOneAndUpdate({_id: productId},
                    {
                        $inc: {count: 1},
                    },
                    {
                        returnDocument: 'after',
                    },
                )
            }

            console.log(order.products)

            await Order.findOneAndDelete({_id: orderId})

            await user.save()

            res.json({
                success: true,
                message: "Заказ удален"
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Не удалось удалить заказ"
            });
        }
    }
}

// получение всех заказов

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate([{path : 'user', strictPopulate: false}]).exec();
        res.json(orders);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Не удалось найти заказы"
        });
    }
}

// получение одного заказа

export const getOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findById(orderId).exec()

        res.json(order)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Не удалось найти заказы"
        });
    }
}

// получение заказов одного пользователя

export const getUserOrders = async (req, res) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')
    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded._id)

    if (token) {
        try {

            const orderIds = user.orders.map((order) => order.toString());

            const orders = await Order.find(
                {'_id': {$in: orderIds}}
            )

            res.json(orders)
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Не удалось получить заказы"
            });
        }
    }
}

// Изменение статуса заказа

export const changeOrderStatus = async (req, res) => {
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')
    const orderId = req.params.orderId

    if (token) {
        try {
            const order = await Order.findById(orderId).exec()
            const status = req.body.status

            if (status === 0) {
                order.status = "Заказ обрабатывается"
            } else if (status === 1) {
                order.status = "Собран"
            } else if (status === 2) {
                order.status = "Отправлен со склада"
            } else if (status === 3) {
                order.status = "Покинул страну отправления"
            } else if (status === 4) {
                order.status = "Прибыл в страну назначения"
            } else if (status === 5) {
                order.status = "Скоро будет у вас"
            } else if (status === 6) {
                order.status = "Уже у вас"
            } else if (status === 7) {
                order.status = "Заказ задерживается"
            } else if (status === 8) {
                order.status = "Что-то пошло не так во время доставки заказа. Мы отправили вам письмо с подробностями"
            }
            order.save()

            res.status(200).json({
                success: true,
                message: `Статус заказа изменен на ${order.status}`
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Не удалось получить заказы',
            });
        }
    }
}
