import Axios from "axios";

export const http = Axios.create({
  baseURL: process.env.API_URL,
});
