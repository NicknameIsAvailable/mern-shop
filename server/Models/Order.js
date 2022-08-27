import mongoose from "mongoose"

// TODO: возможность купить продукт
// TODO: возможность отменить заказ
// TODO: возможность вернуть заказ
// TODO: возможность подтвердить получение заказа
// TODO: возможность изменения статуса доставки

const Order = new mongoose.Schema({
    user: {type: String, required: true},
    products: {type: Array, required: true},
}, {
    timestamps: true
})

export default mongoose.model('Order', Order)