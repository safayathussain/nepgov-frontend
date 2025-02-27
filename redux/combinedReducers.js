import { combineReducers } from "@reduxjs/toolkit";
import {authSlice}  from "./slices/AuthSlice";
import { countriesSlice } from "./slices/CountriesSlice";

export const combinedReducers = combineReducers({
    auth: authSlice.reducer,
    countries: countriesSlice.reducer
})