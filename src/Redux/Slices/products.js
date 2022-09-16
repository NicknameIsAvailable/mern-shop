import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchDeleteProducts = createAsyncThunk('/products/fetchProducts/delete', async (id) => {
//     await axios.delete(`/products/${id}`)
// })
//
// export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async (id) => {
//     const {data} = await axios.get(`/products`)
//     return data
// })

const initialState = {
    products: {
        items: [],
        status: 'loading'
    }
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducer: {},

    // extraReducers: {
    //     [fetchAllProducts.pending] : (state) => {
    //         state.products.status = 'loading'
    //     },
    //     [fetchAllProducts.fulfilled] : (state, action) => {
    //         state.products.items = action.payload
    //         state.products.status = 'loaded'
    //     },
    //     [fetchAllProducts.rejected] : (state) => {
    //         state.products.items = []
    //         state.products.status = 'error'
    //     },
    //     [fetchDeleteProducts.pending] : (state, action) => {
    //         state.products.items = state.products.items.filter(item => item._id !== action.payload)
    //     }
    // }
})

export const productsReducer = productsSlice.reducer
