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
    let tempPrice = 0;
    let tempAmount = 0;

    const { price, qty, size } = product;
    // size.map((s) => {
    //   <div key={s.id}>{console.log(s.sizename)}</div>;
    // });

    // console.log(product.qty);
    // setMounts(price * qty);
    // tempPrice = price * qty;
    // tempAmount += tempPrice;
    // console.log(tempAmount);
    const exist = cartItems.find((x) => x.id === product.id);
    const getBySize = cartItems.filter((x) => x.size === sizes);
    setPrices(price);
    setQtys(qty);
    // console.log(sizes);
    // console.log(cartItems.filter((x) => console.log(x)));
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      tempAmount += qty * price;
      setMounts(mounts + tempAmount);

      // if (sizes) {
      //   console.log(sizes * price);
      // }
      // setCartItems(newCartItems);
    } else {
      const newCartItems = [...cartItems, { ...product, qty: 1 }];
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

  // Thay đổi giá trị trong select option
  const handleChange = (e, product_id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((item) => {
      if (item.id === product_id) {
        console.log(item);
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
  }, [cartItems]); // cartItems -> Sau mỗi lần thêm Item thì cập nhập lại initialStateValue

  return (
    <>
      <DefaultLayout
        loading={loading}
        items={items}
        size={size}
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
