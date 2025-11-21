# 🤝 기여 가이드 (Contributing Guide)

MVP 프로젝트 관리 시스템에 기여해 주셔서 감사합니다! 이 가이드를 따라 프로젝트에 기여하는 방법을 알아보세요.

## 📋 목차
- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [기여 방법](#기여-방법)
- [코딩 스타일](#코딩-스타일)
- [테스트](#테스트)
- [풀 리퀘스트](#풀-리퀘스트)

## 🚀 개발 환경 설정

### 사전 요구사항
- **Node.js** 18.0 이상
- **npm** 또는 **yarn**
- **Git**

### 1. 레포지토리 클론
```bash
git clone https://github.com/mxten777/grok_project_10.git
cd grok_project_10
```

### 2. 의존성 설치
```bash
npm install
```

### 3. Firebase 설정
```bash
# .env 파일 생성 및 Firebase 설정 추가
cp .env.example .env
# Firebase 콘솔에서 프로젝트 설정 복사하여 .env에 붙여넣기
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## 🏗️ 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── ui/             # shadcn/ui 기본 컴포넌트
│   ├── Charts.tsx      # 데이터 시각화 차트
│   ├── ProjectCard.tsx # 프로젝트 카드
│   └── ...
├── contexts/           # React Context (인증, 테마)
├── hooks/              # 커스텀 훅
├── lib/                # 유틸리티 및 설정
├── pages/              # 페이지 컴포넌트
├── types/              # TypeScript 타입 정의
└── App.tsx            # 메인 앱 컴포넌트
```

## 🎯 기여 방법

### 1. 이슈 확인
- [GitHub Issues](https://github.com/mxten777/grok_project_10/issues)에서 진행 중인 작업 확인
- 새로운 기능 제안 시 이슈 먼저 생성

### 2. 브랜치 생성
```bash
# feature 브랜치의 경우
git checkout -b feature/amazing-feature

# bug fix의 경우
git checkout -b fix/bug-description

# documentation의 경우
git checkout -b docs/update-readme
```

### 3. 개발 및 테스트
```bash
# 코드 변경 후 빌드 테스트
npm run build

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit
```

### 4. 커밋
```bash
# 변경사항 스테이징
git add .

# 의미 있는 커밋 메시지 작성
git commit -m "feat: add amazing new feature

- Add new feature description
- Update related components
- Add tests for new feature"
```

## 💻 코딩 스타일

### TypeScript
- **strict 모드** 사용
- **interface** 대신 **type** 사용 (가능한 경우)
- **유니온 타입** 적극 활용
- **제네릭** 적절히 사용

### React
- **함수형 컴포넌트**와 **훅** 사용
- **커스텀 훅**으로 로직 분리
- **Compound Components** 패턴 고려

### 스타일링
- **Tailwind CSS** 클래스 우선 사용
- **shadcn/ui** 컴포넌트 활용
- **CSS 변수**를 통한 테마 지원

### 파일 구조
```
components/
├── ComponentName.tsx       # 메인 컴포넌트
├── ComponentName.test.tsx  # 테스트 파일
└── index.ts               # export 파일
```

## 🧪 테스트

### 현재 테스트 상태
- **단위 테스트**: ❌ 미구현 (향후 추가 예정)
- **통합 테스트**: ❌ 미구현 (향후 추가 예정)
- **E2E 테스트**: ❌ 미구현 (향후 추가 예정)

### 수동 테스트 체크리스트
- [ ] 빌드 성공 (`npm run build`)
- [ ] 린트 통과 (`npm run lint`)
- [ ] 타입 체크 통과 (`npx tsc --noEmit`)
- [ ] 반응형 디자인 확인 (모바일/데스크톱)
- [ ] 다크모드 정상 작동
- [ ] 인증 기능 정상 작동
- [ ] CRUD 기능 정상 작동

## 🔄 풀 리퀘스트

### PR 템플릿
```markdown
## 📝 변경사항
- 변경사항에 대한 간단한 설명

## ✅ 체크리스트
- [ ] 빌드 성공
- [ ] 린트 통과
- [ ] 타입 체크 통과
- [ ] 반응형 디자인 확인
- [ ] 다크모드 테스트
- [ ] 기능 테스트 완료

## 🔗 관련 이슈
- Closes #이슈번호

## 📸 스크린샷 (UI 변경 시)
- 변경 전/후 스크린샷 첨부
```

### 리뷰 프로세스
1. **자동 체크**: CI/CD 파이프라인 실행
2. **코드 리뷰**: 최소 1명의 승인 필요
3. **테스트**: 주요 기능 수동 테스트
4. **병합**: `Squash and merge` 사용

## 📚 추가 리소스

### 관련 문서
- [README.md](README.md) - 프로젝트 소개 및 설치 가이드
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - 현재 개발 상태
- [FIREBASE_SECURITY.md](FIREBASE_SECURITY.md) - Firebase 보안 설정
- [QUICK_START.md](QUICK_START.md) - 빠른 시작 가이드

### 유용한 링크
- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Firebase 문서](https://firebase.google.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)

## 🙋‍♂️ 질문 및 지원

기여 과정에서 문제가 발생하거나 질문이 있으시면:
- [GitHub Issues](https://github.com/mxten777/grok_project_10/issues) 생성
- 이메일: 프로젝트 메인테이너 연락

**여러분의 기여를 환영합니다! 🎉**