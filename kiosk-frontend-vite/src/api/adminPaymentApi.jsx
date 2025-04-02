// 📁 src/api/adminPaymentApi.js
import axios from "axios";

export const getAllPayments = async () => {
  const response = await axios.get("http://localhost:8081/api/admin/payments");
  return response.data;
};
