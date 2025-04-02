package com.kiosk.kiosk_app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuRequest {
    private String name;
    private int price;
    private String description;
}
