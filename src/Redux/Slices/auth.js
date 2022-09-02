import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchLogin = createAsyncThunk("/auth/fetchAuth", async (params) => {
    const {data} = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk("/auth/fetchRegister", async (params) => {
    const {data} = await axios.post('/auth/register', params)
    return data
})

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
    const {data} = await axios.get('/auth/me')
    return data
})

export const fetchUsers  = createAsyncThunk("/fetchUsers", async () => {
    const {data} = await axios.get('/users')
    return data
})

export const fetchUpdateUsers  = createAsyncThunk("/fetchUsers/update", async () => {
    const {data} = await axios.patch('/users/update')
    return data
})

export const fetchDeleteUsers  = createAsyncThunk("/fetchUsers/update", async () => {
    const {data} = await axios.delete('/users')
    return data
})


const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },

    extraReducers: {
        [fetchLogin.pending] : (state) => {
            state.status = "loading"
            state.data = null
        },
        [fetchLogin.fulfilled] : (state, action) => {
            state.status = "loaded"
            state.data = action.payload
        },
        [fetchLogin.rejected] : (state) => {
            state.status = "error"
            state.data = null
        },
        [fetchAuthMe.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchRegister.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchUsers.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUsers.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUsers.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchUpdateUsers.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUpdateUsers.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateUsers.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchDeleteUsers.pending] : (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchDeleteUsers.fulfilled] : (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchDeleteUsers.rejected] : (state) => {
            state.status = 'error'
            state.data = null
        }
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions