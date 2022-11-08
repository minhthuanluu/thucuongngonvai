import axios from "axios";

const request = axios.create({
  baseURL: "https://shop.thomas-dave.store/api",
});

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data.data;
};

export const post = async (path, options = {}) => {
  const response = await request.post(path, options);
  return response.data.data;
};

export default request;
