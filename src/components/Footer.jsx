const Footer = () => {
  return (
    <footer>
      <button id="scroll-up-btn" onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }}>&#x25B2;</button>
    </footer>
  );
};

export default Footer;
