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
  // const [value, setValue] = useState("1");
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const pageLimit = 8;

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [currentDataOne, setCurrentDataOne] = useState([]);

  useEffect(() => {
    // if (currentData) {
    //   setCurrentDataOne(JSON.stringify(currentData));
    // }
    setCurrentData(sort.slice(offset, offset + pageLimit));
  }, [offset, sort]);

  for (let i = 0; i < sort.length; i++) {
    // console.log(currentDataOne[i].get_products);
    var dataList = sort[i].get_products.map((item) => {
      return <>{item}</>;
    });

    console.log(dataList);

    // var dataList1 = currentData[i].get_products
    // .filter((item) =>
    //   item.name.toLowerCase().includes(inputSearch.toLowerCase())
    // )
    // .sort(sortMethods[filters].method)
    // .map((item) => {
    //   return (
    //     <div className="product-card" key={item.id}>
    //       {/* <div className="img-wrap">
    //     <img src={item.gallery.url} alt="" />
    //   </div> */}
    //       <div className="product-card-content">
    //         <div className="product-title">{item.name}</div>
    //         <div className="product-price">
    //           <div className="product-origin-price">{item.price}</div>
    //         </div>
    //         <div onClick={() => handleAdd(item)}>
    //           <AlertAddCart></AlertAddCart>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
  }

  return (
    <>
      <ul className={cx("tab-list")}>
        {tabs.map((tab, index) => (
          <li key={index} className={type === tab ? cx("active") : ""}>
            <button onClick={() => setType(tab)}>
              {tab === "banam" ? <span>Bà Năm</span> : <span>Bà Sáu</span>}
            </button>
          </li>
        ))}
      </ul>
      <div className="list-product">{/* {dataList} */}</div>
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
