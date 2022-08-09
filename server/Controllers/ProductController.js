import Product from "../Models/Product.js";


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