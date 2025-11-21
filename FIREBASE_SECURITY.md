# Firebase 보안 규칙 설정 가이드

## 1. Firestore 보안 규칙

### 현재 설정된 규칙 (`firestore.rules`):

- **읽기 권한**: 모든 사용자 (공개 포트폴리오용)
- **쓰기 권한**: 인증된 사용자만
- **데이터 검증**: 필수 필드 확인
- **소유자 권한**: 생성자만 수정/삭제 가능

### Firebase 콘솔에서 적용하기:

1. [Firebase Console](https://console.firebase.google.com) 접속
2. `grok-project-10` 프로젝트 선택
3. 좌측 메뉴에서 **Firestore Database** 클릭
4. **규칙** 탭 클릭
5. `firestore.rules` 파일 내용을 복사하여 붙여넣기
6. **게시** 버튼 클릭

## 2. Storage 보안 규칙

### 현재 설정된 규칙 (`storage.rules`):

- **이미지 읽기**: 모든 사용자 허용
- **이미지 업로드**: 인증된 사용자만 (5MB 제한)
- **파일 형식**: 이미지만 허용

### Firebase 콘솔에서 적용하기:

1. 좌측 메뉴에서 **Storage** 클릭
2. **규칙** 탭 클릭
3. `storage.rules` 파일 내용을 복사하여 붙여넣기
4. **게시** 버튼 클릭

## 3. 개발 중 임시 규칙 (테스트용)

만약 개발 중에 권한 오류가 발생하면 임시로 아래 규칙을 사용하세요:

### Firestore (개발용):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Storage (개발용):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 4. 인증 설정

Firebase 콘솔에서 Authentication 설정:

1. **Authentication** > **Sign-in method**
2. **이메일/비밀번호** 활성화
3. 필요시 **Google** 로그인도 활성화

## 5. 프로젝트 데이터 구조 검증

각 프로젝트 문서는 다음 필드를 포함해야 합니다:
- `title` (string, 필수)
- `category` (string, 필수)
- `techStack` (array, 필수)
- `status` (string, 필수)
- `createdBy` (string, 사용자 UID)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## 6. 다음 단계

보안 규칙 적용 후:
1. 앱에서 인증 기능 활성화
2. 사용자별 프로젝트 관리 구현
3. 에러 핸들링 개선