import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetail from './OrderDetail';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const url = 'http://localhost:8081/api/admin/orders';
    console.log("📡 요청 URL 확인:", url); // ✅ 요청 URL 출력
  
    axios.get(url)
      .then(response => {
        console.log("📥 응답 데이터 확인:", response); // ✅ 응답 전체 출력
        setOrders(response.data);
      })
      .catch(error => {
        console.error("❌ 주문 목록 불러오기 실패:", error); // ✅ 에러 전체 출력
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 관리</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">주문번호</th>
            <th className="border p-2">수량</th>
            <th className="border p-2">상태</th>
            <th className="border p-2">상세보기</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.totalAmount}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => setSelectedOrderId(order.id)}
                  className="text-blue-600 underline"
                >
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <OrderDetail
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
};

export default AdminOrders;
