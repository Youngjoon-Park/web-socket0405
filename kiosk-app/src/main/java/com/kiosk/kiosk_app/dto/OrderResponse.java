package com.kiosk.kiosk_app.dto; // 패키지 경로 수정

import com.kiosk.kiosk_app.domain.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private int totalPrice;
    private OrderStatus status;

    private List<ItemDto> items; // 주문 항목 리스트 추가

    // 내부 클래스: 주문 항목에 대한 정보를 담는 DTO
    @Data
    @AllArgsConstructor
    public static class ItemDto {
        private String menuName; // 메뉴 이름
        private int quantity; // 수량
        private int price; // 가격
    }
}
