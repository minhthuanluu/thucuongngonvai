import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import images from "../../assets/images";

import { AlertAddCart } from "../ToastAlert";
import { ToastContainer } from "react-toastify";

import Paginator from "react-hooks-paginator";
import * as pagesServices from "../../api-service/pagesServices";

const cx = classNames.bind(styles);

function Product({ loading, items, handleAdd }) {
  const [sort, setSort] = useState(items);
  const [inputSearch, setInputSearch] = useState("");
  const [filters, setFilters] = useState("default");
  const [filterSearchProduct, setFilterSearchProduct] = useState(sort);

  const [offset, setOffset] = useState(0);
  const currentPage = 1;

  // Xử lý tìm kiếm sản phẩm
  const handleSearchProducts = (e) => {
    setInputSearch(e.target.value);
    let updatedProducts = sort;
    if (e.target.value) {
      updatedProducts = sort.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    setFilterSearchProduct(updatedProducts);
  };

  // Xử lý Select option tăng giảm giá
  const sortMethods = {
    default: { method: (a, b) => (a.id > b.id ? 1 : -1) }, // Chọn giá mặc định ban đầu
    ascending: { method: (a, b) => a.price - b.price }, // Chọn giá tăng dần
    descending: { method: (a, b) => b.price - a.price }, // Chọn giá giảm dần
  };

  // Xử lý Phân Trang cho sản phẩm
  const handleChangePage = async (currentPage) => {
    const result = await pagesServices.pages(currentPage);
    setSort(result.data);
  };

  useEffect(() => {}, [items]); // Items được gán giá trị khi component Mount

  return (
    <>
      {loading ? (
        <div>
          <img src={images.loading} alt="loading" />
        </div>
      ) : (
        <>
          <div
            className="flex"
            style={{
              marginTop: "50px",
              padding: "30px 15px",
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
            }}
          >
            <p
              style={{
                marginBottom: "0",
                marginRight: "10px",
                fontSize: "20px",
              }}
            >
              Tìm kiếm:
            </p>
            <input
              value={inputSearch}
              onChange={handleSearchProducts}
              placeholder="Tìm sản phẩm..."
              className="field__input"
            />
            <p
              style={{
                marginBottom: "0",
                marginRight: "10px",
                marginLeft: "30px",
                fontSize: "20px",
              }}
            >
              Sắp xếp theo:
            </p>
            <select
              className="field__select"
              onChange={(e) => setFilters(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="ascending">Giá tăng dần</option>
              <option value="descending">Giá giảm dần</option>
            </select>
          </div>

          {/* Category từng sản phẩm */}
          {/* <CategoryTabs
            sort={sort}
            sortMethods={sortMethods}
            filters={filters}
            inputSearch={inputSearch}
            handleAdd={handleAdd}
            tabs={tabs}
            setType={setType}
            // onChangePage={(storeId,currentPage)=>callAPI(currentPage)}
            type={type}
          ></CategoryTabs> */}

          <div className="list-product">
            {sort
              .filter((item) =>
                item.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .sort(sortMethods[filters].method)
              .map((item) => (
                <div className="product-card" key={item.id}>
                  <div className="img-wrap">
                    <img src={item.get_image.url} alt="" />
                  </div>
                  <div className="product-card-content">
                    <div className="product-title">{item.name}</div>
                    <div className="product-price">
                      <div className="product-origin-price">
                        {item.price.toLocaleString()}đ
                      </div>
                    </div>
                    <div onClick={() => handleAdd(item)}>
                      <AlertAddCart></AlertAddCart>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <ToastContainer />

          <div className={cx("pagination-pro")}>
            <Paginator
              totalRecords={sort.length}
              pageLimit={5}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={handleChangePage}
              pagePrevText="..."
              pageNextText="..."
            />
          </div>
        </>
      )}
    </>
  );
}

export default Product;
