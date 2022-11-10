import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import images from "../../assets/images";

import { AlertAddCart } from "../ToastAlert";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

import Paginator from "react-hooks-paginator";
import * as pagesServices from "../../api-service/pagesServices";
import * as categoryServices from "../../api-service/categoryServices";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const cx = classNames.bind(styles);

function Product({ loading, items, handleAdd }) {
  const { t } = useTranslation()

  const [sortItem, setSortItem] = useState(items);
  const [inputSearch, setInputSearch] = useState("");
  const [filters, setFilters] = useState("default");
  const [filterSearchProduct, setFilterSearchProduct] = useState(sortItem);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Xử lý Phân Trang cho sản phẩm
  const handleChangePage = async (currentPage) => {
    const result = await pagesServices.pages(currentPage);
    setSortItem(result.data);
    setCurrentPage(result.current_page)
  };

  const [categoryID, setCategoryID] = useState(1)

  const handleChangeCateId = async (event, newValue) => {
    const result = await categoryServices.category(newValue)
    setCategoryID(result.data);
    console.log(result.data)
  };

  useEffect(() => { }, [items]); // Items được gán giá trị khi component Mount

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
            <TabContext value={categoryID}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeCateId} aria-label="lab API tabs example">
                  <Tab label="Item One" value={1} />
                  <Tab label="Item Two" value={2} />
                  <Tab label="Item Three" value={3} />
                </TabList>
              </Box>
              <TabPanel value={1}>Item One</TabPanel>
              <TabPanel value={2}>Item Two</TabPanel>
              <TabPanel value={3}>Item Three</TabPanel>
            </TabContext>
          </Box>

          <div className="list-product">
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
          </div>
          <ToastContainer />

          <div className={cx("pagination-pro")}>
            <Paginator
              totalRecords={sortItem.length}
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
