import * as request from "../utils/request";

// Get API user methods
export const createUserMethods = async () => {
  try {
    const res = await request.get(`/payment-methods`);
    // console.log(res.data);
    return res.data
    // return res.orders.data;
  } catch (error) {
    return error;
  }
};
