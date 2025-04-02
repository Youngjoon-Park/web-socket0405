// 📁 src/pages/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { requestPayment } from "../api/paymentApi"; // ✅ 추가

const CartPage = ({ cartItems, updateQuantity, clearCart }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const orderId = 1; // ✅ 테스트용 주문 번호 (나중에 실제 생성)
      const redirectUrl = await requestPayment(orderId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("결제 요청 실패", error);
      alert("결제를 시작할 수 없습니다.");
    }
  };

  return (
    <div>
      <h2>🛒 장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}원 × {item.quantity}
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </li>
            ))}
          </ul>
          <h3>총합: {total.toLocaleString()}원</h3>
          <button onClick={handleCheckout}>결제하기</button>
          <button onClick={clearCart}>장바구니 비우기</button>
        </>
      )}
      <button onClick={() => navigate("/")}>← 메뉴로 돌아가기</button>
    </div>
  );
};

export default CartPage;
