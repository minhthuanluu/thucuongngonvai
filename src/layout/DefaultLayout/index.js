import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

import classnames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../../routes";
import FirstLayout from "../FirstLayout";
import SecondLayout from "../SecondLayout";


const cx = classnames.bind(style);

function DefaultLayout({
  loading,
  items,
  cartItems,
  handleAdd,
  handleRemove,
  handleClear,
}) {
  return (
    <div className={cx("page-over")}>
      <Header></Header>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = FirstLayout;
     
          if (route.layout) {
            Layout = route.layout;
          } else if ( route.layout === SecondLayout ){
            Layout = SecondLayout;
          }

          return <Route key={index} path={route.path} element={<Layout><Page loading={loading} items={items} handleAdd={handleAdd} /></Layout>}></Route>
        })}
      </Routes>
      <Footer
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleClear={handleClear}
      ></Footer>
    </div>
  );
}

export default DefaultLayout;
