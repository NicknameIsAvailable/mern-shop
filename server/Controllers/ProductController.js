import Product from "../Models/Product.js";
import Comment from "../Models/Comment.js";

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

export const update = async (req, res) => {
    try {
        const productId = req.params.id;

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

export const addComment = async (req, res) => {
    const productId = req.params.id

    try {
        const comment = new Comment({
            user: req.userId,
            rating: req.body.rating,
            text: req.body.text,
            post: productId
        })

        await comment.save();
        const postRelated = await Product.findById(productId);
        postRelated.comments.push(comment);
        await postRelated.save(function(err) {
            if(err) {console.log(err)}
            res.redirect('/')
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось оставить комментарий"
        })
    }
}