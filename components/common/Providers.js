"use client";
import { persistor, store } from "@/redux/store";
import Script from "next/script";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CookiesProvider>{children}</CookiesProvider>
        </PersistGate>
      </Provider>
      <Toaster />
      {/* Usercentrics Autoblocker */}
      <Script
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy="afterInteractive"
      />

      {/* Usercentrics CMP */}
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id="ZFztTHYVi2c-b4"
        strategy="afterInteractive"
        async
      />
    </div>
  );
};

export default Providers;
