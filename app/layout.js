import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "NepGov",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${dmSans.variable} bg-white text-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
