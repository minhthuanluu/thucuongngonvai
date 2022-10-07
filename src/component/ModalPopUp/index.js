import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalPopUp.module.scss";
import { AlertCheckOut } from "../ToastAlert";

const cx = classNames.bind(styles);

function ModalPopUp({
  size,
  cartItems,
  handleAdd,
  handleRemove,
  handleChange,
  handleClear,
  qtys,
  // countItemsCart,
}) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const ref = useRef();

  const [user, setUser] = useState("");
  const [users, setUsers] = useState(() => {
    const newUsers = JSON.parse(localStorage.getItem("user"));
    return newUsers ?? [];
  });
  const handleSubmitInfo = () => {
    setUsers((prev) => {
      const listUser = [...prev, user];
      localStorage.setItem("user", JSON.stringify(listUser));

      return listUser;
    });
    setUser("");
    ref.current.focus();
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "M":
        return "500";
      case "L":
        return "1500";
      case "XL":
        return "2000";
      default:
        return "0";
    }
  };

  // const filterCart = () => {
  //   let _cartArray = Object.entries(countItemsCart);
  //   let newArray = [];
  //   for (let i = 0; i < _cartArray.length; i++) {
  //     const element = _cartArray[i];
  //     let obj = { id: element[0], amount: element[1] };
  //     newArray.push(obj);
  //   }
  //   let finalArray = [];
  //   for (let j = 0; j < newArray.length; j++) {
  //     const jElement = newArray[j];
  //     let tempElement = null;
  //     var countfiltered = cartItems.filter(function (element) {
  //       return jElement.id == element.id;
  //     });

  //     finalArray.push({
  //       item: countfiltered[0],
  //       count: countfiltered.length,
  //     });
  //   }

  //   return finalArray;
  // };

  const listProducts = cartItems.map((item) => {
    // const { item } = val;
    return (
      <dl key={item.id} className={cx("content-flex")}>
        <dd className={cx("content-flex-img")}>
          <img src={item.gallery.extension} alt="" />
        </dd>
        <dd className={cx("content-flex-name")}>{item.name}</dd>
        <dd className={cx("content-flex-option")}>
          <select
            id={item.id}
            // value={size}
            onChange={(e) => handleChange(e.target.value, item.id)}
          >
            {item.availableSizes.length > 0
              ? item.availableSizes.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))
              : null}
          </select>
        </dd>

        <dd className={cx("content-flex-qty")}>
          <button onClick={() => handleAdd(item)}>+</button>
          {item.qty}
          <button onClick={() => handleRemove(item)}>-</button>
        </dd>

        <dd className={cx("content-flex-price")}>
          {/* {item.price} */}
          {renderSwitch(size)}
        </dd>

        <dd className={cx("content-flex-del")}>
          <button onClick={() => handleClear(item.id)}>Xóa</button>
        </dd>
      </dl>
    );
  });

  return (
    <>
      <div className={cx("modal-pop-up")}>
        {cartItems.length === 0 ? (
          <div>
            {cartItems.length === 0 && (
              <div style={{ margin: 0, maxWidth: "100% !important" }}>
                Hiện tại không có sản phẩm nào!!!
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={cx("left-info")}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Thông tin sản phẩm
              </h2>
              <div className={cx("content-width")}>
                <div className={cx("content-scroll")}>
                  <dl className={cx("content-flex")}>
                    <dt>Hình ảnh</dt>
                    <dt>Sản phẩm</dt>
                    <dt>Chọn size</dt>
                    <dt>Số lượng</dt>
                    <dt>Giá tiền</dt>
                    <dt>Xóa</dt>
                  </dl>

                  {listProducts}

                  {cartItems.length !== 0 && (
                    <>
                      <dl className={cx("content-flex", "last-info")}>
                        <dd>Tổng giá trị</dd>
                        <dd>{totalPrice.toLocaleString()}đ</dd>
                      </dl>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("right-info")}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Thêm thông tin
              </h2>
              <div className={cx("info-user")}>
                <p>
                  Tên:{" "}
                  <input
                    type="text"
                    ref={ref}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </p>
              </div>

              <div
                className={cx("btn-cart")}
                onClick={() => handleSubmitInfo()}
              >
                <AlertCheckOut></AlertCheckOut>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ModalPopUp;
