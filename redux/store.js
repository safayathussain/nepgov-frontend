import {  configureStore } from '@reduxjs/toolkit';
import { combinedReducers } from './combinedReducers';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storageLocal from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';


const acceptCookies = localStorage.getItem("acceptCookie")

const persistConfig = {
    key: 'root',
    // USE SESSION STORAGE FOR THOSE USER WHO DECLINED COOKIES
    storage: acceptCookies ==="accepted" ? storageLocal : storageSession,
}
const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});



export const persistor = persistStore(store)