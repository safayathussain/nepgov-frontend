"use client";
import CookieModal from "@/components/common/CookieModal";
import { setCountries } from "@/redux/slices/CountriesSlice";
import { logout, refetchAuth, useAuth, useCountries } from "@/utils/functions";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const layout = ({ children }) => {
  const { countries } = useCountries();
  const dispatch = useDispatch();
  const { auth } = useAuth();

  useEffect(() => {
    if (countries.length === 0) {
      const loadCountries = async () => {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const { data } = await response.json();

        dispatch(
          setCountries(
            data.map((element) => {
              return {
                name: element.country,
              };
            })
          )
        );
      };
      loadCountries();
    }
    if (auth?.accessToken) {
      const decoded = jwtDecode(auth.accessToken);
      if (!decoded?.exp || decoded?.exp * 1000 < Date.now()) {
        logout();
      }
    }
    if (auth._id) refetchAuth();
  }, []);
  return (
    <div>
      {children}
      <CookieModal />
    </div>
  );
};

export default layout;
