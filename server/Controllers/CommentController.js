import Product from "../Models/Product.js";
import Comment from "../Models/Comment.js";

// добавление комментария к продукту

export const add = async (req, res) => {
    const productId = req.params.id

    try {
        const comment = new Comment({
            user: req.userId,
            rating: req.body.rating,
            text: req.body.text,
            product: productId
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

// обновление комментария

export const update = async (req, res) => {
    try {
        const commentId = req.params.commentId

        await Comment.updateOne({
            _id: commentId
        },
        {
            text: req.body.text,
            rating: req.body.rating
        })

        res.json({
            success: true
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось обновить комментарий"
        })
    }
}

// получение всех комментариев

export const getAll = async (req, res) => {
    try {
        const comments = await Comment.find().populate([{path : 'user', strictPopulate: false}]).exec();
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }
};

// получение всех комментариев к определенному продукту

export const getAllOfProduct = async (req, res) => {
    const productId = req.params.id

    try {
        const comments = await Comment.find({product: productId})
        res.json(comments)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }

}

// получение определенного комментария по его id

export const getOne = async (req, res) => {
    try {
        const commentId = req.params.id

        Product.findOneAndUpdate(
            {
                _id: commentId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть комментарий',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'комментарий не найден',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }
}

// удаление комментария

export const remove = async (req, res) => {
    const commentId = req.params.commentId

    try {
        Comment.findOneAndDelete(
            {
                _id: commentId
            },

            async (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: "Не удалось удалить комментарий"
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Комментарий не найден"
                    })
                }

                res.json({
                    success: true,
                    message: "Комментарий удален"
                })
            }
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось удалить комментарий"
        })
    }
}