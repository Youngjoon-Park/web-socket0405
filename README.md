💻 Kiosk System with WebSocket + KakaoPay (2025)
Java 기반의 키오스크 주문 시스템
✔ 프론트엔드: React + Vite
✔ 백엔드: Spring Boot
✔ 실시간 알림: WebSocket (STOMP, SockJS)
✔ 결제 시스템: KakaoPay API
✔ 구성 관리: Spring Cloud Config

📁 프로젝트 구조
perl
복사
편집
kiosk-system-vite/
├── config-server/          # Spring Cloud Config 서버 (포트 8888)
├── kiosk-app/              # Spring Boot 백엔드 서버 (포트 8081)
└── kiosk-frontend-vite/    # React + Vite 프론트엔드 (포트 5173)
⚙ 주요 기술 스택
Frontend: React 19, Vite 6, React Router DOM, Axios

Backend: Spring Boot 3.x, Spring WebSocket, STOMP, KakaoPay API, JPA

DB: MySQL

Infra: Spring Cloud Config

Tools: GitHub, Postman, IntelliJ / VSCode

🌐 포트 및 주소 요약
구성 요소	설명	주소
프론트엔드	사용자/관리자 화면	http://localhost:5173
백엔드 API 서버	주문/결제/알림 처리 서버	http://localhost:8081
WebSocket	STOMP, SockJS 웹소켓 연결	http://localhost:8081/ws-endpoint
Config 서버	Spring Cloud Config 설정 서버	http://localhost:8888

🧾 실행 방법
Config 서버 실행 (설정 서버)
./gradlew bootRun

백엔드 앱 실행 (Spring Boot)
./gradlew bootRun

프론트엔드 실행 (Vite + React)
cd kiosk-frontend-vite
npm install
npm run dev
👉 브라우저 접속: http://localhost:5173

💳 카카오페이 연동 흐름
결제 준비 요청:
POST /payment/{orderId} → 카카오로 redirect URL 반환

사용자 QR 결제 → 결제 완료 시 pg_token 전달

결제 승인 요청:
POST /payment/approve → DB 저장 + WebSocket 전송

📢 실시간 주문 알림 (주방)
주방 알림 보기
브라우저에서 아래 주소로 접속:
👉 http://localhost:5173/kitchen

새 주문 발생 시, 다음처럼 표시됩니다:

주문번호: 231 / 메뉴: 아메리카노, 카푸치노
WebSocket 연결 주소
WebSocket 엔드포인트:
http://localhost:8081/ws-endpoint

주방이 구독하는 주제(topic):
/topic/new-orders

📂 .gitignore 설정 예시

node_modules/
.env
.env.*
*.jar
/build/
📌 기타 참고
.jar 파일은 50MB 이상으로 GitHub에서 경고 발생 가능 → Git LFS 권장

WebSocket은 기본적으로 STOMP + SockJS 방식 사용

결제 모듈은 테스트용 CID: TC0ONETIME 사용

