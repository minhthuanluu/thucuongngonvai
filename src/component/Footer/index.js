import React, { useState } from "react";
import Popup from "react-animated-popup";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-extreme.css";
import images from "../../assets/images";
import Cart from "../Cart";
import HistoryCart from "../HistoryCart";
import classnames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classnames.bind(style);

function Footer({
  cartItems,
  handleAdd,
  handleRemove,
  handleDeleted,
  handleClear,
}) {
  const [showCart, setShowCart] = useState(false);
  const [showHistoryCart, setShowHistoryCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const [cartItem, setCartItem] = useState(cartItems);

  const handleCart = () => {
    setShowCart(!showCart);
  };

  const handleHistoryCart = () => {
    setShowHistoryCart(!showHistoryCart);
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

        {/* Giỏ hàng */}
        <Tippy content="Giỏ Hàng" animation="scale-extreme" delay={(0, 0)}>
          <a
            onClick={() => handleCart()}
            className={cx(
              "btn-cart",
              showMenu ? "show-menu-cart" : "",
              showCart ? "active" : ""
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

        <div className={cx("popup-over", showCart ? "show-cart" : "")}>
          <Popup
            visible={showCart}
            animationDuration="500"
            onClose={() => setShowCart(false)}
          >
            <a onClick={() => handleCart()}>x</a>
            <Cart
              cartItems={cartItems}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleDeleted={handleDeleted}
              handleClear={handleClear}
            ></Cart>
          </Popup>
        </div>

        {/* Lịch sử đơn hàng */}
        <Tippy
          content="Lịch Sử Đơn Hàng"
          animation="scale-extreme"
          delay={(0, 0)}
        >
          <a
            onClick={() => handleHistoryCart()}
            className={cx(
              "btn-history",
              showMenu ? "show-menu-history" : "",
              showHistoryCart ? "active" : ""
            )}
          >
            <img src={images.imghistory} alt="" />
          </a>
        </Tippy>

        <div
          className={cx(
            "popup-over",
            showHistoryCart ? "show-history-cart" : ""
          )}
        >
          <Popup
            visible={showHistoryCart}
            animationDuration="500"
            onClose={() => setShowHistoryCart(false)}
          >
            <a onClick={() => handleHistoryCart()}>x</a>
            <HistoryCart></HistoryCart>
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
