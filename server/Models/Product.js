import mongoose from "mongoose"

const Product = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, unique: false},
    price: {type: Number, required: true},
    tags: {type: Array, default: []},
    buyCount: {type: Number, default: 0},
    images: {type: Array, required: true},
    feedbacks: {type: Array, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    },
    {timestamps: true}
)

export default mongoose.model('Product', Product)