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
}) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const ref = useRef();
  // const arr = ["M", "L", "XL"];
  // const [total, setTotal] = useState(totalPrice);

  // const renderSwitch = (param) => {
  //   switch (param) {
  //     case "M":
  //       return setTotal(totalPrice);
  //     case "L":
  //       return setTotal(totalPrice + 1);
  //     case "XL":
  //       return setTotal(totalPrice + 2);
  //     default:
  //       break;
  //   }
  // };

  // const onChangeSize = (e, id) => {
  //   cartItems.map((item) => {
  //     if (item.id === id) {
  //       console.log(item.id);
  //       handleChange(e.target.value, id);
  //       renderSwitch(e.target.value);
  //     }
  //   });
  // };

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

                  {cartItems.map((item) => (
                    <dl key={item.id} className={cx("content-flex")}>
                      <dd className={cx("content-flex-img")}>
                        <img src={item.imageurl} alt="" />
                      </dd>
                      <dd className={cx("content-flex-name")}>{item.name}</dd>
                      <dd className={cx("content-flex-option")}>
                        <select
                          value={size}
                          onChange={(e) => handleChange(e.target.value, id)}
                        >
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </dd>

                      <dd className={cx("content-flex-qty")}>
                        <button onClick={() => handleAdd(item)}>+</button>
                        {item.qty}
                        <button onClick={() => handleRemove(item)}>-</button>
                      </dd>

                      <dd className={cx("content-flex-price")}>
                        {totalPrice.toLocaleString()}đ
                      </dd>
                      <dd className={cx("content-flex-del")}>
                        <button onClick={() => handleClear(item.id)}>
                          Xóa
                        </button>
                      </dd>
                    </dl>
                  ))}

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
