import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryCart.module.scss";
import * as getOrderHistory from "../../api-service/ordersServices";

const cx = classNames.bind(styles);

function HistoryCart() {
  // const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  // console.log(currentTime);

  const newListOrder = JSON.parse(localStorage.getItem("ListOrder"));
  const [orderHistory, setOrderHistory] = useState([]);
  // const [newOrderHistory, setNewOrderHistory] = useState([]);

  const getOrderList = async () => {
    const list = localStorage.getItem("ListOrderID");
    const newList = JSON.parse(list);
    const arrList = [];
    newList?.map((item) => arrList.push(item));
    const result = await getOrderHistory.getOrderHistory(arrList);
    setOrderHistory(result);
  };

  // const handleDate = () => {
  //   var groups = {};
  //   orderHistory.forEach(function (val) {
  //     var date = val.updated_at.substring(0, 10).split("T")[0];
  //     if (date in groups) {
  //       groups[date].push(val);
  //     } else {
  //       groups[date] = new Array(val);
  //     }
  //   });

  //   // setNewOrderHistory(arrDate);
  //   // console.log(arrDate);
  //   // Edit: to add it in the array format instead

  //   setNewOrderHistory(groups);
  //   return groups;
  // };

  // console.log(newOrderHistory);
  // const handleListProducts = () => {
  //   const arrList = handleDate();
  //   const listProducts = newOrderHistory?.map((items) => console.log(items));
  //   console.log(arrList);
  //   items.get_order_items.map((item) => (
  //     <>

  //       <h3>Ngày đặt hàng: {items.updated_at}</h3>
  //       <dl key={item.id} className={cx("content-flex")}>
  //         <dd className={cx("content-flex-img")}>
  //           <img src={item.product_img_url} alt="" />
  //         </dd>
  //         <dd className={cx("content-flex-name")}>{item.product_name}</dd>
  //         <dd className={cx("content-flex-qty")}>{item.qty}</dd>
  //         <dd className={cx("content-flex-price")}>
  //           {item.price.toLocaleString()}đ
  //         </dd>
  //       </dl>
  //     </>
  //   ))
  // };

  useEffect(() => {
    getOrderList();
    // handleDate();
    // handleListProducts();
  }, []);

  const listProducts = orderHistory?.map((items) => {
    console.log(items);
    return items.get_order_items.map((item) => {
      return (
        <dl key={item.id} className={cx("content-flex")}>
          <dd className={cx("content-flex-img")}>
            <img src={item.product_img_url} alt="" />
          </dd>
          <dd className={cx("content-flex-name")}>
            {item.product_name}
            <br />
            <hr></hr>
            <h6>Ngày mua: {items.order_date}</h6>
          </dd>

          <dd className={cx("content-flex-qty")}>{item.qty}</dd>

          <dd className={cx("content-flex-price")}>
            {item.price.toLocaleString()}đ
          </dd>
        </dl>
      );
    });
  });

  return (
    <>
      <div className={cx("modal-pop-up")}>
        {newListOrder.length === 0 ? (
          <div>
            {newListOrder.length === 0 && (
              <div style={{ margin: 0, maxWidth: "100% !important" }}>
                Hiện tại không có sản phẩm nào!!!
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={cx("left-info")}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Lịch sử đơn hàng
              </h2>
              <div className={cx("content-width")}>
                <div className={cx("content-scroll")}>
                  <dl className={cx("content-flex")}>
                    <dt>Hình ảnh</dt>
                    <dt>Sản phẩm</dt>
                    <dt>Số lượng</dt>
                    <dt>Giá tiền</dt>
                  </dl>

                  {listProducts}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HistoryCart;
