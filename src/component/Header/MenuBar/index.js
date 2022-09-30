import React from "react";
import { SubMenuBar1, SubMenuBar2, SubMenuBar3 } from "./SubMenuBar";
function MenuBar(props) {
  return (
    <>
      <ul id="menu-menu-chinh" className="menu">
        <li
          id="menu-item-1271"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
        >
          <a href="" aria-current="page">
            Trang chủ
          </a>
        </li>
        <li
          id="menu-item-1272"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1272"
        >
          <a href="">Giới thiệu</a>
          <SubMenuBar1></SubMenuBar1>
        </li>
        <li
          id="menu-item-1268"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-1268"
        >
          <a href="">Sản phẩm</a>
          <SubMenuBar2></SubMenuBar2>
        </li>
        <li
          id="menu-item-2057"
          className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-2057"
        >
          <a href="">Tin tức</a>
          <SubMenuBar3></SubMenuBar3>
        </li>
        <li
          id="menu-item-1281"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1281"
        >
          <a href="">Cửa hàng</a>
        </li>
        <li
          id="menu-item-12301"
          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-12301"
        >
          <a href="">Tuyển dụng</a>
        </li>
        <li
          id="menu-item-1551"
          className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1551"
        >
          <a href="">Nhượng quyền</a>
        </li>
      </ul>
    </>
  );
}

export default MenuBar;
