import { createSlice } from "@reduxjs/toolkit";
import { User } from "next-auth";

interface SessionState {
    session: User | null;
    isAuthenticated: boolean;
}

const initialState: SessionState = {
    session: null,
    isAuthenticated: false,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        userSignedIn: (state, action) => {
            state.session = action.payload.user;
            state.isAuthenticated = true;
        },
        userSignedOut: (state) => {
            state.session = null;
            state.isAuthenticated = false;
        },
    },
});

export const selectUser = (state: { session: SessionState; }) => state.session;

export const { userSignedIn, userSignedOut } = sessionSlice.actions;
export default sessionSlice.reducer;
