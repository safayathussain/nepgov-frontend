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
export const logout = async () => {
  await FetchApi({ url: "/auth/logout", method: "post" });
  store.dispatch(setAuth({}));
};
