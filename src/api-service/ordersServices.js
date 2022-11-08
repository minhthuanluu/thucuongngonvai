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
  try {
    // console.log(order_ids);
    // const res = await request.get(`/order/history`, {
    //   data: ["495", "496"],
    // });
    // console.log(res);

    const { data } = await axios.get(
      "https://shop.thomas-dave.store/api/order/history",
      {
        params: {
          order_ids,
        },
      }
    );

    return data.orders.data;
  } catch (error) {
    return error;
  }
};
