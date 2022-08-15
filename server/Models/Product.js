import mongoose from "mongoose"

const Product = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, unique: false},
    price: {type: Number, required: true},
    tags: {type: Array, default: []},
    buyCount: {type: Number, default: 0},
    viewsCount: {type: Number, default: 0},
    count: {type: Number, default: 0, required: true},
    images: {type: Array, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {timestamps: true}
)

export default mongoose.model('Product', Product)