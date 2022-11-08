import * as request from "../utils/request";

// Get API pages
export const pages = async (currentPage) => {
  try {
    const res = await request.get(``, {
      params: {
        storeId: 1,
        page: currentPage,
      },
    });
    return res.products;
  } catch (error) {
    console.log(error);
  }
};
