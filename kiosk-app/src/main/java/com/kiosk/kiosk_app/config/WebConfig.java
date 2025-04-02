package com.kiosk.kiosk_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로
                                .allowedOrigins("http://localhost:5173") // 프론트엔드 주소 허용
                                .allowedMethods("*") // GET, POST 등 모든 메서드 허용
                                .allowedHeaders("*") // 모든 헤더 허용
                                .allowCredentials(true); // 쿠키 포함 허용 시 필요
        }

        // ✅ React 새로고침 시 404 방지 (정규식 없이)
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/{x:[\\w\\-]+}")
                                .setViewName("forward:/index.html");
                registry.addViewController("/**/{x:[\\w\\-]+}")
                                .setViewName("forward:/index.html");
                registry.addViewController("/{x:[\\w\\-]+}/**{x:[\\w\\-]+}")
                                .setViewName("forward:/index.html");
        }
}
