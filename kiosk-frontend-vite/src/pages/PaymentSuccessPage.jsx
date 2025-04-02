import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccessPage({ clearCart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get("pg_token");
  const orderId = searchParams.get("orderId");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [approved, setApproved] = useState(false); // 중복 방지

  useEffect(() => {
    if (!pgToken || !orderId || approved) return;

    const approve = async () => {
      try {
        console.log("pgToken:", pgToken);
        console.log("orderId:", orderId);

        const res = await axios.post("http://localhost:8081/payment/approve", {
          pgToken,
          orderId,
        });

        console.log("✅ 승인 성공 응답:", res.data);
        setApproved(true); // ❗️여기에서 승인 완료 시점에 설정
        alert("🎉 결제 승인 완료!");
        setPaymentStatus("SUCCESS");
        if (clearCart) clearCart();

        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        if (error.response) {
          console.error("❌ 승인 실패 (응답):", error.response.status, error.response.data);
        } else {
          console.error("❌ 승인 실패 (네트워크):", error.message);
        }
        alert("❌ 결제 승인 실패!");
        setPaymentStatus("FAILED");
      }
    };

    approve();
  }, [pgToken, orderId, clearCart, navigate, approved]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {paymentStatus === "SUCCESS" ? (
        <h2>🎉 결제가 성공적으로 승인되었습니다!</h2>
      ) : paymentStatus === "FAILED" ? (
        <h2>❌ 결제 승인에 실패했습니다.</h2>
      ) : (
        <h2>⏳ 결제 승인 중입니다...</h2>
      )}
    </div>
  );
}

export default PaymentSuccessPage;
