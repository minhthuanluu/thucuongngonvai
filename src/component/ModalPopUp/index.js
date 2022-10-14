import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import classNames from "classnames/bind";
import styles from "./ModalPopUp.module.scss";
import { AlertCheckOut } from "../ToastAlert";
import Button from "../Button";
import images from "../../assets/images";

const cx = classNames.bind(styles);

const payLoad = [
  {
    id: 1,
    name: "MoMo",
    content: images.qrmomo,
  },
  {
    id: 2,
    name: "Tiền Mặt",
    content:
      "Xin hãy đến gặp Thống và trả tiền 💲 cho anh ấy. Nếu không bạn sẽ bị mất ngón tay 🔪. Xin chân thành cám ơn 🤟.",
  },
];

function ModalPopUp({ cartItems, handleAdd, handleRemove, handleClear }) {
  const [isChecked, setIsChecked] = useState(1);
  const [user, setUser] = useState("");
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState(() => {
    const newUsers = JSON.parse(localStorage.getItem("info"));
    return newUsers ?? [];
  });

  const ref = useRef();
  const enabledButton = user.length >= 2 && phone.length >= 10;

  // Thêm thông tin khách hàng
  const handleSubmitInfo = () => {
    setInfo((prev) => {
      const listInfo = [
        ...prev,
        {
          name: user.replace(/ +(?= )/g, "").trim(),
          phone: phone,
          payload:
            isChecked === 1
              ? "Thanh toán bàng Momo"
              : "Thanh toán bằng tiền mặt",
        },
      ];
      localStorage.setItem("info", JSON.stringify(listInfo));
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return listInfo;
    });
    setUser("");
    setPhone("");
    ref.current.focus();
  };

  // Chức năng giúp input chỉ được nhập số
  const handleChangeNumber = (e) => {
    const rex = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || rex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const listProducts = cartItems.map((item) => {
    return (
      <dl key={item.id} className={cx("content-flex")}>
        <dd className={cx("content-flex-img")}>
          <img src={item.gallery.url} alt="" />
        </dd>
        <dd className={cx("content-flex-name")}>{item.name}</dd>

        <dd className={cx("content-flex-qty")}>
          <button onClick={() => handleRemove(item)}>-</button>
          {item.qty}
          <button onClick={() => handleAdd(item)}>+</button>
        </dd>

        <dd className={cx("content-flex-price")}>
          {item.price.toLocaleString()}đ
        </dd>

        <dd className={cx("content-flex-del")}>
          <button onClick={() => handleClear(item.id)}>Xóa</button>
        </dd>
      </dl>
    );
  });

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

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
                Thêm thông tin cá nhân
              </h2>
              <div className={cx("info-user")}>
                <p>
                  <span>Tên:</span>
                  <input
                    type="text"
                    ref={ref}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </p>
                <p>
                  <span>Điện thoại:</span>
                  <input
                    type="text"
                    maxLength="11"
                    value={phone}
                    onChange={handleChangeNumber}
                  />
                </p>
              </div>

              <div className={cx("info-payload")}>
                <h5>Hình thức thanh toán</h5>
                <div>
                  {payLoad.map((pay) => (
                    <>
                      <label key={pay.id}>
                        <input
                          type="radio"
                          checked={isChecked === pay.id}
                          onChange={() => setIsChecked(pay.id)}
                        />
                        &nbsp;{pay.name}
                      </label>
                      &emsp;
                    </>
                  ))}
                </div>

                <ul>
                  {payLoad.map((pay) => (
                    <li
                      key={pay.id}
                      style={
                        isChecked === pay.id
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {pay.id === 1 ? (
                        // <img src={pay.content} />
                        <>
                          <QRCode
                            id="qrcode"
                            value={user + phone}
                            size={100}
                            level="H"
                          />
                          <h5>{totalPrice.toLocaleString()} VND</h5>
                          <p>Vui lòng thanh toán trước khi đặt hàng</p>
                        </>
                      ) : (
                        <h6>{pay.content}</h6>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={cx("btn-cart")}
                elementdiv="true"
                disabled
                enabledButton={enabledButton}
                onClick={() => handleSubmitInfo()}
              >
                <AlertCheckOut enabledButton={enabledButton}></AlertCheckOut>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ModalPopUp;
