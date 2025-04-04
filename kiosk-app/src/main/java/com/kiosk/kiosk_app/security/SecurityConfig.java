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
                                                // ✅ 관리자 API 중 허용할 경로 명시
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

                                                // ✅ 메뉴 정보 조회 추가: 인증 없이 접근 가능하도록 설정
                                                .requestMatchers("/api/admin/menus/**").permitAll()

                                                // ✅ 그 외 관리자 API는 인증 필요
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                                                // ✅ 나머지 요청은 모두 허용
                                                .anyRequest().permitAll())
                                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                                                UsernamePasswordAuthenticationFilter.class)
                                .build();
        }
}
