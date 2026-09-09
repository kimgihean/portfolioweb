import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Vercel Edge Runtime
export const config = {
  runtime: 'edge',
};

const gihyunData = {
  "profile": `고등학교 때 수능을 실패하고, 재수한 뒤 가천대학교에 2017년에 입학하였습니다. 문과 생으로 글로벌 경영학과에 입학하였으나, 군대 전역 이후에 IT 경영학회 대외활동을 하면서 개발에 흥미를 느끼고 소프트웨어학을 복수전공하였습니다.
    이후 카카오엔터프라이즈에 수료생으로 웹 기술과 AI 트렌드, 그리고 실무에서 사용하는 인프라 구조에 대해서 학습하였으며, 게임덱스에 입사하여 현재 3년차로 웹서비스팀에서 백엔드 개발과 AI 서비스 PoC 및 인프라 운영을 담당하고 있습니다.
    주요 기술 스택: Spring Framework, Node.js, React, AWS (EC2, Auto Scaling, CloudFront), CI/CD (Jenkins).
    주요 강점: 클라우드 인프라 아키텍처 최적화, 글로벌 웹 서비스의 렌더링 최적화, 서버 무중단 배포 경험.`,
  "projects": [
    {
      "id": "p1",
      "title": "[AI] 글로벌 운영·현지화 자동화 플랫폼",
      "role": "AI TF 개발 리딩",
      "period": "2025.05 - 2025.11",
      "summary": "다국어 CS 티켓 자동 생성 및 현지화 번안을 지원하는 AI 기반 글로벌 운영 관리 웹서비스",
      "problem": "게임에서 사용되는 인게임 용어와 문체가 적용되어야 하는데, 기존 llm 모델은 이를 잘 표현하지 못하였음. 이를 해결하기 위해 사내 데이터를 llm이 잘 이해할 수 있도록 형태소 분석하여 인게임 용어를 검색하는 시스템을 구축함.",
      "techStack": [
        "Node.js",
        "TypeScript",
        "OpenAI API",
        "Anthropic API",
        "Docker"
      ],
      "solution": {
        "architecture": "인게임 용어와 게임 문체를 학습 시키기 위해, 형태소 분석 AI 기능을 추가하여 게임 용어를 검색하는 시스템을 구축함.",
        "implementation": "검색된 데이터와 인게임 문체에 대해 <b>Few Shot prompting</b>을 적용하여 llm이 인게임 용어와 문체를 잘 표현하도록 구현함."
      },
      "impact": [
        "필리핀 지사 실무 도입으로 CS 운영 효율 50% 상승",
        "2025년 중소벤처기업부 AI 바우처 사업 수주"
      ],
      "image": "/assets/images/rca-system.webp",
      "hashTag": [
        "AI 서비스",
        "실무 도입",
        "자동화"
      ],
      "type": "AI",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p2",
      "title": "쿠키런 브레이버스 TCG",
      "role": "Backend 개발 & 인프라 설계 및 운영",
      "period": "2025.12 - 진행중",
      "summary": "정적 리소스와 Json 으로 관리되던 웹 홈페이지를 API를 통한 동적 컨텐츠로 랜더링하는 형태로 전환 및 운영",
      "problem": "<b>정적 호스팅 기반 운영 한계 및 데이터 관리 파편화</b><br/>게시글 및 CMS 콘텐츠가 S3 내 개별 JSON 및 HTML 파일 기반으로 정적 호스팅되어 있어, 실시간 수정·배포 및 동적 쿼리/검색/필터링이 불가능함.<br/>콘텐츠 수정 시 빌드/배포 파이프라인 의존도가 높아 운영 생산성이 저하되고 이력 관리 및 권한 통제가 어려운 구조적 한계 존재.<br/><br/><b>기존 비즈니스 로직 유지 및 콘텐츠 비정형 구조 보존</b><br/>레거시 비즈니스 로직(렌더링 규칙, 파서 등)과의 하위 호환성을 깨뜨리지 않아야 함.<br/>다양한 포맷의 HTML 및 유연한 JSON 스키마를 정형화된 RDBMS로 마이그레이션할 때 데이터 손실 또는 레이아웃 깨짐 위험이 존재.",
      "techStack": [
        "Node.js",
        "Vue.js Vite",
        "MySQL",
        "AWS AutoScaling",
        "AWS Spot Instance"
      ],
      "solution": {
        "architecture": "<b>RDBMS 스키마 설계 및 하이브리드 데이터 모델링</b><br/>공통 메타데이터(작성자, 상태, 카테고리 등)는 정규화된 테이블로 분리하고, 가변적인 CMS 블록 및 비정형 컴포넌트는 JSON/JSONB 컬럼을 활용하거나 1:N 엔티티 구조로 정규화하여 레이아웃 무결성 유지.",
        "implementation": "<b>무중단 마이그레이션 및 파서 호환 레이어 구현</b><br/>S3 정적 HTML/JSON 데이터를 RDBMS로 적재하는 ETL 스크립트를 구축하고, 기존 비즈니스 로직이 변경 없이 데이터를 소비할 수 있도록 Data Mapper/DTO 계층 설계.<br/><br/><b>운영 CMS 백오피스 연동 및 동적 서빙 전환</b><br/>RDBMS 기반 CRUD API를 구축하여 비개발 직군도 즉시 콘텐츠를 생성·수정·배포할 수 있는 운영 워크플로우 마련."
      },
      "impact": [
        "<b>운영 생산성 개선:</b> 정적 파일 수동 배포 프로세스를 실시간 DB 기반 서빙 체제로 전환하여 콘텐츠 반영 주기 대폭 단축.",
        "<b>데이터 정합성 및 검색성 확보:</b> RDBMS 기반 인덱싱 및 트랜잭션 관리로 데이터 정합성 보장 및 고도화된 검색/필터 기능 기반 마련.",
        "<b>무중단 이관 달성:</b> 기존 렌더링 스키마를 100% 보존하여 클라이언트 측 사이드 이펙트 없는 마이그레이션 완료."
      ],
      "image": "/assets/images/3d-factory.webp",
      "hashTag": [
        "고도화",
        "클라우드",
        "API"
      ],
      "type": "WEB",
      "websiteLink": "https://cookierunbraverse.com/",
      "notionLink": ""
    },
    {
      "id": "p3",
      "title": "[AI] Magic Planner - PoC",
      "role": "AI 개발 리딩 & 프롬프트 엔지니어링",
      "period": "2026.04 - 2026.06",
      "summary": "사용자의 자연어 쿼리를 분석하여 웹서비스 요구사항 정의서와 시스템 아키택처 설계 문서 종합하여 PRD를 추출하는 생성형 AI 기반 크로스 플랫폼 어플리케이션",
      "problem": "",
      "techStack": [
        "Rust",
        "Tauri",
        "React",
        "Node.js",
        "MySQL",
        "Qdrant",
        "Gemini Embedding",
        "JsonSplitter",
        "MarkdownHeaderSplitter"
      ],
      "solution": {
        "architecture": "<b>LangGraph 기반 Multi-Agent(A2A) 아키텍처</b>를 도입하여 복잡한 요구사항 분석을 자동 분배·제어하고, <b>자가 평가(Generator & Evaluation Loop)</b>를 통해 기준 미달 시 자동 재생성하는 자율형 에이전트 파이프라인 구축.",
        "implementation": "<b>Qdrant와 Gemini Embedding</b>을 활용한 고성능 RAG 인프라를 구축하고, Json/Markdown Chunking 전략을 통한 데이터 전처리 최적화 및 유저 수동 보정 로직 구현."
      },
      "keyTasks": [
        "Multi-Agent 아키텍처 설계 및 AI Orchestration(LangGraph) 구현",
        "자가 수정 및 평가 기반 AI Agent Pipeline 개발",
        "RAG(Retrieval-Augmented Generation) 시스템 및 데이터 전처리 파이프라인 구축"
      ],
      "keyTechs": [
        "Gemini AI API 사용",
        "AI Orchestration : LangGraph",
        "A2A 아키택처 적용 : Supervisor Agent 를 통한 Multi Agent 설계 자동화"
      ],
      "impact": [],
      "image": "/assets/images/rag-chatbot.webp",
      "hashTag": [
        "AI 서비스",
        "PoC",
        "RAG"
      ],
      "type": "AI",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p4",
      "title": "조이시티 웹상점",
      "role": "Backend 개발",
      "period": "2024.03 - 2025.03",
      "summary": "조이시티 게임 웹상점 WAS 개발 및 시스템 유지보수",
      "problem": "",
      "techStack": [
        "Java 8",
        "Spring",
        "MyBatis",
        "MySQL 5.7",
        "JQuery",
        "JSP"
      ],
      "keyTasks": [
        "[캐리비안의 해적] 및 [드래곤 엠파이어] 글로벌 웹상점 개발 및 운영",
        "조이시티 게임 및 플랫폼 API / SDK 연동",
        "기간 제한 상품, 무료 상품 개발",
        "Manifest를 통한 PWA 개발"
      ],
      "solution": {
        "architecture": "<b>기간 제한 상품 보상 구조 설계</b><br/>결제 트랜잭션 시점(UST)과 지급 주기 시간(일/주/월)을 비교하여 보상 가능 여부를 정확히 판별하는 구조 설계.",
        "implementation": "<b>무료 상품 어뷰징 방지 로직 개발</b><br/>DB Unique 제약을 기반으로 한 동시성 처리 로직을 적용하여 다중 요청에 의한 어뷰징을 원천 차단.<br/><br/><b>장애 전파 방지 (Circuit Breaker)</b><br/>서킷 브레이커 패턴(Circuit Breaker Pattern)을 도입하여, 연동된 외부 API에서 발생한 장애나 지연이 웹상점 WAS 전체로 전파(Cascading Failure)되지 않도록 시스템 안정성 확보."
      },
      "impact": [
        "<b>개인화 상품 전처리 소요 시간 단축:</b> 최대 약 12초 소요되던 전처리 시간을 <b>3초</b>로 대폭 개선",
        "<b>시스템 안정성 강화:</b> 서킷 브레이커 패턴 적용으로 외부 시스템 장애로부터 자체 서비스 인프라 보호 및 무중단 운영 기여"
      ],
      "image": "/assets/images/payment-msa.webp",
      "hashTag": [
        "웹상점",
        "백엔드",
        "PWA"
      ],
      "type": "WEB",
      "websiteLink": "https://webshop.joycity.com",
      "notionLink": ""
    },
    {
      "id": "p5",
      "title": "프리스타일 풋볼 2 공식 홈페이지",
      "role": "Backend 개발",
      "period": "2025.12 - 진행중",
      "summary": "프리스타일 풋볼 2 글로벌 론칭을 위한 공식 홈페이지 구축 및 운영",
      "problem": "",
      "techStack": [
        "Node.js 18",
        "Express",
        "TSOA",
        "MySQL 8",
        "MyBatis",
        "JQuery",
        "Ajax"
      ],
      "keyTasks": [
        "티저 페이지 및 1차 업데이트 개발",
        "CMS 및 CBT 모집 운영 개발",
        "대용량 메일 발송 시스템 개발",
        "크리에이터 연동 로직 개발"
      ],
      "solution": {
        "architecture": "<b>글로벌 서비스 리소스 렌더링 최적화</b><br/>서버 리전이 유럽에 위치하여 국내 접근 시 발생하는 지연(Latency) 문제를 해결하기 위해, <b>CDN(Content Delivery Network)</b>을 도입하고 엣지 캐싱 아키텍처를 구축.",
        "implementation": "<b>Lazy Loading 로직 적용</b><br/>대용량 미디어 및 이미지에 Lazy Loading을 적용하여 초기 로딩 부하를 최소화하고, 글로벌 유저들의 체감 렌더링 속도를 개선."
      },
      "impact": [
        "<b>리소스 렌더링 시간 대폭 단축:</b> 기존 최대 5초 소요되던 로딩 시간을 <b>0.4초</b>로 줄여 쾌적한 UX 제공 및 이탈률 방지"
      ],
      "image": "/assets/images/user-analytics.webp",
      "hashTag": [
        "글로벌 서비스",
        "최적화",
        "홈페이지"
      ],
      "type": "WEB",
      "websiteLink": "https://example.com/p5",
      "notionLink": ""
    },
    {
      "id": "p6",
      "title": "글로벌 웹 서비스 인프라 및 CI/CD 파이프라인 구축",
      "role": "DevOps / Infra Engineer",
      "period": "2025.12 - 2025.12",
      "summary": "AWS Spot Instance와 CloudFront를 활용한 비용 최적화 및 글로벌 렌더링 최적화, 무중단 배포 환경 구축",
      "problem": "- 트래픽 변화에 유연하게 대응하면서도 인프라 비용 최소화<br/>- 지역에 상관없는 빠른 프론트엔드 렌더링 속도 보장<br/>- 배포 시 다운타임 없는 무중단 릴리스 환경 구축",
      "techStack": [
        "AWS EC2 (Spot)",
        "AWS Auto Scaling",
        "AWS CloudFront",
        "AWS ALB",
        "Jenkins"
      ],
      "keyTasks": [
        "CloudFront 글로벌 엣지 로케이션 연동 및 최적화",
        "CPU 70% 기준 Auto Scaling 및 LB 연동 아키텍처 설계",
        "Jenkins 기반 Canary 무중단 배포 파이프라인 구축"
      ],
      "solution": {
        "architecture": "<b>비용 최적화 및 고가용성 인프라 설계</b><br/>AWS Spot Instance(최소 3대)를 활용해 인프라 비용을 대폭 절감하고, CPU 사용률 70% 기준으로 Auto Scaling과 Load Balancer(LB)를 연동하여 트래픽 스파이크에 유연하게 대응.<br/><br/><b>글로벌 프론트엔드 렌더링 최적화</b><br/>CloudFront 글로벌 엣지 로케이션을 적용하여 사용자의 지리적 위치와 무관하게 빠르고 안정적인 웹 리소스 렌더링 환경을 구축.",
        "implementation": "<b>Canary 무중단 배포 파이프라인</b><br/>사내 Jenkins를 사용하여 배포 자동화 파이프라인을 구축. AWS Certificate 등을 통해 각 스팟 인스턴스에 묶인 LB를 조회하고, 점진적으로 트래픽을 전환하는 카나리(Canary) 방식으로 완벽한 무중단 배포를 달성."
      },
      "impact": [
        "<b>비용 절감 및 안정성 확보:</b> Spot Instance와 Auto Scaling 결합으로 가용성을 유지하며 인프라 운영 비용 절감",
        "<b>글로벌 성능 향상:</b> CloudFront 캐싱을 통해 전 세계 어디서든 균일하고 빠른 프론트엔드 로딩 속도 제공",
        "<b>배포 안정성 100%:</b> Canary 배포 파이프라인 구축으로 배포 다운타임 제거 및 안전한 롤백 체계 마련"
      ],
      "image": "",
      "hashTag": [
        "AWS",
        "CI/CD",
        "최적화"
      ],
      "type": "INFRA",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p7",
      "title": "조이시티 VIP 플랫폼 통계툴",
      "role": "Backend 개발",
      "period": "2024.08 - 2024.09",
      "summary": "사업 요구 사항에 맞춰 유저 등급별 구매량 및 일별 DAU를 집계하는 백오피스 통계툴 개발",
      "problem": "<b>사업 요구 사항</b><br/>- 유저 등급과 상품 구매량을 연결지어 데이터 집계<br/>- 일별로 DAU 데이터를 집계하여 확인 필요",
      "techStack": [
        "Node.js 18",
        "Express",
        "TSOA",
        "TypeScript",
        "MyBatis",
        "MySQL 5.7",
        "JQuery",
        "Ajax"
      ],
      "keyTasks": [
        "신규 통계 테이블 설계",
        "서비스 데이터 Aggregation 후 Batch 처리",
        "스케줄링을 활용한 자동 집계"
      ],
      "solution": {
        "architecture": "<b>통계 데이터 집계 파이프라인</b><br/>분산된 서비스 데이터를 Aggregation 한 후 Batch 처리를 수행하여 신규 설계한 통계 전용 테이블에 효율적으로 적재.",
        "implementation": "<b>스케줄링 기반 자동화</b><br/>Node 스케줄러를 통해 지정된 시간에 일별 DAU 및 누적 구매 데이터를 자동 집계하도록 구현."
      },
      "impact": [
        "<b>데이터 가시성 확보:</b> 사업부에서 요구한 유저 등급별 상품 구매 패턴 및 일별 DAU 지표를 한눈에 파악할 수 있는 통계 기능 제공"
      ],
      "image": "",
      "hashTag": [
        "통계툴", "최초개발",
        "배치 스케줄링",
        "백오피스"
      ],
      "type": "WEB",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p8",
      "title": "조이시티 정책 페이지 개선",
      "role": "Backend 개발",
      "period": "2025.06 - 2025.06",
      "summary": "정적 HTML로 렌더링되던 다수의 정책 페이지를 동적 데이터 구조로 마이그레이션 및 운영툴 구축",
      "problem": "- 약 30개 이상의 HTML 파일을 정적으로 렌더링<br/>- 최신 버전 업데이트 시 30개 파일 모두 수동 수정이 필요하여 휴먼 에러 발생 및 유지보수 비효율 증대",
      "techStack": [
        "Node.js",
        "Cheerio",
        "MySQL",
        "Jodit Editor"
      ],
      "keyTasks": [
        "REST API 및 DB 설계",
        "기존 HTML 데이터 파싱 및 마이그레이션",
        "정책 관리를 위한 운영툴 구축"
      ],
      "solution": {
        "architecture": "<b>동적 데이터 마이그레이션 및 시스템 설계</b><br/>REST API 패턴 및 DB를 신규 설계하고, npm <code>cheerio</code> 모듈을 활용한 크롤링 파이프라인을 통해 정적 데이터를 동적 데이터로 마이그레이션.",
        "implementation": "<b>에디터 스타일 충돌 해결</b><br/>기존 HTML 스타일과 Jodit Editor의 스타일 간 불일치 문제를 해결하기 위해 내부 style 태그를 커스텀하여 일관된 렌더링 환경 제공."
      },
      "impact": [
        "<b>운영 효율성 증대:</b> 운영툴을 통한 신규 게시글 작성 환경을 마련해 불필요한 배포 프로세스 방지",
        "<b>개발 리소스 절감:</b> 수동 업데이트로 인한 피로도와 휴먼 에러를 획기적으로 줄여 유지보수 안정성 확보"
      ],
      "image": "",
      "hashTag": [
        "운영툴",
        "마이그레이션",
        "SSR개선"
      ],
      "type": "WEB",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p9",
      "title": "트래픽 플로우 구조 정의 및 WAS 통합",
      "role": "Infra / DevOps",
      "period": "2024.03 - 2025.06",
      "summary": "트래픽 플로우 재정의를 통한 인프라 비용 절감 및 웹서버 아키텍처 일원화",
      "problem": "<b>[문제 상황]</b><br/>- 분산된 저트래픽 WAS 인스턴스로 인한 불필요한 유지 비용 발생<br/>- 인프라 구조의 일관성 부재로 인한 관리 파편화 및 운영 오버헤드 증가",
      "techStack": [
        "L4 Load Balancer",
        "Nginx",
        "SSL/TLS"
      ],
      "keyTasks": [
        "트래픽 플로우 재정의 및 Nginx Proxy 구조 정립",
        "WAS 통합 및 이중화 아키텍처 설계",
        "SSL 인증 처리 계층 변경"
      ],
      "solution": {
        "architecture": "<b>인프라 레이어 최적화 및 일원화</b><br/>기존 WAS에서 개별적으로 처리하던 SSL 인증 방식을 L4 Load Balancer로 이관하여 네트워크 계층에서 일괄 처리하도록 변경하고, LB 타겟 포트 설정 및 Nginx Proxy 구조를 명확히 정립.",
        "implementation": "<b>서버 통합을 통한 리소스 활용 극대화</b><br/>트래픽이 상대적으로 적은 여러 대의 WAS 인스턴스들을 단일 이중화 서버로 통합 및 이관하여 효율적인 리소스 관리 체계를 구축."
      },
      "impact": [
        "<b>인프라 비용 절감:</b> 불필요한 인스턴스 4대를 정리하여 클라우드 운영 비용을 대폭 절감",
        "<b>운영 효율성 확보:</b> 웹서버 구조 일원화 및 트래픽 플로우 방향성 확립으로 유지보수성과 관리 효율성 극대화"
      ],
      "image": "",
      "hashTag": [
        "비용절감",
        "서버통합",
        "네트워크"
      ],
      "type": "INFRA",
      "websiteLink": "",
      "notionLink": ""
    },
    {
      "id": "p11",
      "title": "[AI] 코드 리뷰 에이전트",
      "role": "웹서비스팀 - BE 파트",
      "period": "2026.05 - 2026.05",
      "summary": "사내 Gitlab과 Sonarqube를 연동하여 MR/PR 발생 시 자동으로 코드 리뷰 Comment를 달아주는 AI 기반 SaaS",
      "problem": "",
      "techStack": [
        "Node.js",
        "TSOA",
        "MySQL",
        "Gemini AI"
      ],
      "keyTasks": [
        "Webhook 기반 실시간 이벤트 파이프라인 구축",
        "정적 분석 및 LLM 결합 아키텍처 설계",
        "코드 리뷰 전용 프롬프트 엔지니어링 및 자동 코멘트 기능 구현"
      ],
      "keyTechs": [
        "Gemini AI API",
        "GitLab API & Webhook",
        "SonarQube API & Webhook"
      ],
      "solution": {
        "architecture": "<b>자동화된 코드 리뷰 시스템 설계</b><br/>사내 개발 생산성 향상을 목적으로 소스코드 정적 분석 결과와 대형 언어 모델(LLM)을 결합한 코드 리뷰 파이프라인 설계 및 운영.",
        "implementation": "<b>보안 및 인프라 연동 환경 구축</b><br/>GitLab 및 SonarQube Admin 권한 기반으로 사내 보안 정책에 부합하는 API 토큰 발행, 권한 제어 및 인프라 연동 환경 유지보수."
      },
      "impact": [
        "<b>개발 생산성 향상:</b> 코드 리뷰 소요 시간 단축 및 정적 분석 기반의 코드 품질 향상 기여"
      ],
      "image": "",
      "hashTag": [
        "AI 리뷰",
        "자동화",
        "LLM"
      ],
      "type": "AI",
      "websiteLink": "",
      "notionLink": ""
    }
  ]
}

export default async function req(req) {
  
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

  const google = createGoogleGenerativeAI({
    apiKey: apiKey,
  });

  const { messages } = await req.json();

  const systemPrompt = `
당신은 백엔드 및 인프라 개발자 '김기현'의 포트폴리오 웹사이트를 안내하는 친절하고 전문적인 AI 어시스턴트입니다.
사용자에게 포트폴리오 내의 프로젝트, 기술 스택, 경험에 대한 정보를 제공하세요.
말투는 정중하고 부드럽게 유지하며, 항상 도움이 되려는 태도를 취하세요.
모르는 내용이 있다면 모른다고 정직하게 답하고, 개발자에게 직접 문의하도록 유도하세요.

다음은 김기현 개발자의 상세 프로필 및 프로젝트 데이터입니다. 사용자의 질문에 답변할 때 이 데이터를 적극적으로 참고하여 정확하고 구체적인 정보를 제공하세요:

<DATA>
${JSON.stringify(gihyunData, null, 2)}
</DATA>
  `;

  // 클라이언트에서 넘어오는 메시지 포맷을 streamText가 이해할 수 있는 기본 형태로 정규화
  const normalizedMessages = messages.map(msg => {
    let content = msg.content;
    if (!content && msg.parts) {
      // 최신 SDK 포맷(parts)을 기존 content 포맷으로 변환
      content = msg.parts.map(p => p.text || '').join('\\n');
    } else if (!content && msg.text) {
      content = msg.text;
    }
    return {
      role: msg.role || 'user',
      content: content || ''
    };
  });

  const result = await streamText({
    model: google('gemini-flash-lite-latest'),
    messages: normalizedMessages,
    system: systemPrompt,
  });

  return result.toUIMessageStreamResponse();
}
