import mongoose from "mongoose"

const Order = new mongoose.Schema({
    user: {type: String, required: true},
    products: {type: Array, required: true},
    status: {type: String, default: "Заказ обрабатывается"},
    deliverType: {type: String, default: "Курьером до двери", enum: ['Курьером до двери', 'В пункт выдачи', 'В постамат', 'В отделение почты']},
    deliverCountry: {type: String, required: true},
    deliverCity: {type: String, required: true},
    deliverStreet: {type: String, required: true},
    deliverHouse: {type: Number, required: true},
    deliverBuilding: {type: Number},
    deliverFlat: {type: Number},
    deliverPostalCode: {type: Number, required: true},
    isPrivateHouse: {type: Boolean, default: false}
}, {
    timestamps: true
})

export default mongoose.model('Order', Order)