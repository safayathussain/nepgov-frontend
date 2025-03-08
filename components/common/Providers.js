"use client";
import { persistor, store } from "@/redux/store";
import { logout, useAuth } from "@/utils/functions";
import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {jwtDecode} from "jwt-decode";

const Providers = ({ children }) => {


  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CookiesProvider>{children}</CookiesProvider>
        </PersistGate>
      </Provider>
      <Toaster />
    </div>
  );
};

export default Providers;
