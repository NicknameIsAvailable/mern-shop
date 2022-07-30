import mongoose from "mongoose"

const Product = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    buyCount: {type: Number, default: 0},
    images: {type: Array, required: true},
    feedbacks: {type: Array, default: 0},
},
    {timestamps: true}
)

export default mongoose.model('Product', Product)