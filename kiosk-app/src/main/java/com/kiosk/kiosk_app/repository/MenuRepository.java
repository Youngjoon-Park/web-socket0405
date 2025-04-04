package com.kiosk.kiosk_app.repository;

import java.util.List;
import com.kiosk.kiosk_app.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByEnabledTrue(); // ✅ enabled가 true인 메뉴만 조회
}
