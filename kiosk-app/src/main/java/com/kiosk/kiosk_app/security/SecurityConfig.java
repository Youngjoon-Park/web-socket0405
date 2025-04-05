package com.kiosk.kiosk_app.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtTokenProvider jwtTokenProvider;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                System.out.println("✅ SecurityConfig 적용됨");

                return http
                                .httpBasic().disable()
                                .csrf().disable()
                                .cors().and()
                                .authorizeHttpRequests(registry -> registry

                                                // ✅ 정적 리소스 + favicon.ico
                                                .requestMatchers(
                                                                "/", "/index.html",
                                                                "/assets/**",
                                                                "/favicon.ico",
                                                                "/vite.svg",
                                                                "/manifest.json",
                                                                "/logo192.png",
                                                                "/logo512.png",
                                                                "/robots.txt")
                                                .permitAll()

                                                // ✅ 관리자 API 허용 경로
                                                .requestMatchers("/api/admin/orders").permitAll()
                                                .requestMatchers("/api/admin/orders/**").permitAll()
                                                .requestMatchers("/api/admin/payments").permitAll()
                                                .requestMatchers("/api/admin/payments/**").permitAll()

                                                // ✅ 웹소켓 허용
                                                .requestMatchers("/ws-endpoint/**").permitAll()

                                                // ✅ 로그인 및 메뉴 조회 허용
                                                .requestMatchers("/api/menus").permitAll()
                                                .requestMatchers("/api/admin/login").permitAll()
                                                .requestMatchers("/api/admin/validate").permitAll()

                                                // ✅ 메뉴 정보 조회
                                                .requestMatchers("/api/admin/menus/**").permitAll()

                                                // ✅ 나머지 관리자 API는 인증 필요
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                                                // ✅ 그 외 요청은 모두 허용
                                                .anyRequest().permitAll())
                                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                                                UsernamePasswordAuthenticationFilter.class)
                                .build();
        }
}
