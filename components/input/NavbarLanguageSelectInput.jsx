"use client";

import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const NavbarLanguageSelectInput = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;
      
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Define the Google Translate initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,en,es,jv,ko,pa,pt,ru,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.NORMAL,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // MutationObserver to modify the dropdown options
      const observer = new MutationObserver((mutations, obs) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          obs.disconnect(); // Stop observing once the dropdown is found
          const options = Array.from(select.options);
          const englishOption = options.find((opt) => !opt.value);
          if (englishOption) {
            englishOption.innerText = "English (Change)";
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="flex items-center font-medium relative w-min">
      <div aria-label="test" id="google_translate_element"  ></div>
      <div id="text" className="  absolute   right-0 flex items-center  pointer-events-none"><FaAngleDown size={20}/></div>
    </div>
  );
};

export default NavbarLanguageSelectInput;
