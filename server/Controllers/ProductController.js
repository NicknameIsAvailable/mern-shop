import Product from "../Models/Product.js";

// TODO: возможность добавлять товары в корзину

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
            user: req.userId
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

// добавление товара в корзину

export const addCart = async (req, res) => {

}

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
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить продукты',
        });
    }
};

