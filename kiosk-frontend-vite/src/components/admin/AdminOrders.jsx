import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetail from './OrderDetail';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws-endpoint");
    const client = Stomp.over(socket);
    client.debug = console.log;
    console.log("🔥 AdminOrders 컴포넌트 렌더링됨");


    client.connect({}, () => {
      console.log("📡 WebSocket 연결 성공 ✅");

      client.subscribe("/topic/orders", (message) => {
        const newOrder = JSON.parse(message.body);
        console.log("🆕 새 주문 수신:", newOrder);
        setOrders((prev) => [newOrder, ...prev]);
      });
    }, (error) => {
      console.error("❌ WebSocket 연결 실패:", error);
    });

    return () => {
      client.disconnect(() => {
        console.log("🛑 WebSocket 연결 해제됨");
      });
    };
  }, []);

  useEffect(() => {
    const url = 'http://localhost:8081/api/admin/orders';
    axios.get(url)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("❌ 주문 목록 불러오기 실패:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 관리 ✅ 연결 성공</h1>
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
  {orders.map(order => {
    console.log("📦 주문 객체:", order); // 로그 찍기
    return (
      <tr key={order.id}>
        <td className="border p-2">{order.id}</td>
        <td className="border p-2">
          {order.items?.map(item => item.menuName).join(", ")}
        </td>
        <td className="border p-2">
          {order.items?.map(item => item.quantity).join(", ")}
        </td>
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
    );
  })}
</tbody></table>

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
