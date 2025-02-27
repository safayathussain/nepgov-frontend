"use client";
import CookieModal from "@/components/common/CookieModal";
import { setCountries } from "@/redux/slices/CountriesSlice";
import { useCountries } from "@/utils/functions";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const layout = ({ children }) => {
  const { countries } = useCountries();
  const dispatch = useDispatch();
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
  }, []);
  return (
    <div>
      {children}
      <CookieModal />
    </div>
  );
};

export default layout;
