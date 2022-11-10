import * as request from "../utils/request";

// Get API pages
export const pages = async (e, cate_ID, currentPage) => {
  console.log(cate_ID);
  try {
    const res = await request.get(``, {
      params: {
        storeId: cate_ID === "undefined" && cate_ID !== 1 ? cate_ID : 1,
        page: 1,
      },
    });
    // console.log(res.data.products);
    return res.data.products;
  } catch (error) {
    console.log(error);
    return error;
  }
};
