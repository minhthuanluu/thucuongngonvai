import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalPopUp.module.scss";
import { AlertCheckOut } from "../ToastAlert";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const cx = classNames.bind(styles);

function ModalPopUp({
  size,
  cartItems,
  handleAdd,
  handleRemove,
  handleChange,
  handleClear,
  qtys
}) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  const { sizeprice } = cartItems;
  console.log(sizeprice);

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

  // const [sizes, setSizes] = useState("");
  // const [memori, setMemori] = useState("");

  // const handleChange = (e, product_id) => {
  //   let cart = JSON.parse(localStorage.getItem("cart"));

  //   cart.map((item) => {
  //     if (item.id === product_id) {
  //       return (item.size = e);
  //     }
  //   });
  // };

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
                    <dt>Giá tiền</dt>
                    <dt>Số lượng</dt>
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
                          id={item.id}
                          onChange={(e) =>
                            handleChange(e.target.value, item.id)
                          }
                        >
                          {/* <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option> */}
                          {item.size.map((s) => (
                            <option key={s.id} value={s.sizename}>
                              {s.sizename}
                            </option>
                          ))}
                        </select>
                      </dd>

                      <dd className={cx("content-flex-price")}>
                        <select value={size} id={item.id}>
                          {/* <option value="M">{item.size[0].sizeprice}đ</option>
                          <option value="L">{item.size[1].sizeprice}đ</option>
                          <option value="XL">{item.size[2].sizeprice}đ</option> */}
                          {item.size.map((s) => (
                            <option key={s.id} value={s.sizename}>
                              {s.sizeprice}đ
                            </option>
                          ))}
                        </select>
                      </dd>

                      <dd className={cx("content-flex-qty")}>
                        <button onClick={() => handleAdd(item)}>+</button>
                        {qtys ?? item.qty}
                        <button onClick={() => handleRemove(item)}>-</button>
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
