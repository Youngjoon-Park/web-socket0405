import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PaymentPage() {
  const { orderId } = useParams();

  useEffect(() => {
    console.log("결제 준비 중... OrderId:", orderId);

    axios
      .post(`http://localhost:8081/payment/${orderId}`)
      .then(response => {
        const redirectUrl = response.data.redirectUrl;
        console.log("✅ 결제 준비 완료: ", redirectUrl);

        // ✅ 현재 창에서 결제창 열기 (리디렉션 가능)
        window.location.href = redirectUrl;
      })
      .catch(error => {
        console.error("❌ 결제 준비 실패:", error);
        alert("결제 준비에 실패했습니다.");
      });
  }, [orderId]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🔄 결제 페이지를 여는 중입니다...</h2>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
}

export default PaymentPage;

