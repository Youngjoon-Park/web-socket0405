Kiosk System with WebSocket + KakaoPay (2025)
프로젝트 소개
프론트엔드: React + Vite

백엔드: Spring Boot

실시간 알림: WebSocket (STOMP, SockJS)

결제 시스템: KakaoPay API

구성 관리: Spring Cloud Config

프로젝트 구조

kiosk-system-vite/
├── config-server/                # Spring Cloud Config 서버 (포트 8888)
├── kiosk-app/                    # Spring Boot 백엔드 서버 (포트 8081)
└── kiosk-frontend-vite/          # React + Vite 프론트엔드 (포트 5173)
주요 기술 스택
Frontend: React 19, Vite 6, React Router DOM, Axios

Backend: Spring Boot 3.x, Spring WebSocket, STOMP, KakaoPay API, JPA

DB: MySQL

Infra: Spring Cloud Config

Tools: GitHub, Postman, IntelliJ / VSCode

포트 및 주소 요약
구성 요소	설명	주소
프론트엔드	사용자/관리자 화면	http://localhost:5173
백엔드 API	주문/결제/알림 처리 서버	http://localhost:8081
WebSocket	STOMP, SockJS 웹소켓 연결	http://localhost:8081/ws-endpoint
Config 서버	Spring Cloud Config 설정 서버	http://localhost:8888
실행 방법
Config 서버 실행 (설정 서버)


cd kiosk-config
./gradlew bootRun
Config 서버는 **http://localhost:8888**에서 실행됩니다.

백엔드 앱 실행 (Spring Boot)


cd kiosk-app
./gradlew bootRun
백엔드 앱은 **http://localhost:8081**에서 실행됩니다.

프론트엔드 실행 (Vite + React)

React 프로젝트 폴더로 이동 후 의존성 설치 및 실행:

cd kiosk-frontend-vite
npm install
npm run dev
프론트엔드 앱은 **http://localhost:5173**에서 실행됩니다.

카카오페이 연동 흐름
결제 준비 요청: POST /payment/{orderId} → 카카오로 redirect URL 반환

사용자 QR 결제 → 결제 완료 시 pg_token 전달

결제 승인 요청: POST /payment/approve → DB 저장 + WebSocket 전송

실시간 주문 알림 (주방)
주방 알림 보기: 브라우저에서 아래 주소로 접속: 👉 http://localhost:5173/kitchen

새 주문 발생 시, 다음처럼 표시됩니다:

주문번호: 231 / 메뉴: 아메리카노, 카푸치노

WebSocket 연결 주소
WebSocket 엔드포인트: http://localhost:8081/ws-endpoint

주방이 구독하는 주제(topic): /topic/new-orders

배포 방법
빌드 준비:

백엔드: Spring Boot 프로젝트를 빌드하여 JAR 파일로 패키징합니다.
cd kiosk-app
./gradlew clean build
프론트엔드: React 빌드를 생성하여 /kiosk-app/src/main/resources/static/ 폴더에 배치합니다.

cd kiosk-frontend-vite
npm run build
xcopy /E /I /Y dist C:\kiosk-websocket-0405\kiosk-app\src\main\resources\static
프로젝트 배포:

백엔드 서버 배포: JAR 파일을 실제 서버에 배포하고 실행합니다.

java -jar kiosk-app/build/libs/kiosk-app-0.0.1-SNAPSHOT.jar
프론트엔드 서버 배포: Vite + React 빌드 파일을 웹 서버에 배포하여 사용자가 접근할 수 있도록 합니다.

Config 서버 배포: Config 서버는 별도로 실행하여 Spring Cloud Config에서 설정을 가져옵니다.

웹사이트 접속:

프론트엔드 웹사이트는 **http://localhost:5173**에서 확인할 수 있습니다.

백엔드 API는 **http://localhost:8081**에서 확인할 수 있습니다.

.gitignore 설정 예시

node_modules/
.env
.env.*
*.jar
/build/
📌 기타 참고

.jar 파일은 50MB 이상으로 GitHub에서 경고 발생 가능 → Git LFS 권장

WebSocket은 기본적으로 STOMP + SockJS 방식 사용

결제 모듈은 테스트용 CID: TC0ONETIME 사용
