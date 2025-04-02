// src/pages/AdminHome.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍💼 관리자 페이지</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/admin/orders">📦 주문 내역 보기</Link>
        </li>
        <li>
          <Link to="/admin/payments">💳 결제 내역 보기</Link>
        </li>
        <li>
          <Link to="/menu-test">🍽️ 메뉴 목록 보기</Link>
        </li>
        <li>
          <Link to="/menu-add">➕ 메뉴 추가</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminHome;
