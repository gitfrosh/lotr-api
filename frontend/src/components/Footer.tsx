import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="hr-like">
        <br />
        All we have to decide is what to do with the time that is given to us.{" "}
        <b>Built with &hearts; in {new Date().getFullYear()}</b> <br />
      </p>
    </footer>
  );
};

export default Footer;
