import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/common.css";
import "./assets/css/home.css";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState("");
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState(0);
  const [qtys, setQtys] = useState(0);
  const [mounts, setMounts] = useState(0);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const cartFromLocalStore = JSON.parse(localStorage.getItem("cart"));
    return cartFromLocalStore ?? [];
  });

  const handleTotalPrice = (value) => {
    let totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    setSize(value);
  };

  // Tăng số lượng Item
  const handleAdd = (product) => {
    if (cartItems.length > 0) {
      const exist = cartItems.findIndex((x) => x.id === product.id);
      let val = cartItems[exist].qty;
      cartItems[exist].qty = val + 1;
      setCartItems(cartItems)
      setQtys(cartItems[exist].qty);
    } else {

    }
  };

  // Giảm số lượng Item
  const handleRemove = (product) => {
    if (cartItems.length > 0) {
      const exist = cartItems.findIndex((x) => x.id === product.id);
      let val = cartItems[exist].qty;
      cartItems[exist].qty = val - 1;
      setCartItems(cartItems);
      setQtys(cartItems[exist].qty);
    }
    else {
      
    }
  };

  // Thay đổi giá trị trong Size select option
  const handleChange = (e, product_id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const exist = cartItems.findIndex((x) => x.id === product_id);
    cart.map((item) => {
      if (item.id === product_id) {
        cartItems[exist].qty = e;
        return setSize((item.size = e));
      }
    });

    // setSize(localStorage.setItem("cart", JSON.stringify(cart)));
  };

  // Xóa từng Item trong Cart
  const handleClear = (product_id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => item.id !== product_id);
    setCartItems(cart);
  };

  useEffect(() => {
    // fake API
    const restAPI = "https://633c0cde74afaef164009261.mockapi.io/dsprdc";
    // Get API
    fetch("https://6336bb585327df4c43c83309.mockapi.io/api/v1/thucuongngonvai")
      .then((res) => res.json())
      .then((items) => {
        setItems(items[0].drinks);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Tạo Cart trong localStore để lưu Item
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [localStorage]); // cartItems -> Sau mỗi lần thêm Item thì cập nhập lại initialStateValue

  return (
    <>
      <DefaultLayout
        loading={loading}
        items={items}
        size={size}
        qty={qtys}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleChange={handleChange}
        handleClear={handleClear}
      ></DefaultLayout>
    </>
  );
}

export default App;
