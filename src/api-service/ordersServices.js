import * as request from "../utils/request";

// Get API create
export const createOrder = async (dataUser) => {
  try {
    const res = await request.post(`/order/create`, dataUser);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Get API history
export const getOrderHistory = async (order_ids) => {
  try {
    const res = await request.get(`/order/history`, {
      params: {
        order_ids,
      },
    });

    return res.orders.data;
  } catch (error) {
    return error;
  }
};
