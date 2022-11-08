import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryCart.module.scss";
import * as getOrderHistory from "../../api-service/ordersServices";

const cx = classNames.bind(styles);

function HistoryCart() {
  // const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  // console.log(currentTime);

  const newListOrder = JSON.parse(localStorage.getItem("ListOrder"));

  const getOrderList = async () => {
    const list = localStorage.getItem("ListOrderID");
    const newList = JSON.parse(list);
    const arrList = [];
    newList?.map((item) => arrList.push(item));
    // console.log(arrList);
    // console.log(newListOrder);
    const result = await getOrderHistory.getOrderHistory(arrList);
    // console.log(result);
  };

  getOrderList();

  // const listProducts = newListOrder.map((item) => {
  //   return (
  //     <dl key={item.id} className={cx("content-flex")}>
  //       <dd className={cx("content-flex-img")}>
  //         <img src={item.product_img_url} alt="" />
  //       </dd>
  //       <dd className={cx("content-flex-name")}>{item.product_name}</dd>

  //       <dd className={cx("content-flex-qty")}>{item.qty}</dd>

  //       <dd className={cx("content-flex-price")}>
  //         {item.price.toLocaleString()}đ
  //       </dd>
  //     </dl>
  //   );
  // });

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

                  {/* {listProducts} */}
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
