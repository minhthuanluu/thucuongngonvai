import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { AlertCheckOut } from "../ToastAlert";
import Button from "../Button";
import images from "../../assets/images";
import * as createOrder from "../../api-service/ordersServices";

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

function Cart({
  cartItems,
  handleAdd,
  handleRemove,
  handleDeleted,
  handleClear,
}) {
  const [isChecked, setIsChecked] = useState(1);
  const [customer_name, setCustomer_name] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [infoCustomer, setInfoCustomer] = useState(() => {
    const newCustomer = JSON.parse(localStorage.getItem("ListInfoCustomer"));
    return newCustomer ?? [];
  });

  const [orderList, setOrderList] = useState(() => {
    const newOrderList = JSON.parse(localStorage.getItem("ListOrder"));
    return newOrderList ?? [];
  });

  const [orderListID, setOrderListID] = useState(() => {
    const newOrderListID = JSON.parse(localStorage.getItem("ListOrderID"));
    return newOrderListID ?? [];
  });

  const ref = useRef();
  const enabledButton =
    customer_name.length >= 2 && customer_phone.length >= 10;

  // Thêm thông tin và sản phẩm của khách hàng
  const handleSubmit = async (
    total_payment,
    customer_name,
    customer_phone,
    client_ip,
    order_note,
    order_items
  ) => {
    setInfoCustomer((prev) => {
      const listInfoCustomer = [
        ...prev,
        {
          customer_name: customer_name.replace(/ +(?= )/g, "").trim(),
          customer_phone: customer_phone,
          payload:
            isChecked === 1
              ? "Thanh toán bàng Momo"
              : "Thanh toán bằng tiền mặt",
        },
      ];
      localStorage.setItem(
        "ListInfoCustomer",
        JSON.stringify(listInfoCustomer)
      );
      return listInfoCustomer;
    });

    setOrderList((prev) => {
      const oldOrderList = [...prev];
      const currentOrderList = orderItems;
      const listOrder = oldOrderList.concat(currentOrderList);
      localStorage.setItem("ListOrder", JSON.stringify(listOrder));
      return listOrder;
    });

    const orderItems = handleProductsList(order_items);
    const params = {
      total_payment,
      customer_name,
      customer_phone,
      client_ip,
      order_note,
      order_items: orderItems,
    };
    setOrderListID(async (prev) => {
      const oldID = [...prev];
      const currentID = await createOrder.createOrder(params); // GET order_ids
      const listOrderID = oldID.concat(currentID.orderId);
      localStorage.setItem("ListOrderID", JSON.stringify(listOrderID));
      return listOrderID;
    });

    try {
      setInfoCustomer();
      setOrderList();
    } catch (error) {
      console.log(error);
    }

    handleClear();
    setCustomer_name("");
    setCustomer_phone("");
    ref.current.focus();
  };

  // Xử lý thêm các params trong API order/create
  const handleProductsList = (order_items) => {
    const arrOrder = [];
    for (let index = 0; index < order_items.length; index++) {
      const element = order_items[index];
      const qty = element.qty;
      const price = element.price;
      const product_name = element.name;
      const product_img_url = element.get_image.url;
      const order_item_note = element.description;
      arrOrder.push({
        qty,
        price,
        product_name,
        product_img_url,
        order_item_note,
      });
    }

    return arrOrder;
  };

  // Chức năng giúp input chỉ được nhập số
  const handleChangeNumber = (e) => {
    const rex = /^[0-9\b]+$/; //rules
    if (e.target.value === "" || rex.test(e.target.value)) {
      setCustomer_phone(e.target.value);
    }
  };

  // Chức năng giúp input chỉ được nhập chữ
  const handleChangeUser = (e) => {
    const rex = /^[a-zA-Z\s\W]+$/; //rules
    if (e.target.value === "" || rex.test(e.target.value)) {
      setCustomer_name(e.target.value);
    }
  };

  const listProducts = cartItems.map((item) => {
    return (
      <dl key={item.id} className={cx("content-flex")}>
        <dd className={cx("content-flex-img")}>
          <img src={item.get_image.url} alt="" />
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
          <button onClick={() => handleDeleted(item.id)}>Xóa</button>
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
                    value={customer_name}
                    onChange={handleChangeUser}
                  />
                </p>
                <p>
                  <span>Điện thoại:</span>
                  <input
                    type="text"
                    maxLength="11"
                    value={customer_phone}
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
                            value={customer_name + customer_phone}
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
                onClick={() =>
                  handleSubmit(
                    totalPrice,
                    customer_name,
                    customer_phone,
                    "192.168.1.1",
                    "Khong co gi",
                    cartItems
                  )
                }
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

export default Cart;
