// src/pages/AdminPaymentPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/admin/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error("❌ 결제 내역 불러오기 실패:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>💳 결제 내역</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>주문번호</th>
            <th>TID</th>
            <th>상태</th>
            <th>승인시간</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.orderId}</td>
              <td>{p.tid}</td>
              <td>{p.status}</td>
              <td>{p.approvedAt?.replace("T", " ").slice(0, 19)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentPage;
