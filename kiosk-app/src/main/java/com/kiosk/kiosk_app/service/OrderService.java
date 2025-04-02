package com.kiosk.kiosk_app.service;

import com.kiosk.kiosk_app.domain.Order;
import com.kiosk.kiosk_app.domain.OrderStatus;
import com.kiosk.kiosk_app.dto.OrderDetailResponse;
import com.kiosk.kiosk_app.dto.OrderDto;
import com.kiosk.kiosk_app.dto.OrderItemDetail;
import com.kiosk.kiosk_app.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // 모든 주문 조회
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll(); // 모든 주문 조회
        return orders.stream()
                .map(OrderDto::fromEntity) // OrderDto로 변환
                .collect(Collectors.toList());
    }

    public OrderDetailResponse getOrderDetail(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));

        // OrderItemDetail로 변환하여 리스트로 반환
        List<OrderItemDetail> items = order.getItems().stream()
                .map(item -> new OrderItemDetail(
                        item.getMenu().getName(), // 메뉴 이름
                        item.getQuantity(), // 수량
                        item.getMenu().getPrice() // 가격
                ))
                .collect(Collectors.toList());

        return new OrderDetailResponse(order.getId(), order.getTotalPrice(), order.getStatus(), items);
    }

    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));
        order.setStatus(status);
    }
}
