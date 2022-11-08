import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
import { AlertAddCart } from "../ToastAlert";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import Paginator from "react-hooks-paginator";

const cx = classNames.bind(styles);

export default function CategoryTabs({
  sort,
  sortMethods,
  filters,
  inputSearch,
  handleAdd,
  tabs,
  setType,
  type,
}) {
  const pageLimit = 8;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(sort.slice(offset, offset + pageLimit));
  }, [offset, sort]);

  return (
    <>
      {/* {console.log(currentDataList)} */}
      {/* <ul className={cx("tab-list")}>
        {tabs.map((tab, index) => (
          <li key={index} className={type === tab ? cx("active") : ""}>
            <button onClick={() => setType(tab)}>
              {tab === "banam" ? <span>Bà Năm</span> : <span>Bà Sáu</span>}
            </button>
          </li>
        ))}
      </ul> */}
      <div className="list-product">
        {currentData.map((item, index) => (
          <>
            {item.get_products
              .filter((subitem) =>
                subitem.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .sort(sortMethods[filters].method)
              .map((subitem) => (
                <div className="product-card" key={subitem.id}>
                  {/* <div className="img-wrap">
                    <img src={subitem.gallery.url} alt="" />
                  </div> */}
                  <div className="product-card-content">
                    <div className="product-title">{subitem.name}</div>
                    <div className="product-price">
                      <div className="product-origin-price">
                        {subitem.price}
                      </div>
                    </div>
                    <div onClick={() => handleAdd(subitem)}>
                      <AlertAddCart></AlertAddCart>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ))}
      </div>
      <div className={cx("pagination-pro")}>
        <Paginator
          totalRecords={sort.length}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagePrevText="..."
          pageNextText="..."
        />
      </div>
    </>
  );
}
