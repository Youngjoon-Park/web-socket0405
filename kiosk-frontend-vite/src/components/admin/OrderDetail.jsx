import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const { orderId } = useParams();  // URL에서 주문 ID 가져오기
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/admin/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error("상세 정보 가져오기 실패:", error);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    if (!order) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>주문 상세 정보 (ID: {order.orderId})</h2>
            <p><strong>총 가격:</strong> {order.totalPrice} 원</p>
            <p><strong>상태:</strong> {order.status}</p>
            <h3>주문한 항목</h3>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>
                        메뉴: {item.menuName}, 수량: {item.quantity}, 가격: {item.price} 원
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderDetail;
