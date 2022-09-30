import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertAddCart = () => {
  const notify = () =>
    toast.success("Bạn đã thêm vào giỏ hàng!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <button onClick={notify} className="button-type-one btn-order-product">
        Thêm Giỏ Hàng
      </button>
      <ToastContainer />
    </>
  );
};

export const AlertCheckOut = () => {
  const notify = () =>
    toast.success("Bạn đã đặt hàng thành công!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <button onClick={notify}>Đặt Hàng</button>
    </>
  );
};
