import { store } from "@/redux/store";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth?.user);
  return {
    auth: auth,
  };
};
export const useCountries = () => {
  const countries = useSelector((state) => state.countries);
  return countries;
};
export const logout = async () => {
  await FetchApi({ url: "/auth/logout", method: "post" });
  store.dispatch(setAuth({}));
  window.location.href = "/";
};
export const refetchAuth = async () => {
  const { data } = await FetchApi({ url: "/auth/me", method: "post" });
  store.dispatch(setAuth(data.data));
  localStorage.setItem("lastAuthFetch", Date.now());
};
export const isLive = (start, end) => {
  const currentDate = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  return currentDate >= startDate && currentDate <= endDate;
};
export const isScheduled = (start) => {
  const currentDate = new Date();
  const startDate = new Date(start);

  return currentDate < startDate;
};

export const formatDateTimeLocal = (date) => {
  if (!date) return ""; // Handle null/undefined values
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return ""; // Handle invalid dates
  return parsedDate.toISOString().slice(0, 16); // Format for input[type="datetime-local"]
};

export function timeAgo(postTime) {
  const now = new Date();
  const timestamp = new Date(postTime);
  const diff = now - timestamp; // Difference in milliseconds

  // Calculate time differences
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  // Return the closest meaningful time unit
  if (seconds < 60) return `1 minute ago`; // Always show 1 minute for less than a minute
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}
export function timeLeft(futureTime) {
  const now = new Date();
  const timestamp = new Date(futureTime);
  const diff = timestamp - now; // Difference in milliseconds

  if (diff <= 0) return "Expired"; // If time has passed

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  if (seconds < 60) return `Less than a minute left`;
  if (minutes < 60) return `${minutes} minutes left`;
  if (hours < 24) return `${hours} hours left`;
  if (days < 30) return `${days} days left`;
  if (months < 12) return `${months} months left`;
  return `${months === 12 ? 1 : years} years left`;
}
export function formatReadableDate(dateInput) {
  const date = new Date(dateInput);

  if (isNaN(date)) return "Invalid Date";

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}
export const isTokenExpired = (accessToken) => {
  if (!accessToken) return true;

  try {
    const decoded = jwtDecode(accessToken);
    return !decoded.exp || decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // If decoding fails, assume the token is invalid/expired
  }
};
export function generateChartDurationArray(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalMonthsDiff =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const durationArray = [];
  if (totalMonthsDiff >= 1) {
    durationArray.push({ duration: "1", label: "1M" });
  }
  if (totalMonthsDiff >= 3) {
    durationArray.push({ duration: "3", label: "3M" });
  }
  if (totalMonthsDiff >= 6) {
    durationArray.push({ duration: "6", label: "6M" });
  }
  if (totalMonthsDiff >= 12) {
    durationArray.push({ duration: "12", label: "1YR" });
  }
  if (totalMonthsDiff >= 60) {
    durationArray.push({ duration: "60", label: "5YRS" });
  }
  durationArray.push({ duration: "", label: "All" });
  return durationArray;
}

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Debounce the width value before returning it
  const debouncedWidth = useDebounce(width, 200); // Debouncing for 200ms

  return debouncedWidth;
};
