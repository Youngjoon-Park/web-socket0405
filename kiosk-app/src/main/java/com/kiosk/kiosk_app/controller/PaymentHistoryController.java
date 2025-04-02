package com.kiosk.kiosk_app.controller;

import com.kiosk.kiosk_app.domain.PaymentHistory;
import com.kiosk.kiosk_app.repository.PaymentHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin/payments")
@RequiredArgsConstructor
public class PaymentHistoryController {

    private final PaymentHistoryRepository paymentHistoryRepository;

    @GetMapping
    public List<PaymentHistory> getAllPayments() {
        return paymentHistoryRepository.findAll();
    }
}
