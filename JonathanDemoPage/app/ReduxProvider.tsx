"use client"
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { SessionProvider } from "next-auth/react";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider> 
    )
}