import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostProducts = createAsyncThunk('/products/fetchPostProducts', async () => {
    const {data} = await axios.post('/products/')
    return data
})

export const fetchUpdateProducts = createAsyncThunk('/products/fetchProducts/update', async (id) => {
    const {data} = await axios.patch(`/products/${id}`)
    return data
})

export const fetchDeleteProducts = createAsyncThunk('/products/fetchProducts/delete', async (id) => {
    await axios.delete(`/products/${id}`)
})

export const fetchProduct = createAsyncThunk('/products/fetchProduct', async () => {
    const {data} = await axios.get('/products')
    return data
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async (id) => {
    const {data} = await axios.get(`/products/${id}`)
    return data
})

export const fetchAddCartProduct = createAsyncThunk('/products/fetchProducts/addCart', async (id) => {
    const {data} = await axios.post(`/users/cart/${id}`)
    return data
})

export const fetchDeleteCartProduct = createAsyncThunk('/products/fetchProducts/deleteCart', async (id) => {
    await axios.delete(`/users/cart/${id}`)
})

export const fetchCart = createAsyncThunk('/users/cart/fetch', async () => {
    const {data} = await axios.get('/users/cart')
    return data
})

const initialState = {
    products: {
        items: [],
        status: 'loading'
    }
}

const productsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },

    extraReducers: {
        [fetchPostProducts.pending] : (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchPostProducts.fulfilled] : (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        },
        [fetchPostProducts.rejected] : (state) => {
            state.status = "error"
            state.data = null
        },
        [fetchUpdateProducts.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUpdateProducts.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateProducts.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchDeleteProducts.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchDeleteProducts.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchDeleteProducts.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchProduct.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchProduct.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchProduct.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAllProducts.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAllProducts.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAllProducts.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAddCartProduct.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAddCartProduct.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAddCartProduct.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchDeleteProducts.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchDeleteProducts.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchDeleteProducts.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchCart.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchCart.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchCart.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
    }
})

export const productsReducer = productsSlice.reducer
