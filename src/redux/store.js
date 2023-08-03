import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { transactionsReducer } from "./transactions/slice";

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE, REGISTER],
        },
    }),
];

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"],

}
export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        transactions: transactionsReducer,
    },
    middleware,
    devTools: import.meta.env.VITE_ENV === "develoment",
});

export const persistor = persistStore(store);