import { useState } from "react";

const Footer = () => {

  const [isVisible, setIsVisible] = useState(false)

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1000) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  return (
    <footer>
      <button className={!isVisible ? (
        "scroll-up-btn"
      ) : (
        "scroll-up-btn scroll-up-btn-visible"
      )} onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }}>&#x25B2;</button>
    </footer>
  );
};

export default Footer;
