import React from "react";
import Product from "../../component/Product";

function Home({ items, handleAdd }) {
  return (
    <>
      <main className="home">
        <div id="A"></div>
        <div className="home-hot-products">
          <div className="section-title">
            <div className="text-1 text-2">Su Menu lan 3333333</div>
          </div>
          <div className="section-content container">
            <div className="list-product">
              <Product items={items} handleAdd={handleAdd}></Product>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
