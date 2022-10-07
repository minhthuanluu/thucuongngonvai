import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/common.css";
import "./assets/css/home.css";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState(0);
  const [qtys, setQtys] = useState(0);
  const [countItemsCart, setCountItemsCart] = useState(0);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const cartFromLocalStore = JSON.parse(localStorage.getItem("cart"));
    return cartFromLocalStore ?? [];
  });
  const [reload, setReload] = useState(false);

  // const handleTotalPrice = (value) => {
  //   let totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  //   setSize(value);
  // };

  // Tăng số lượng Item
  const handleAdd = (product_id) => {
    // cartItems.push(product);
    // setReload(!reload);

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
  const handleChange = (e, product_id) => {
    // console.log("product_id", product_id);
    // console.log("e", e);

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.map((item) => {
      if (item.id === product_id) {
        return (item.size = e);
      }
    });
    setSize(localStorage.setItem("cart", JSON.stringify(cart)));

    // setSize(localStorage.setItem("cart", JSON.stringify(cart)));
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // const exist = cartItems.findIndex((x) => x.id === product_id);

    // const a = cart.filter((item) => item.id === product_id);
    // console.log("a", a);

    // setSize(e);

    // console.log("n", n);
    // cart.map((item) => {
    //   if (item.id === product_id) {
    //     // cartItems[exist].qty = e;
    //     // console.log(item.id);
    //     item.product_class.forEach((i) => {
    //       // console.log(i);
    //       if (i.class.name === e) {
    //         return i.class.name === e;
    //       }
    //     });
    //   }
    // });

    // setSize(localStorage.setItem("cart", JSON.stringify(cart)));
  };

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
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // processCartItems();
  }, [localStorage, cartItems]); // cartItems -> Sau mỗi lần thêm Item thì cập nhập lại initialStateValue

  const processCartItems = () => {
    let tempCartItem = cartItems;
    const counts = {};
    tempCartItem.forEach(function (x) {
      counts[x.id] = (counts[x.id] || 0) + 1;
    });
    setCountItemsCart(counts);
  };

  return (
    <>
      <DefaultLayout
        loading={loading}
        items={items}
        size={size}
        qty={qtys}
        cartItems={cartItems}
        // countItemsCart={countItemsCart}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleChange={handleChange}
        handleClear={handleClear}
      ></DefaultLayout>
    </>
  );
}

export default App;
