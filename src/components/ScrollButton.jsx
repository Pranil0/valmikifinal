import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button when scrollY > 300
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#0F75BD] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
          title="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollButton;
