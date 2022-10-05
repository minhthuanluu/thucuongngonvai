import React, { useState } from "react";
import Popup from "react-animated-popup";
import images from "../../assets/images";
import ModalPopUp from "../ModalPopUp";
import classnames from "classnames/bind";
import style from "./Footer.module.scss";

const cx = classnames.bind(style);

function Footer({
  size,
  cartItems,
  handleAdd,
  handleRemove,
  handleChange,
  handleClear,
  countItemsCart
}) {
  const [show, setShow] = useState(false);

  const handleModalPopUp = () => {
    setShow(!show);
  };

  return (
    <>
      <footer>
        <a onClick={() => handleModalPopUp()} className="btn-delivery">
          <img src={images.delivery} alt="" />
          {cartItems.length ? (
            <span className={cx("qty")}>{cartItems.length}</span>
          ) : (
            ""
          )}
        </a>

        <div className={cx("popup-over", show ? "show" : "")}>
          <Popup
            visible={show}
            animationDuration="500"
            onClose={() => setShow(false)}
          >
            <a onClick={() => handleModalPopUp()}>x</a>
            <ModalPopUp
              cartItems={cartItems}
              size={size}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              handleClear={handleClear}
              countItemsCart={countItemsCart}
            ></ModalPopUp>
          </Popup>
        </div>

        <div style={{ textAlign: "center" }}>
          COPYRIGHTⒸ Tra Sua Su All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
