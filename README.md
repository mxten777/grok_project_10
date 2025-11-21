# MVP 프로젝트 통합관리 시스템

React + TypeScript + Vite 기반의 MVP 프로젝트 관리 웹앱입니다.

## 기능

- **대시보드**: 카드형 또는 테이블형으로 프로젝트 목록 표시
- **필터링**: 카테고리, 기술스택, 검색 기능
- **프로젝트 관리**: 신규 등록, 상세 보기, 수정 기능
- **Firebase 연동**: Firestore 데이터베이스 및 Storage 사용

## 기술스택

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS, shadcn/ui
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Animation**: Framer Motion
- **Routing**: React Router

## 설치 및 실행

1. 의존성 설치:
   ```bash
   npm install
   ```

2. Firebase 설정:
   - Firebase 프로젝트 생성
   - Firestore 및 Storage 활성화
   - `src/lib/firebase.ts`에 Firebase 설정 추가

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 빌드:
   ```bash
   npm run build
   ```

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/          # shadcn/ui 컴포넌트
│   ├── ProjectCard.tsx
│   ├── ProjectTable.tsx
│   ├── FileUploader.tsx
│   └── TechTag.tsx
├── hooks/
│   ├── useProjects.ts
│   └── useUpload.ts
├── lib/
│   ├── firebase.ts
│   └── utils.ts
├── pages/
│   ├── dashboard/
│   ├── new/
│   ├── detail/
│   └── edit/
├── types/
│   └── Project.ts
└── App.tsx
```

## 배포

Vercel에 쉽게 배포할 수 있습니다. Firebase 환경변수를 Vercel 환경변수로 설정하세요.
