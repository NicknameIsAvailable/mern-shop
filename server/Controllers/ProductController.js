import Product from "../Models/Product.js";
import User from "../Models/User.js";
import {secret} from "../secret.js";
import jwt from "jsonwebtoken";


// создание продукта

export const create = async (req, res) => {
    try {
        const doc = new Product ({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            buyCount: req.body.buyCount,
            images: req.body.images,
            tags: req.body.tags.split(','),
            user: req.userId,
            count: req.body.count
        })

        const product = await doc.save()

        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать товар"
        })
    }
}

// обновление продукта

export const update = async (req, res) => {
    try {
        const productId = req.params.productId;

        await Product.updateOne(
            {
                _id: productId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                buyCount: req.body.buyCount,
                count: req.body.count,
                images: req.body.images,
                tags: req.body.tags.split(','),
                user: req.userId
            },
        );

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить продукт',
        });
    }
};

// удаление продукта

export const remove = async (req, res) => {
    try {
        const productId = req.params.id;

        Product.findOneAndDelete(
            {
                _id: productId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить статью',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json({
                    success: true,
                    message: "Продукт удален"
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

// получение всех товаров

export const getAll = async (req, res) => {
    try {
        const products = await Product.find().populate([{path : 'user', strictPopulate: false}]).exec();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товары',
        });
    }
};

// получение определенного продукта

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        Product.findOneAndUpdate(
            {
                _id: productId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть продукт',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'продукт не найден',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
};

// добавление товара в корзину

export const addCart = async (req, res) => {
    const productId = req.params.id
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, secret)
            const user = await User.findById(decoded._id)
            const product = await Product.findById(productId)
            if (product.count > 0) {
                user.cart.push(productId)
                user.save()

                product.inCart.push(decoded._id)
                await product.save()

                res.json({
                    success: true,
                    message: "Товар добавлен в корзину"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Товары закончились"
                })
            }
        } catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Товар не найден",
            });
        }
    }
}

// удаление товара из корзины

export const cartDelete = async (req, res) => {
    const productId = req.params.id
    const token = (req.headers.authorization).replace(/Bearer\s?/, '')
    const decoded = jwt.verify(token, secret)
    const user = await User.findById(decoded._id)

    if (token) {
        try {
            user.cart.pull(productId)
            user.save()

            res.json({
                success: true,
                message: "Товар удален из корзины"
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Не удалось удалить товар"
            });
        }
    }
}
