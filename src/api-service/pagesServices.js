import axios from "axios";
import * as request from "../utils/request";

// Get API pages
export const pages = async (e, cate_ID, currentPage) => {
  try {
    const res = await axios.get(`https://shop.thomas-dave.store/api?storeId=${cate_ID}&page=${currentPage}`)

    return res.data.data.products;
  } catch (error) {
    console.log(error);
    return error;
  }
};
