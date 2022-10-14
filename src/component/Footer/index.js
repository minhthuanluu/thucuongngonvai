import React, { useState } from "react";
import Popup from "react-animated-popup";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-extreme.css";
import images from "../../assets/images";
import ModalPopUp from "../ModalPopUp";
import classnames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classnames.bind(style);

function Footer({
  cartItems,
  handleAdd,
  handleRemove,
  handleChange,
  handleClear,
  countItemsCart,
}) {
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleModalPopUp = () => {
    setShow(!show);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <footer>
        <Tippy content="Thanh Công Cụ" animation="scale-extreme" delay={(0, 0)}>
          <a
            onClick={() => handleShowMenu()}
            className={cx("btn-delivery", showMenu ? "active" : "")}
          >
            <img src={images.delivery} alt="" />
            {cartItems.length ? (
              <span className={cx("qty")}>{cartItems.length}</span>
            ) : (
              ""
            )}
          </a>
        </Tippy>

        <Tippy content="Giỏ Hàng" animation="scale-extreme" delay={(0, 0)}>
          <a
            onClick={() => handleModalPopUp()}
            className={cx(
              "btn-cart",
              showMenu ? "show-menu-cart" : "",
              show ? "active" : ""
            )}
          >
            <img src={images.imgcart} alt="" />
            {cartItems.length ? (
              <span className={cx("qty")}>{cartItems.length}</span>
            ) : (
              ""
            )}
          </a>
        </Tippy>

        <Tippy
          content="Lịch Sử Đơn Hàng"
          animation="scale-extreme"
          delay={(0, 0)}
        >
          <a
            // onClick={() => handleModalPopUp()}
            className={cx("btn-history", showMenu ? "show-menu-history" : "")}
          >
            <img src={images.imghistory} alt="" />
          </a>
        </Tippy>

        <div className={cx("popup-over", show ? "show" : "")}>
          <Popup
            visible={show}
            animationDuration="500"
            onClose={() => setShow(false)}
          >
            <a onClick={() => handleModalPopUp()}>x</a>
            <ModalPopUp
              cartItems={cartItems}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              handleClear={handleClear}
              countItemsCart={countItemsCart}
            ></ModalPopUp>
          </Popup>
        </div>

        <div style={{ textAlign: "center" }}>
          COPYRIGHTⒸ The Gioi Tra Sua All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
