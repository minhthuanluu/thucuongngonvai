import React from "react";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <>
      <ul id="menu-menu-chinh" className="menu">
        <li
          id="menu-item-1271"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
        >
          <Link to="/thucuongngonvai" aria-current="page">
            Trang chủ
          </Link>
        </li>
        <li
          id="menu-item-1551"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1551"
        >
          <Link to="/login">Đăng nhập</Link>
        </li>
      </ul>
    </>
  );
}

export default MenuBar;
