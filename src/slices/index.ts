import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authoring from '../slices/slice'

const middleware = [...getDefaultMiddleware()];
export const store = configureStore({
    reducer: {authoring},
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})