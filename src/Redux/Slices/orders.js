import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeleteOrder = createAsyncThunk('/products/fetchOrder/delete', async (orderId) => {
    const {data} = await axios.delete(`/orders/${orderId}/`)
    return data
})

export const fetchGetOrders = createAsyncThunk('/products/fetchOrders', async () => {
    const {data} = await axios.get(`/orders/`)
    return data
})

export const fetchGetUserOrders = createAsyncThunk('/products/fetchOrder/user', async () => {
    const {data} = await axios.get(`/users/orders/`)
    return data
})

export const fetchGetOrder = createAsyncThunk('/products/fetchOrder/getOrder', async (orderId) => {
    const {data} = await axios.get(`/orders/${orderId}/`)
    return data
})

export const fetchPatchOrder = createAsyncThunk('/products/fetchOrder/patch', async (orderId) => {
    const {data} = await axios.patch(`/orders/${orderId}/`)
    return data
})

export const fetchCreateOrder = createAsyncThunk('/products/fetchOrder/createOrder', async () => {
    const {data} = await axios.post(`/users/cart`)
    return data
})

export const fetchBuyOne = createAsyncThunk('/products/fetchOrder/buyOne', async (id) => {
    const {data} = await axios.post(`/users/products/${id}`)
    return data
})

const initialState = {
    products: {
        items: [],
        status: 'loading'
    }
}

const commentsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },

    extraReducers: {
        [fetchDeleteOrder.pending] : (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchDeleteOrder.fulfilled] : (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        },
        [fetchDeleteOrder.rejected] : (state) => {
            state.status = "error"
            state.data = null
        },
        [fetchGetOrders.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchGetOrders.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchGetOrders.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchGetUserOrders.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchGetUserOrders.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchGetUserOrders.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchGetOrder.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchGetOrder.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchGetOrder.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchPatchOrder.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchPatchOrder.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchPatchOrder.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchCreateOrder.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchCreateOrder.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchCreateOrder.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchBuyOne.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchBuyOne.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchBuyOne.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        }
    }
})

export const commentsReducer = commentsSlice.reducer