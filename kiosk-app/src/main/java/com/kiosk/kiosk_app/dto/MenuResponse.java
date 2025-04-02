package com.kiosk.kiosk_app.dto;

import com.kiosk.kiosk_app.domain.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MenuResponse {
    private Long id;
    private String name;
    private int price;
    private String description;

    public static MenuResponse from(Menu menu) {
        return new MenuResponse(
                menu.getId(),
                menu.getName(),
                menu.getPrice(),
                menu.getDescription());
    }
}
