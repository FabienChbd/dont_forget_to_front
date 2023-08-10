import Logo from "../assets/logo.png";
import "./header.css";

const Header = () => {
  return (
    <>
      <img className="logo" src={Logo} alt="logo" />
    </>
  );
};

export default Header;
