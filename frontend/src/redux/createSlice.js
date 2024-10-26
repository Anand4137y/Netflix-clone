import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signup = createAsyncThunk('api/signup', async ({ email, username, password }, { rejectWithValue }) => {
    try {
        console.log(email,username,password);
        
        const response = await axios.post('http://localhost:5000/api/signup', { email, username, password });
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isSigningUp: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isSigningUp = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isSigningUp = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
