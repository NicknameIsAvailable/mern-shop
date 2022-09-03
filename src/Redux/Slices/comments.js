import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostComment = createAsyncThunk('/products/fetchComment/post', async (id) => {
    const {data} = await axios.post(`/products/${id}/comments`)
    return data
})

export const fetchDeleteComments = createAsyncThunk('/products/fetchComments/delete', async (id, commentId) => {
    const {data} = await axios.delete(`/comments/${commentId}`)
    return data
})

export const fetchPatchProducts = createAsyncThunk('/products/fetchComments/patch', async (commentId) => {
    const {data} = await axios.patch(`/comments/${commentId}`)
    return data
})

export const fetchComments = createAsyncThunk('/products/fetchPostProducts/getAll', async () => {
    const {data} = await axios.get('/comments/')
    return data
})

export const fetchOneProductCommnents = createAsyncThunk('/products/fetchPostProducts/getAllOfProduct', async (id) => {
    const {data} = await axios.post(`/products/${id}/comments/`)
    return data
})

export const fetchGetOneComment = createAsyncThunk('/products/fetchPostProducts/getOne', async (id, commentId) => {
    const {data} = await axios.post(`/products/${id}/comments/${commentId}`)
    return data
})

const initialState = {
    comments: {
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
        [fetchPostComment.pending] : (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchPostComment.fulfilled] : (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        },
        [fetchPostComment.rejected] : (state) => {
            state.status = "error"
            state.data = null
        },
        [fetchDeleteComments.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchDeleteComments.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchDeleteComments.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchPatchProducts.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchPatchProducts.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchPatchProducts.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchComments.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchComments.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchComments.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchOneProductCommnents.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchOneProductCommnents.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchOneProductCommnents.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchGetOneComment.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchGetOneComment.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchGetOneComment.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        }
    }
})

export const commentsReducer = commentsSlice.reducer
