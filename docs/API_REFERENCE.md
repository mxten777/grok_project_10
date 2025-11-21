# 📚 API 레퍼런스 (API Reference)

프로젝트에서 사용되는 주요 함수, 훅, 컴포넌트들의 API를 설명합니다.

## 🎣 커스텀 훅 (Custom Hooks)

### useProjects

프로젝트 데이터를 관리하는 핵심 훅입니다.

```typescript
const {
  projects,        // Project[] - 현재 사용자의 모든 프로젝트
  loading,         // boolean - 로딩 상태
  error,          // Error | null - 에러 상태
  createProject,  // (data: CreateProjectData) => Promise<void>
  updateProject,  // (id: string, data: UpdateProjectData) => Promise<void>
  deleteProject,  // (id: string) => Promise<void>
  cloneProject,   // (id: string) => Promise<void>
  toggleBookmark  // (id: string) => Promise<void>
} = useProjects();
```

#### 메서드 상세

##### createProject(data: CreateProjectData)
새 프로젝트를 생성합니다.

**파라미터:**
- `data`: 프로젝트 생성 데이터

**반환값:** `Promise<void>`

**예제:**
```typescript
await createProject({
  title: "새 프로젝트",
  category: "웹 앱",
  techStack: ["React", "TypeScript"],
  // ... 기타 필드
});
```

##### updateProject(id: string, data: UpdateProjectData)
기존 프로젝트를 수정합니다.

**파라미터:**
- `id`: 프로젝트 ID
- `data`: 수정할 데이터

##### deleteProject(id: string)
프로젝트를 삭제합니다.

**파라미터:**
- `id`: 삭제할 프로젝트 ID

##### cloneProject(id: string)
프로젝트를 복제합니다.

**파라미터:**
- `id`: 복제할 프로젝트 ID

##### toggleBookmark(id: string)
프로젝트 북마크 상태를 토글합니다.

**파라미터:**
- `id`: 북마크 토글할 프로젝트 ID

### useAuth

인증 상태를 관리하는 훅입니다.

```typescript
const {
  user,      // User | null - 현재 사용자
  loading,   // boolean - 로딩 상태
  signIn,    // (email: string, password: string) => Promise<void>
  signUp,    // (email: string, password: string) => Promise<void>
  signInWithGoogle, // () => Promise<void>
  signOut    // () => Promise<void>
} = useAuth();
```

### useUpload

파일 업로드를 관리하는 훅입니다.

```typescript
const {
  uploadFile,     // (file: File, path: string) => Promise<string>
  uploading,      // boolean - 업로드 진행 상태
  progress,       // number - 업로드 진행률 (0-100)
  error          // Error | null - 업로드 에러
} = useUpload();
```

## 🧩 컴포넌트 API

### ProjectCard

프로젝트 정보를 카드 형태로 표시하는 컴포넌트입니다.

```typescript
interface ProjectCardProps {
  project: Project;                    // 표시할 프로젝트 데이터
  onClick?: (project: Project) => void; // 카드 클릭 핸들러
  onBookmarkToggle?: (id: string) => void; // 북마크 토글 핸들러
  className?: string;                  // 추가 CSS 클래스
}
```

**사용 예제:**
```tsx
<ProjectCard
  project={project}
  onClick={(project) => navigate(`/detail/${project.id}`)}
  onBookmarkToggle={toggleBookmark}
/>
```

### ProjectTable

프로젝트 정보를 테이블 형태로 표시하는 컴포넌트입니다.

```typescript
interface ProjectTableProps {
  projects: Project[];                 // 표시할 프로젝트 목록
  onRowClick?: (project: Project) => void; // 행 클릭 핸들러
  className?: string;                  // 추가 CSS 클래스
}
```

### CategoryPieChart

카테고리별 분포를 파이 차트로 표시합니다.

```typescript
interface CategoryChartProps {
  data: ChartData[];  // 차트 데이터
  title: string;      // 차트 제목
}

interface ChartData {
  name: string;       // 카테고리 이름
  value: number;      // 값
  color: string;      // 색상
}
```

### StatusBarChart

상태별 분포를 바 차트로 표시합니다.

```typescript
interface CategoryChartProps {
  data: ChartData[];  // 차트 데이터
  title: string;      // 차트 제목
}
```

### ProjectTimelineChart

시간 기반 프로젝트 활동을 라인 차트로 표시합니다.

```typescript
interface TimeSeriesData {
  date: string;   // 날짜 (MM/DD 형식)
  created: number; // 생성된 프로젝트 수
  completed: number; // 완료된 프로젝트 수
  total: number;  // 누적 프로젝트 수
}

interface ProjectTimelineChartProps {
  data: TimeSeriesData[]; // 타임라인 데이터
  title: string;          // 차트 제목
}
```

### CumulativeProjectsChart

누적 프로젝트 성장을 영역 차트로 표시합니다.

```typescript
interface CumulativeProjectsChartProps {
  data: TimeSeriesData[]; // 타임라인 데이터
  title: string;          // 차트 제목
}
```

## 🔧 유틸리티 함수

### exportUtils

데이터 내보내기 관련 유틸리티 함수들입니다.

#### exportChartAsImage(elementId: string, filename?: string)
차트를 PNG 이미지로 내보냅니다.

**파라미터:**
- `elementId`: 내보낼 차트 요소의 ID
- `filename`: 파일 이름 (기본값: 'chart')

**반환값:** `Promise<void>`

#### exportChartAsPDF(elementId: string, filename?: string)
차트를 PDF로 내보냅니다.

**파라미터:**
- `elementId`: 내보낼 차트 요소의 ID
- `filename`: 파일 이름 (기본값: 'chart')

#### exportDashboardData(data: Record<string, unknown>, filename?: string)
대시보드 데이터를 JSON으로 내보냅니다.

**파라미터:**
- `data`: 내보낼 데이터 객체
- `filename`: 파일 이름 (기본값: 'dashboard-data')

## 📝 타입 정의 (Type Definitions)

### Project
프로젝트의 기본 타입입니다.

```typescript
interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  title: string;
  subTitle: string;
  url: string;
  techStack: string[];
  docs: string[];
  note: string;
  thumbnail?: string;
  status: string;
  version: string;
  createdBy?: string;
  bookmarked?: boolean;
}
```

### CreateProjectData
프로젝트 생성 시 필요한 데이터 타입입니다.

```typescript
interface CreateProjectData {
  title: string;
  subTitle?: string;
  category: string;
  url?: string;
  techStack: string[];
  docs?: string[];
  note?: string;
  thumbnail?: string;
  status: string;
  version: string;
}
```

### UpdateProjectData
프로젝트 수정 시 필요한 데이터 타입입니다.

```typescript
interface UpdateProjectData {
  title?: string;
  subTitle?: string;
  category?: string;
  url?: string;
  techStack?: string[];
  docs?: string[];
  note?: string;
  thumbnail?: string;
  status?: string;
  version?: string;
  bookmarked?: boolean;
}
```

## 🔗 외부 API

### Firebase SDK

프로젝트에서 사용하는 Firebase 서비스들입니다.

#### Authentication
```typescript
import { auth } from './firebase';

// 이메일/비밀번호 로그인
await signInWithEmailAndPassword(auth, email, password);

// 구글 로그인
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);

// 로그아웃
await signOut(auth);
```

#### Firestore
```typescript
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';

// 프로젝트 추가
await addDoc(collection(db, 'mvpProjects'), projectData);

// 프로젝트 수정
await updateDoc(doc(db, 'mvpProjects', id), updateData);

// 프로젝트 삭제
await deleteDoc(doc(db, 'mvpProjects', id));

// 프로젝트 조회
const q = query(
  collection(db, 'mvpProjects'),
  where('createdBy', '==', userId),
  orderBy('createdAt', 'desc')
);
```

#### Storage
```typescript
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// 파일 업로드
const storageRef = ref(storage, `thumbnails/${userId}/${fileName}`);
await uploadBytes(storageRef, file);

// 다운로드 URL 가져오기
const url = await getDownloadURL(storageRef);
```

이 API 레퍼런스는 프로젝트의 주요 인터페이스와 사용법을 설명합니다. 더 자세한 내용은 소스 코드를 참고하세요.