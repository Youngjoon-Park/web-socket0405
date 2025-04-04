// src/components/admin/OrderDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderDetail({ orderId: propId, onClose }) {
  const { orderId: paramId } = useParams(); // 라우터에서 접근할 경우
  const orderId = propId || paramId;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    console.log("📦 요청할 주문 ID:", orderId);

    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/admin/orders/${orderId}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("❌ 상세 정보 가져오기 실패:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) return <div>📦 로딩 중...</div>;

  return (
    <div className="p-4 border mt-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-2">주문 상세 (ID: {order.orderId})</h2>
      <p><strong>총 가격:</strong> {order.totalPrice} 원</p>
      <p><strong>상태:</strong> {order.status}</p>
      <h3 className="mt-2 font-semibold">주문 항목</h3>
      <ul className="list-disc pl-6">
        {order.items.map((item, index) => (
          <li key={index}>
            메뉴: {item.menuName}, 수량: {item.quantity}, 가격: {item.price} 원
          </li>
        ))}
      </ul>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
        >
          닫기
        </button>
      )}
    </div>
  );
}

export default OrderDetail;
