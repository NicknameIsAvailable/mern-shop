import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./Slices/auth.js"
import {commentsReducer} from "./Slices/comments.js"
import {productsReducer} from "./Slices/products.js"
import {ordersReducer} from "./Slices/orders.js"

const store = configureStore({
    reducer: {
        products: productsReducer,
        comments: commentsReducer,
        auth: authReducer,
        orders: ordersReducer
    }
})

export default store