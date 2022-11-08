import React from "react";
import Product from "../../component/Product";

function Home({ loading, items, handleAdd }) {
  return (
    <>
      <main className="home">
        <div id="A"></div>
        <div className="home-hot-products">
          <div className="section-title">
            <div className="text-1">AGL Menu</div>
            <div className="text-2">Thế Giới Trà Sữa</div>
            <div className="icon-bottom-title"></div>
          </div>
          <div className="section-content container">
            <Product
              loading={loading}
              items={items}
              handleAdd={handleAdd}
            ></Product>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
