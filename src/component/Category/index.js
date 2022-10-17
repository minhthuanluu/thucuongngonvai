import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AlertAddCart } from "../ToastAlert";

import classNames from "classnames/bind";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

export default function CategoryTabs({
  sort,
  sortMethods,
  filters,
  inputSearch,
  handleAdd,
}) {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState(sort)
  const [users, setUsers] = useState([])
  const [totalOfPages, setTotalOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const elementPerPage = 4
  
  useEffect(() => {
    const init = () => {
      if (sort) {
        setData(sort);
      }
    };
    init();

    const totalOfData = data.length
    const startAt = currentPage * elementPerPage - elementPerPage

  
    setTotalOfPages(Math.ceil(totalOfData / elementPerPage));
    setUsers(data.slice(startAt, startAt + elementPerPage))
    

    console.log({
      totalOfData,
      elementPerPage,
      totalOfPages,
      startAt,
      currentPage
    })
    // eslint-disable-next-line
  }, [sort, currentPage])

  const handleCurrentPage = e => {
    e.preventDefault()

    setCurrentPage(Number(e.target.id))
  }

  return (
    <>
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={cx("tab-list")}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Trà sữa bà 2" value="1" />
            <Tab label="Trà sữa bà 3" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="list-product">
            {users
              .filter((item) =>
                item.gallery.extension
                  .toLowerCase()
                  .includes(inputSearch.toLowerCase())
              )
              .sort(sortMethods[filters].method)
              .map((item) => {
                return (
                  <div className="product-card" key={item.id}>
                    <div className="img-wrap">
                      <img src={item.gallery.url} alt="" />
                    </div>
                    <div className="product-card-content">
                      <div className="product-title">{item.name}</div>
                      <div className="product-price">
                        <div className="product-origin-price">
                          {item.price.toLocaleString()}đ
                        </div>
                        {item.sale !== 0 ? (
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
                );
              })}
          </div>
          <div className="navigator">
            {[...Array(totalOfPages).keys()].map(index => {
              const page = index + 1
    
              return (
                <button
                  key={page}
                  className={index === currentPage - 1 ? 'active' : ''}
                  id={page}
                  onClick={handleCurrentPage}
                >
                  {page}{' '}
                </button>
              )
            })}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="list-product">
            {sort
              .filter((item) =>
                item.gallery.extension
                  .toLowerCase()
                  .includes(inputSearch.toLowerCase())
              )
              .sort(sortMethods[filters].method)
              .map((item) => {
                if (item.store_id === 2) {
                  return (
                    <div className="product-card" key={item.id}>
                      <div className="img-wrap">
                        <img src={item.gallery.url} alt="" />
                      </div>
                      <div className="product-card-content">
                        <div className="product-title">{item.name}</div>
                        <div className="product-price">
                          <div className="product-origin-price">
                            {item.price.toLocaleString()}đ
                          </div>
                          {item.sale !== 0 ? (
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
                  );
                }
              })}
          </div>
      
        </TabPanel>
       
      </TabContext>
      
    </Box></>

  );
}
