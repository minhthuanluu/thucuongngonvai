import axios from "axios";
import * as request from "../utils/request";

// Get API create
export const createOrder = async (dataUser) => {
  try {
    const res = await request.post(`/order/create`, dataUser);
    return res;
  } catch (error) {
    return error;
  }
};

// Get API history
export const getOrderHistory = async (order_ids) => {
  // const data = { order_ids: [491, 492, 493] };
  var order_ids = [1];
  try {
    const res = await request.get(`/order/history`, {
      params: {
        order_ids,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response);
    return error;
  }
};
