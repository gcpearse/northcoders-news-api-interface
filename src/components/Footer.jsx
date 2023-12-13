const Footer = () => {
  return (
    <footer>
      <button id="scroll-up-btn" onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }}>Back to top</button>
    </footer>
  );
};

export default Footer;
