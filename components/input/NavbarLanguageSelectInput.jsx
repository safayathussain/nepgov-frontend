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
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ne",
          layout: window.google.translate.TranslateElement.InlineLayout.NORMAL,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      const observer = new MutationObserver((mutations, obs) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          obs.disconnect();  
          const options = Array.from(select.options); 
          const englishOption = options.find((opt) => !opt.value);
          if (englishOption) {
            englishOption.innerText = "English";
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="flex items-center font-medium relative w-min">
      <div aria-label="test" id="google_translate_element"></div>
      <div
        id="text"
        className="  absolute  -right-1 flex items-center text-secondary pointer-events-none"
      >
        <FaAngleDown size={22} />
      </div>
    </div>
  );
};

export default NavbarLanguageSelectInput;
