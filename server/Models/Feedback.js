import mongoose from "mongoose"

const Feedback = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: false},
    rating: {type: Number, default: 0},
    timestamps: true
})

export default mongoose.model('Feedback', Feedback)