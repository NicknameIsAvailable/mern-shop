import mongoose from "mongoose"

const User = new mongoose.Schema({
    fullName: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    adresses: {type: Array, default: []},
    passwordHash: {type: String, required: true},
    avatarUrl: String,
    cart: {type: Array, default: []},
    timestamps: true
})

export default mongoose.model('User', User)