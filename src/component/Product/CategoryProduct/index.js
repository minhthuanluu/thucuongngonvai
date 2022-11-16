import React, { useEffect, useState } from "react";
import Paginator from "react-hooks-paginator";
import { AlertAddCart } from "../../ToastAlert";
import classNames from "classnames/bind";
import styles from "../Product.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function CategoryProduct({ sortItem, inputSearch, sortMethods, filters, handleAdd, setOffset, handleChangePage }) {

    const [currentPageCate, setCurrentPageCate] = useState(1);
    const handleChangePageCate = (currentPageCate) => {
        setCurrentPageCate(currentPageCate)
    };

    handleChangePage(currentPageCate)
    return (
        <>
            <div className="list-product">
                {console.log(sortItem)}
                {sortItem?.filter((item) =>
                    item.name.toLowerCase().includes(inputSearch.toLowerCase())
                )
                    .sort(sortMethods[filters].method)
                    .map((item) => (
                        <div className="product-card" key={item.id}>
                            <div className="img-wrap">
                                {/* <img src={item.get_image.url} alt="" /> */}
                            </div>
                            <div className="product-card-content">
                                <div className="product-title">{item.name}</div>
                                <div className="product-price">
                                    <div className="product-origin-price">
                                        {/* {item.price.toLocaleString()}đ */}
                                    </div>
                                </div>
                                <div onClick={() => handleAdd(item)}>
                                    <AlertAddCart></AlertAddCart>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className={cx("pagination-pro")}>
                <Paginator
                    totalRecords={sortItem.length}
                    pageLimit={5}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPageCate}
                    setCurrentPage={handleChangePageCate}
                    pagePrevText="..."
                    pageNextText="..."
                />
            </div>
        </>
    );
}

export default CategoryProduct;