import mongoose from "mongoose"

const User = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobilePhone: {type: String, unique: true},
    cart: {type: Array, default: []},
    country: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    house: {type: Number, required: true},
    building: {type: Number},
    flat: {type: Number},
    postalCode: {type: Number, required: true},
    isPrivateHouse: {type: Boolean, required: true, default: false, enum: [false, true]},
    avatarUrl: String,
    passwordHash: {type: String, required: true},
    },
    {timestamps: true}
)

export default mongoose.model('User', User)