// ✅ CartButton.jsx (위치 및 크기 보정)
import React from "react";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/cart")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "14px 22px",
        fontSize: "16px",
        borderRadius: "50px",
        backgroundColor: "#ff9800",
        color: "#fff",
        border: "none",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 1000,
        maxWidth: "250px",
        whiteSpace: "nowrap"
      }}
    >
      🛒 장바구니 보기
    </button>
  );
};

export default CartButton;