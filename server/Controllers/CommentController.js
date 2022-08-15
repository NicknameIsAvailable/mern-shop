import Product from "../Models/Product.js";

export const add = async (req, res) => {
    const productId = req.params.id
    const comment = new Comment({
        user: req.userId,
        rating: req.body.rating,
        text: req.body.text,
        post: productId
    })

    try {
        await comment.save()
        const productRelated = await Product.findById(productId)
        productRelated.comment.push(comment)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось оставить комментарий"
        })
    }
}