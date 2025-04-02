import axios from "axios";

const BASE_URL = "http://localhost:8081/payment";

// ✅ [1단계] 결제 준비 요청 → QR URL 반환
export const requestPayment = async (orderId) => {
  const response = await axios.post(`${BASE_URL}/${orderId}`);
  return response.data.redirectUrl;
};

// ✅ [2단계] 결제 승인 요청
export const approvePayment = async ({ pgToken, orderId }) => {
  const response = await axios.post(`${BASE_URL}/approve`, {
    pgToken,
    orderId,
  });
  return response.data;
};

// ✅ [3단계] 결제 취소 요청 (필요 시 사용)
export const cancelPayment = async (orderId) => {
  const response = await axios.post(`${BASE_URL}/cancel`, null, {
    params: { orderId },
  });
  return response.data;
};
