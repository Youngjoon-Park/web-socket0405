package com.kiosk.kiosk_app.repository;

import com.kiosk.kiosk_app.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    // 원래는 아무 커스텀 메서드도 없음
}
