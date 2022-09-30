import React from "react";
// import MenuBar from "./MenuBar";
function Header() {
  return (
    <>
      <header id="header-wrap">
        <div id="header" className="container">
          <a className="logo" href="/">
            <img
              className="logo-img"
              src="https://tocotocotea.com/wp-content/uploads/2021/04/Logo-ngang-01.png"
              alt="logo"
            />
          </a>
          {/* <div className="menu">
            <div className="menu-primary">
              <MenuBar></MenuBar>
            </div>
          </div> */}
        </div>
      </header>
    </>
  );
}

export default Header;
