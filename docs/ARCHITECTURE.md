# 🏗️ 시스템 아키텍처 (System Architecture)

MVP 프로젝트 관리 시스템의 전체적인 아키텍처와 설계를 설명합니다.

## 📊 아키텍처 개요

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Firebase)    │◄──►│   (Firestore)   │
│                 │    │                 │    │                 │
│ • React 19.2.0  │    │ • Authentication │    │ • NoSQL DB     │
│ • TypeScript    │    │ • Firestore     │    │ • Real-time     │
│ • Vite          │    │ • Storage       │    │ • Security      │
│ • Tailwind CSS  │    │ • Hosting       │    │ • Rules         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               │
                    ┌─────────────────┐
                    │   Deployment    │
                    │   (Vercel)      │
                    │                 │
                    │ • Global CDN    │
                    │ • Auto-scaling  │
                    │ • SSL/HTTPS     │
                    └─────────────────┘
```

## 🏛️ 기술 스택 상세

### Frontend Layer
```
React 19.2.0 + TypeScript
├── Vite (빌드 도구)
├── Tailwind CSS (스타일링)
├── shadcn/ui (컴포넌트 라이브러리)
├── Framer Motion (애니메이션)
├── React Router (라우팅)
├── React Hook Form (폼 관리)
├── Fuse.js (검색)
├── html2canvas + jsPDF (내보내기)
└── Lucide React (아이콘)
```

### Backend Layer (Firebase)
```
Firebase Suite
├── Authentication
│   ├── Email/Password
│   ├── Google OAuth
│   └── Session Management
├── Firestore (Database)
│   ├── Real-time listeners
│   ├── Offline support
│   └── Security rules
├── Storage
│   ├── File uploads
│   └── Image optimization
└── Hosting
    ├── CDN delivery
    └── SSL certificates
```

### DevOps & Deployment
```
Vercel Platform
├── Global CDN
├── Auto-scaling
├── Preview deployments
├── Environment variables
├── Analytics
└── Performance monitoring
```

## 🔄 데이터 흐름 (Data Flow)

### 1. 사용자 인증 흐름
```
사용자 로그인 → Firebase Auth → 토큰 발급 → Context 저장 → Protected Routes
```

### 2. 프로젝트 CRUD 흐름
```
사용자 액션 → Hook 호출 → Firebase API → Firestore → 실시간 업데이트 → UI 반영
```

### 3. 파일 업로드 흐름
```
파일 선택 → 유효성 검사 → Firebase Storage → URL 생성 → Firestore 저장 → UI 표시
```

## 📁 폴더 구조 상세

```
src/
├── components/          # UI 컴포넌트 계층
│   ├── ui/             # 디자인 시스템 (shadcn/ui)
│   ├── Charts.tsx      # 데이터 시각화 계층
│   ├── ProjectCard.tsx # 도메인 컴포넌트
│   └── ...
├── contexts/           # 전역 상태 관리
│   ├── AuthContext.tsx # 인증 상태
│   └── ThemeContext.tsx# UI 테마 상태
├── hooks/              # 비즈니스 로직 계층
│   ├── useProjects.ts  # 프로젝트 도메인 로직
│   └── useUpload.ts    # 파일 처리 로직
├── lib/                # 인프라 계층
│   ├── firebase.ts     # 외부 서비스 연결
│   ├── utils.ts        # 공통 유틸리티
│   └── exportUtils.ts  # 특화 기능 유틸리티
├── pages/              # 페이지 계층 (라우팅)
├── types/              # 타입 정의 계층
└── App.tsx            # 애플리케이션 진입점
```

## 🔒 보안 아키텍처

### Firebase Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자별 데이터 격리
    match /mvpProjects/{projectId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.createdBy;
    }
  }
}

// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /thumbnails/{userId}/{fileName} {
      allow read, write: if request.auth != null &&
        request.auth.uid == userId;
    }
  }
}
```

### 클라이언트 사이드 보안
- **인증 상태 검증**: 모든 API 호출 시 토큰 검증
- **입력 검증**: React Hook Form + Zod 스키마 검증
- **XSS 방지**: React의 자동 이스케이핑
- **CSRF 방지**: Firebase 토큰 기반 인증

## 📊 데이터베이스 설계

### Project Collection Schema
```typescript
interface Project {
  // 식별자
  id: string;

  // 메타데이터
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;

  // 기본 정보
  title: string;
  subTitle: string;
  category: string;
  status: string;
  version: string;

  // 상세 정보
  url: string;
  techStack: string[];
  docs: string[];
  note: string;

  // 미디어
  thumbnail?: string;

  // 사용자 기능
  bookmarked?: boolean;
}
```

### 인덱스 전략
- **복합 쿼리 최적화**: category + createdBy + status
- **검색 최적화**: title, techStack 배열 검색
- **시간 기반 쿼리**: createdAt, updatedAt 정렬

## 🚀 성능 최적화

### Frontend 최적화
- **Code Splitting**: 동적 import 활용
- **Bundle 분석**: 번들 크기 모니터링
- **이미지 최적화**: Firebase Storage 최적화
- **캐싱 전략**: React Query + Firebase 캐시

### Database 최적화
- **쿼리 제한**: pagination 구현
- **실시간 구독**: 필요한 데이터만 구독
- **인덱스 활용**: 복합 쿼리 최적화

### CDN 최적화
- **글로벌 배포**: Vercel Edge Network
- **캐시 전략**: 적절한 캐시 헤더 설정
- **압축**: Gzip/Brotli 압축

## 🔄 CI/CD 파이프라인

### GitHub Actions (향후 구현 예정)
```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📈 모니터링 및 분석

### 현재 모니터링
- **Vercel Analytics**: 성능 및 사용량 모니터링
- **Firebase Console**: 데이터베이스 및 인증 모니터링
- **Error Boundaries**: React 에러 경계 처리

### 향후 확장 가능 항목
- **Application Performance Monitoring**: Sentry, LogRocket
- **사용자 분석**: Google Analytics, Mixpanel
- **에러 추적**: Sentry, Rollbar
- **성능 모니터링**: Web Vitals, Lighthouse

## 🔮 확장성 고려사항

### 수평적 확장
- **마이크로서비스**: 기능별 분리 가능성
- **API 설계**: RESTful API로 전환 가능
- **데이터베이스**: MongoDB, PostgreSQL로 마이그레이션 가능

### 수직적 확장
- **실시간 기능**: WebSocket, Socket.io
- **협업 기능**: 실시간 공동 편집
- **알림 시스템**: 푸시 알림, 이메일
- **모바일 앱**: React Native로 확장

이 아키텍처는 **확장성**, **유지보수성**, **성능**을 고려하여 설계되었습니다.