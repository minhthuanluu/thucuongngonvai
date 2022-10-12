import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/common.css";
import "./assets/css/home.css";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  // const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const cartFromLocalStore = JSON.parse(localStorage.getItem("cart"));
    return cartFromLocalStore ?? [];
  });

  // Tăng số lượng Item
  const handleAdd = (product_id) => {
    const exist = cartItems.find((x) => x.id === product_id.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === product_id.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(newCartItems);
    } else {
      const newCartItems = [...cartItems, { ...product_id, qty: 1 }];
      setCartItems(newCartItems);
    }
  };

  // Giảm số lượng Item
  const handleRemove = (product_id) => {
    const exist = cartItems.find((x) => x.id === product_id.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== product_id.id);
      setCartItems(newCartItems);
    } else {
      const newCartItems = cartItems.map((x) =>
        x.id === product_id.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartItems(newCartItems);
    }
  };

  // Thay đổi giá trị trong Size select option
  // const handleChange = (e, product_id) => {
  //   let cart = JSON.parse(localStorage.getItem("cart"));

  //   cart.map((item) => {
  //     if (item.id === product_id) {
  //       return (item.size = e);
  //     }
  //   });
  //   setSize(localStorage.setItem("cart", JSON.stringify(cart)));
  // };

  // Xóa từng Item trong Cart
  const handleClear = (product_id) => {
    setCartItems(cartItems.filter((item) => item.id !== product_id));
  };

  useEffect(() => {
    // Get API
    fetch("https://6336bb585327df4c43c83309.mockapi.io/api/v1/thucuongngonvai")
      .then((res) => res.json())
      .then((items) => {
        setItems(items[0].products);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Tạo Cart trong localStore để lưu Item
    // localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]); // cartItems -> Sau mỗi lần thêm Item thì cập nhập lại initialStateValue

  return (
    <>
      <DefaultLayout
        loading={loading}
        items={items}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleClear={handleClear}
      ></DefaultLayout>
    </>
  );
}

export default App;
