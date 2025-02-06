import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default layout;
