import { configureStore } from "@reduxjs/toolkit"
import { todoApi } from "../query/TodoQuery"
import { todoSlice } from "./TodoSlice"



export const store = () => 
     configureStore({
        reducer: {
            [todoApi.reducerPath]: todoApi.reducer,
            todoSlice: todoSlice.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
    })



export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']