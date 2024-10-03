import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/app/redux/features/user/sessionSlice';


export const store = configureStore({
    reducer: {
        session: sessionReducer
    }
})