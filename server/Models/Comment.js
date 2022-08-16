import mongoose from "mongoose"


const Comment = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number},
    text: {type: String, trim: true, required: true},
    date: {type: Date, default: Date.now},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
})

export default mongoose.model('Comment', Comment);
