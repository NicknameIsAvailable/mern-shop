import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        products: producrReducer,
        auth: authReducer
    }
})