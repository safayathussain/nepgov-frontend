import { store } from "@/redux/store";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";
import { useSelector } from "react-redux";

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
  window.location.href = "/"
};
export const isLive = (dateString) => {
  const currentDate = new Date();
  const givenDate = new Date(dateString);
  return givenDate > currentDate;
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
  return `${years} years left`;
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
    hour12: true 
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}
 