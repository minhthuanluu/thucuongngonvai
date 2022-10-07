import React from "react";
import Product from "../../component/Product";

function Home({ loading, items, handleAdd }) {
  return (
    <>
      <main className="home">
        <div id="A"></div>
        <div className="home-hot-products">
          <div className="section-title">
            <div className="text-1 text-2">Thế Giới Trà Sữa</div>
          </div>
          <div className="section-content container">
            <div className="list-product">
              <Product
                loading={loading}
                items={items}
                handleAdd={handleAdd}
              ></Product>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
