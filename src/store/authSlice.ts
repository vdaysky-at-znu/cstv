import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import {IUser} from "@/database/models/user";

// Type for our state
export interface AuthState {
    user: IUser | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set the authentication status
        setAuthState(state, action) {
            state.user = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
        "SET_USER": (state, action) => {
            state.user = action.payload;
        }
    },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.user;

export default authSlice.reducer;
