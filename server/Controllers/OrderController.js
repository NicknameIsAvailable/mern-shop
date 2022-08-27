// покупка всех товаров из корзины

import jwt from "jsonwebtoken";
import {secret} from "../secret.js";
import User from "../Models/User.js";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

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

// получение заказа

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

