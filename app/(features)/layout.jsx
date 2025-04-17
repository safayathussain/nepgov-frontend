"use client";
import CookieModal from "@/components/common/CookieModal";
import UserSurveyDetailsModal from "@/components/common/UserSurveyDetailsModal";
import { setCountries } from "@/redux/slices/CountriesSlice";
import { logout, refetchAuth, useAuth, useCountries } from "@/utils/functions";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const { countries } = useCountries();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [isUserDetailsModalOpen, setisUserDetailsModalOpen] = useState(
    sessionStorage.getItem("showUserProfileSurveyModal") ||
      auth.survey ||
      !auth._id
      ? false
      : true
  ); 
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
      {/* survey modal */}
      {isUserDetailsModalOpen && (
        <UserSurveyDetailsModal
          open={isUserDetailsModalOpen}
          setOpen={setisUserDetailsModalOpen}
        />
      )}
    </div>
  );
};

export default Layout;
