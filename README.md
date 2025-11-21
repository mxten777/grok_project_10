# 🚀 MVP 프로젝트 통합관리 시스템

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)

React + TypeScript + Vite 기반의 **완전한 MVP 프로젝트 관리 웹 애플리케이션**입니다. Firebase 백엔드와 통합되어 실시간 데이터 관리 및 사용자 인증을 제공합니다.

## ✨ 주요 기능

### 🔐 **인증 시스템**
- 이메일/비밀번호 로그인 및 회원가입
- Google OAuth 소셜 로그인
- 자동 리다이렉트 및 세션 관리
- 사용자별 데이터 격리

### 📊 **대시보드 & 분석**
- **실시간 통계**: 프로젝트 수, 완료율, 카테고리 분포
- **시각화 차트**: 파이 차트, 바 차트, 타임라인 차트
- **시간 기반 분석**: 프로젝트 생성/완료 추이, 누적 성장 그래프
- **데이터 내보내기**: 차트 PNG/PDF, 대시보드 JSON 내보내기

### 🎯 **프로젝트 관리**
- **CRUD 기능**: 생성/읽기/수정/삭제/복제
- **다중 뷰**: 카드형 / 테이블형 전환
- **고급 검색**: 퍼지 검색 + 카테고리/기술스택 필터링
- **북마크 기능**: 즐겨찾기 및 필터링
- **파일 업로드**: 썸네일 이미지 지원

### 🎨 **사용자 경험**
- **반응형 디자인**: 모바일/데스크톱 완벽 지원
- **다크모드**: 시스템 테마 자동 감지 + 수동 토글
- **애니메이션**: Framer Motion을 활용한 부드러운 전환
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🛠️ 기술스택

### **Frontend**
- **React 19.2.0** - 최신 React 기능 활용
- **TypeScript 5.6.2** - 타입 안전성 보장
- **Vite 7.2.4** - 빠른 개발 서버 및 빌드
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **shadcn/ui** - 고품질 UI 컴포넌트 라이브러리

### **Backend & Database**
- **Firebase Authentication** - 사용자 인증
- **Firestore** - NoSQL 데이터베이스
- **Firebase Storage** - 파일 저장소

### **추가 라이브러리**
- **Framer Motion** - 애니메이션 및 제스처
- **React Router 7.9.6** - 클라이언트 사이드 라우팅
- **React Hook Form** - 폼 상태 관리
- **Fuse.js** - 퍼지 검색 구현
- **Recharts** - 데이터 시각화
- **html2canvas + jsPDF** - 차트 및 문서 내보내기
- **Lucide React** - 아이콘 라이브러리

## 🚀 설치 및 실행

### 1. 클론 및 의존성 설치
```bash
git clone https://github.com/mxten777/grok_project_10.git
cd grok_project_10
npm install
```

### 2. Firebase 설정
```bash
# Firebase 프로젝트 생성 후 설정 복사
cp .env.example .env
# .env 파일에 Firebase 설정 추가
```

### 3. 개발 서버 실행
```bash
npm run dev
# http://localhost:5173 에서 실행
```

### 4. 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트들
│   ├── Charts.tsx       # 데이터 시각화 차트
│   ├── ProjectCard.tsx  # 프로젝트 카드 컴포넌트
│   ├── ProjectTable.tsx # 프로젝트 테이블 컴포넌트
│   ├── FileUploader.tsx # 파일 업로드 컴포넌트
│   ├── StatsCard.tsx    # 통계 카드 컴포넌트
│   ├── TechTag.tsx      # 기술스택 태그
│   └── ThemeToggle.tsx  # 다크모드 토글
├── contexts/
│   ├── AuthContext.tsx  # 인증 상태 관리
│   └── ThemeContext.tsx # 테마 상태 관리
├── hooks/
│   ├── useProjects.ts   # 프로젝트 데이터 훅
│   └── useUpload.ts     # 파일 업로드 훅
├── lib/
│   ├── firebase.ts      # Firebase 설정
│   ├── utils.ts         # 유틸리티 함수들
│   └── exportUtils.ts   # 데이터 내보내기 유틸리티
├── pages/
│   ├── dashboard/       # 메인 대시보드
│   ├── login/          # 로그인/회원가입
│   ├── new/            # 프로젝트 생성
│   ├── detail/         # 프로젝트 상세보기
│   └── edit/           # 프로젝트 수정
├── types/
│   └── Project.ts      # TypeScript 타입 정의
└── App.tsx             # 메인 앱 컴포넌트
```

## 🔧 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 코드 검사
```

## 🌐 배포

### **권장 플랫폼**
- **Vercel** (가장 간단)
- **Netlify**
- **Firebase Hosting**

### **배포 전 준비사항**
1. Firebase 프로젝트 생성 및 설정
2. 환경변수 설정 (`.env` 파일)
3. Firestore 보안 규칙 설정 (`firestore.rules`)
4. Storage 보안 규칙 설정 (`storage.rules`)

## 📊 데이터베이스 구조

### **Project 타입**
```typescript
interface Project {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  techStack: string[];
  status: string;
  version: string;
  url: string;
  docs: string[];
  note: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  bookmarked?: boolean;
}
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📞 연락처

프로젝트 관련 문의: [mxten777](https://github.com/mxten777)

---

**⭐ Star를 눌러주세요! 프로젝트 발전에 큰 도움이 됩니다.**
