package com.kiosk.kiosk_app.service;

import com.kiosk.kiosk_app.domain.Order;
import com.kiosk.kiosk_app.domain.OrderStatus;
import com.kiosk.kiosk_app.dto.OrderDetailResponse;
import com.kiosk.kiosk_app.dto.OrderDto;
import com.kiosk.kiosk_app.dto.OrderItemDetail;
import com.kiosk.kiosk_app.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void notifyKitchen(Order order) {
        System.out.println("📦 WebSocket 알림 전송 시작!");
        System.out.println("📦 주문 ID: " + order.getId());
        System.out.println("📦 항목 수: " + (order.getItems() != null ? order.getItems().size() : "null"));

        OrderDto dto = OrderDto.fromEntity(order); // 👉 DTO 변환
        System.out.println("📦 전송 DTO: " + dto); // 중요!

        messagingTemplate.convertAndSend("/topic/new-orders", dto);
        // messagingTemplate.convertAndSend("/topic/new-orders", order);
    }

    // ✅ 모든 주문 목록 조회
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(OrderDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 단일 주문 상세 조회 (null 안전성 보장)
    public OrderDetailResponse getOrderDetail(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));

        // ✅ 로그 추가: 전체 주문 정보 출력
        System.out.println("📦 주문 정보: " + order);
        System.out.println("📦 주문 항목 수: " + (order.getItems() != null ? order.getItems().size() : "null"));

        List<OrderItemDetail> items = order.getItems() != null
                ? order.getItems().stream()
                        .filter(item -> item.getMenu() != null)
                        .map(item -> new OrderItemDetail(
                                item.getMenu().getName(),
                                item.getQuantity(),
                                item.getMenu().getPrice()))
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return new OrderDetailResponse(
                order.getId(),
                order.getTotalPrice(),
                order.getStatus(),
                items);
    }

    // ✅ 주문 상태 변경
    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));
        order.setStatus(status);
    }

    public Order getOrderEntity(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));
    }

}
