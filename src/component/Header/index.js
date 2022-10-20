import React from "react";
import MenuBar from "./MenuBar";
import images from "../../assets/images";
function Header() {
  return (
    <>
      <header id="header-wrap">
        <div id="header" className="container">
          <a className="logo" href="/">
            <img className="logo-img" src={images.logohead} alt="logo" />
          </a>
          <div className="menu">
            <div className="menu-primary">
              <MenuBar></MenuBar>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
