import React from "react";
import { AlertAddCart } from "../ToastAlert";

function Product({ loading, items, handleAdd }) {
  return (
    <>
      {loading && <div>A moment please...</div>}
      {items.map((item) => (
        <div className="product-card" key={item.id}>
          <div className="tags">
            {item.discount > 0 ? (
              <div className="discount-tag">{item.discount}%</div>
            ) : (
              ""
            )}
            {/* {item.newitem ? <div className="new-tag">new</div> : ""} */}
          </div>
          <div className="img-wrap">
            <img src={item.gallery.extension} alt="" />
          </div>
          <div className="product-card-content">
            <div className="product-title">{item.name}</div>
            <div className="product-price">
              <div className="product-origin-price">
                {item.price.toLocaleString()}đ
              </div>
              {item.sale !== "0" ? (
                <div className="product-sale-price">
                  {item.sale.toLocaleString()}đ
                </div>
              ) : (
                ""
              )}
            </div>
            <div onClick={() => handleAdd(item)}>
              <AlertAddCart></AlertAddCart>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
