import React, { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import images from "../../assets/images";

import { AlertAddCart } from "../ToastAlert";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

import Paginator from "react-hooks-paginator";
import * as pagesServices from "../../api-service/pagesServices";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from "@mui/material/Tabs";
import TabPanel from '@mui/lab/TabPanel';
import CategoryProduct from "./CategoryProduct";
import axios from "axios";

const cx = classNames.bind(styles);

function Product({ loading, items, handleAdd }) {
  const { t } = useTranslation()

  const [sortItem, setSortItem] = useState(items);
  const [inputSearch, setInputSearch] = useState("");
  const [filters, setFilters] = useState("default");
  const [filterSearchProduct, setFilterSearchProduct] = useState(sortItem);

  const [offset, setOffset] = useState(0);

  // Xử lý tìm kiếm sản phẩm
  const handleSearchProducts = (e) => {
    setInputSearch(e.target.value);
    let updatedProducts = sortItem;
    if (e.target.value) {
      updatedProducts = sortItem.filter((item) =>
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

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryID, setCategoryID] = useState(1)

  const arrData = [
    { id: 1, store_id: 1, crawl_id: 681, name: 'Hoa Tuyết Berry Berry', description: '' }
    ,
    { id: 2, store_id: 1, crawl_id: 682, name: 'Trà sữa Berry Berry', description: '' }
    ,
    { id: 3, store_id: 1, crawl_id: 661, name: 'Caramen chảy', description: '' }
    ,
    { id: 4, store_id: 1, crawl_id: 660, name: 'Cappuchino - Vietnamo', description: '' }
    ,
    { id: 5, store_id: 1, crawl_id: 659, name: 'Latte Latte', description: '' }
    ,
    { id: 6, store_id: 1, crawl_id: 658, name: 'Ngọc Viễn Đông', description: '' }
    ,
    { id: 7, store_id: 1, crawl_id: 632, name: 'Phin Sữa Đá - Năng Lượng', description: '' }
    ,
    { id: 8, store_id: 1, crawl_id: 631, name: 'Phin Đen Đá - Đậm Đà', description: '' }
    ,
    { id: 9, store_id: 1, crawl_id: 594, name: 'Sữa Chua Phúc Bồn Tử Đác Cam', description: 'Berry Berry Yogurt' }
    ,
    { id: 10, store_id: 1, crawl_id: 592, name: 'Sữa Chua Xoài Đác Thơm', description: 'Tropical Yogurt' }
    ,
    { id: 11, store_id: 1, crawl_id: 552, name: 'Trà Lài Đác Thơm', description: 'Forest Jasmine Tea' }
    ,
    { id: 12, store_id: 1, crawl_id: 551, name: 'Hồng Trà Đác Cam', description: 'Forest Black Tea' }
    ,
    { id: 13, store_id: 1, crawl_id: 538, name: 'Trà Nhãn - Sen', description: 'Longan Tea (Lotus)' }
    ,
    { id: 14, store_id: 1, crawl_id: 535, name: 'Trà Nhãn - Lài', description: 'Longan Tea (Jasmine)' }
    ,
    { id: 15, store_id: 1, crawl_id: 502, name: 'Trà Vải - Lài', description: 'Lychee Tea (Jasmine)' }]
  // Xử lý Phân Trang cho sản phẩm
  const handleChangeCateID = async (cate_ID, key, currentPage) => {
    // const result = await pagesServices.pages(e, cate_ID, currentPage);
    // console.log(e);
    // console.log(cate_ID);
    // console.log("phan trang" + currentPage);
    // setCategoryID(cate_ID);
    // setSortItem(result?.data);
    // console.log('B: ', currentPage);
    // const result = await axios.get(`https://shop.thomas-dave.store/api?storeId=${cate_ID}&page=${currentPage}`);
    // if (result) {
    //   console.log(result);
    //   // console.log('A: ', currentPage);
    //   setSortItem(result?.data.data.products.data);
    //   // setCategoryID(currentPage);
    //   // setCurrentPage(currentPage);
    // }
    // setCurrentPage(1);
    // if (key !== 'tab') {
    //   const result = await axios.get(`https://shop.thomas-dave.store/api?storeId=1&page=1`);
    //   setSortItem(result?.data.data.products.data);
    // } else if (key === 'tab') {
    //   const result = await axios.get(`https://shop.thomas-dave.store/api?storeId=${cate_ID}&page=${currentPage}`);
    //   if (result) {
    //     console.log("thay doi cate", result?.data.data.products.data);
    //     // console.log('A: ', currentPage);
    //     setSortItem(result?.data.data.products.data);
    //     setCategoryID(cate_ID);

    //   }
    // }
    if (key === 'tab') {
      try {
        const result = await axios.get(`https://shop.thomas-dave.store/api?storeId=${cate_ID}&page=${currentPage}`);
        if (result) {
          // console.log('A: ', currentPage);
          setSortItem(result?.data.data.products.data);
          setCategoryID(cate_ID);
          setCurrentPage(currentPage)
        }
      } catch (error) {

      }
    }
    // console.log("thay doi cate", cate_ID, " giá trị cua page cateid: ", currentPage);
  };

  // Xử lý Phân Trang cho sản phẩm
  const handleChangePage = async (currentPage) => {
    const result = await axios.get(`https://shop.thomas-dave.store/api?storeId=${categoryID}&page=${currentPage}`);
    // setSortItem(result?.data.data.products.data);
    if (result) {
      setSortItem(result?.data.data.products.data);
      setCurrentPage(currentPage);
    }

    // console.log("giá trị cua cateID: ", categoryID, " giá trị cua page: ", currentPage);
  };

  useEffect(() => {
    const init = () => {
      if (sortItem) {

      } else {
        handleChangeCateID(null, '', 1);
      }
    }
    init();

  }, [items]); // Items được gán giá trị khi component Mount

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
              {t('homepage.search')}:
            </p>
            <input
              value={inputSearch}
              onChange={handleSearchProducts}
              placeholder={t('homepage.searchPlaceholder')}
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
              {t('homepage.sort')}:
            </p>
            <select
              className="field__select"
              onChange={(e) => setFilters(e.target.value)}
            >
              <option value="default">{t('homepage.sortDefault')}</option>
              <option value="ascending">{t('homepage.sortASC')}</option>
              <option value="descending">{t('homepage.sortDESC')}</option>
            </select>
          </div>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={categoryID?.toString()}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={categoryID} onChange={(e, newValue) => handleChangeCateID(newValue, 'tab', currentPage)}>
                  <Tab label="Item One" value={1} />
                  <Tab label="Item Two" value={2} />
                  <Tab label="Item Three" value={3} />
                </Tabs>
              </Box>
              <TabPanel value={"1"}>Item 1</TabPanel>
              <TabPanel value={"2"}>Item 2</TabPanel>
              <TabPanel value={"3"}>Item 3</TabPanel>
            </TabContext>
          </Box>

          <CategoryProduct currentPage={currentPage} inputSearch={inputSearch} sortMethods={sortMethods} filters={filters} handleAdd={handleAdd} sortItem={sortItem} setOffset={setOffset} handleChangeCateID={handleChangeCateID} handleChangePage={handleChangePage}
          ></CategoryProduct>

          {/* {console.log(currentPage)} */}

          {/* <div className="list-product">
            {sortItem?.filter((item) =>
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
          </div> */}

          <ToastContainer />
          {/* {console.log(sortItem.length)} */}
          {/* <div className={cx("pagination-pro")}>
            <Paginator
              totalRecords={sortItem.length}
              pageLimit={5}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={handleChangeCateID}
              pagePrevText="..."
              pageNextText="..."
            />
          </div> */}
        </>
      )
      }
    </>
  );
}

export default Product;
