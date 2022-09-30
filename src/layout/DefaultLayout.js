import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SimpleSlider from "../component/Header/SliderBar";

import Home from "../page/Home";

import classnames from "classnames/bind";
import style from "./DefaultLayout.module.scss";

const cx = classnames.bind(style);

function DefaultLayout({
  loading,
  size,
  items,
  cartItems,
  handleAdd,
  handleRemove,
  handleChange,
  handleClear,
}) {
  return (
    <div className={cx("page-over")}>
      <Header></Header>
      <SimpleSlider></SimpleSlider>
      <Home loading={loading} items={items} handleAdd={handleAdd}></Home>
      <Footer
        size={size}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleChange={handleChange}
        handleClear={handleClear}
      ></Footer>
    </div>
  );
}

export default DefaultLayout;
