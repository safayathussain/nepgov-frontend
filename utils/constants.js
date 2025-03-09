export const ImgUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_API
export const isCookieAccepted =
  typeof window !== "undefined"
    ? localStorage.getItem("acceptCookie") || sessionStorage.getItem("acceptCookie")
    : null;
