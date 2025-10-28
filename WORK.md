# 작업 기록 (Frontend)

## 2025-10-28

### 회원가입 시스템 구축

**구현 내용:**

1. **타입 정의 추가** (`types.ts`)
   - `UserRole`: 'USER' | 'ACADEMY' | 'ADMIN' 타입 정의
   - `SignupFormData`: 회원가입 폼 데이터 인터페이스
     - 공통 필드: userName, password, passwordConfirm, email, phoneNumber, role
     - 일반회원 필드: company, department (선택)
     - 기관회원 필드: academyId (필수)
   - `AcademyCreateFormData`: 기관 등록 폼 데이터 인터페이스
     - name, description, address, phone, email, website, fields

2. **아이콘 추가** (`Icons.tsx`)
   - `Search`: 검색
   - `Building2`: 건물/기관
   - `MapPin`: 위치
   - `Phone`: 전화
   - `Mail`: 이메일
   - `ExternalLink`: 외부 링크
   - `EyeOff`: 비밀번호 숨김
   - `AlertCircle`: 경고
   - `CheckCircle`: 확인

3. **기관 선택 모달 컴포넌트** (`AcademySelectModal.tsx`)
   - 모달 방식으로 기관 선택 UI 제공
   - 기능:
     - 검색: 기관명, 설명, 주소로 검색
     - 카드 형식으로 기관 정보 표시 (로고, 이름, 설명, 주소, 연락처, 평점 등)
     - Body 스크롤 방지 (모달 오픈 시)
     - 배경 클릭으로 닫기
   - "찾으시는 기관이 없나요?" → 기관 등록 페이지로 링크
   - 반응형 디자인, 다크모드 지원

4. **회원가입 페이지** (`SignupPage.tsx`)
   - 탭 구조: 일반회원 / 기관회원
   - 공통 입력 필드:
     - 아이디 (4자 이상)
     - 비밀번호 (8자 이상, 표시/숨김 토글)
     - 비밀번호 확인 (일치 여부 검증)
     - 이메일 (형식 검증)
     - 전화번호 (형식 검증: 010-XXXX-XXXX)
   - 일반회원 추가 필드:
     - 소속 회사 (선택)
     - 부서 (선택)
   - 기관회원 추가 필드:
     - 소속 기관 선택 (필수) - 모달을 통해 선택
   - 실시간 유효성 검증 및 에러 메시지 표시
   - 비밀번호 일치 시 체크마크 표시
   - 반응형 디자인, 다크모드 지원

5. **기관 등록 페이지** (`AcademyCreatePage.tsx`)
   - 입력 필드:
     - 기관명 (필수, 2자 이상)
     - 기관 소개 (필수, 10자 이상, textarea)
     - 주소 (필수)
     - 대표 전화번호 (필수, 형식 검증)
     - 대표 이메일 (필수, 형식 검증)
     - 웹사이트 (선택, URL 형식 검증)
     - 사업자등록번호 (필수, 형식 검증: XXX-XX-XXXXX)
   - ERD의 academy 테이블 구조 기반
   - 관리자 승인 절차 안내 UI
   - 등록 안내사항 표시
   - 뒤로 가기 버튼
   - 유효성 검증 및 에러 메시지
   - 반응형 디자인, 다크모드 지원

6. **라우팅 설정** (`App.tsx`)
   - `/signup`: 회원가입 페이지
   - `/academy/create`: 기관 등록 페이지
   - SignupPage, AcademyCreatePage import 추가

7. **로그인 페이지 개선** (`LoginPage.tsx`)
   - 회원가입 링크 추가: "아직 계정이 없으신가요? 회원가입하기"

**기술 스택:**
- React 18 + TypeScript
- React Router DOM (라우팅)
- Tailwind CSS (스타일링)
- Zustand (상태 관리 - authStore 활용)

**특징:**
- 일반회원/기관회원 구분 가입
- 트렌디한 모달 UI로 기관 선택
- 실시간 폼 유효성 검증
- 직관적인 에러 메시지
- 비밀번호 표시/숨김 토글
- 반응형 디자인
- 다크모드 완벽 지원
- 기관 검색 및 필터링
- 관리자 승인 프로세스 안내

**다음 단계:**
- 백엔드 API 연동 (회원가입, 기관 등록)
- 이메일 인증 기능 추가
- 아이디 중복 확인 API
- 기관 승인 관리자 페이지

---

## 2025-10-25

### 커뮤니티 게시판 시스템 구축

**구현 내용:**

1. **타입 및 인터페이스 정의**
   - `BoardPost`: 게시글 정보 (제목, 내용, 카테고리, 작성자, 조회수, 추천수, 댓글수, 첨부파일 여부 등)
   - `Comment`: 댓글 정보 (내용, 작성자, 대댓글 지원)
   - `CommunityCategory`: '공지사항', '진로이야기', '코딩이야기' 타입 정의

2. **Mock 데이터 생성**
   - `mockBoardPosts`: 7개의 샘플 게시글 (카테고리별 분산)
   - `mockComments`: 댓글 샘플 데이터
   - 실제 콘텐츠를 포함한 리얼리스틱한 Mock 데이터

3. **API 서비스 레이어** (`communityService.ts`)
   - 게시글 CRUD: `fetchBoardPosts`, `fetchBoardPost`, `createBoardPost`, `updateBoardPost`, `deleteBoardPost`
   - 추천 기능: `recommendBoardPost`
   - 댓글 CRUD: `fetchComments`, `createComment`, `updateComment`, `deleteComment`
   - 카테고리별 필터링 및 페이지네이션 지원

4. **Tiptap 에디터 통합**
   - 패키지 설치: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-placeholder`, `@tiptap/extension-link`, `@tiptap/extension-image`
   - 커스텀 툴바: Bold, Italic, Strike, Heading(H1~H3), Lists, Code, CodeBlock, Blockquote, Link, Image, HorizontalRule, Undo/Redo
   - 스타일링: `styles/tiptap.css` 생성 (다크모드 지원)

5. **페이지 구현**
   - `CommunityPage`: 게시글 목록 페이지
     - 카테고리 탭 (전체, 공지사항, 진로이야기, 코딩이야기)
     - 데스크톱/모바일 반응형 레이아웃
     - 페이지네이션
     - 글번호, 제목, 댓글수, 조회수, 추천수, 첨부파일 여부 표시
   - `CommunityDetailPage`: 게시글 상세 페이지
     - 본문 HTML 렌더링
     - 추천 버튼 (중복 방지)
     - 댓글 작성/수정/삭제
     - 하단 게시글 목록으로 이동
   - `CommunityWritePage`: 글쓰기 페이지
     - Tiptap 에디터 사용
     - 카테고리 선택
     - 제목/내용 입력
   - `CommunityEditPage`: 글 수정 페이지
     - 기존 게시글 데이터 로드
     - Tiptap 에디터로 수정

6. **아이콘 추가** (`Icons.tsx`)
   - `Eye`: 조회수
   - `MessageSquare`: 댓글
   - `ThumbsUp`: 추천
   - `Paperclip`: 첨부파일
   - `Send`: 전송
   - `Pencil`: 편집
   - `Trash`: 삭제

7. **라우팅 설정** (`App.tsx`)
   - `/community`: 게시글 목록
   - `/community/:postId`: 게시글 상세
   - `/community/write`: 글쓰기
   - `/community/edit/:postId`: 글 수정

8. **문서 업데이트**
   - `FRONTEND-STACKS.md`: Tiptap 에디터 관련 스택 정보 추가

**기술 스택:**
- Tiptap 2.x (MIT)
- TanStack Query (서버 상태 관리)
- React Router DOM (라우팅)
- Tailwind CSS (스타일링)

**특징:**
- ERD 기반 설계 (board, comment 테이블 구조 반영)
- 카테고리별 필터링 지원
- 반응형 디자인 (데스크톱/모바일)
- 다크모드 지원
- 리치 텍스트 에디터 (Tiptap)
- 낙관적 업데이트 패턴

---

## 2025-10-24
- 상단 헤더 내비게이션 구조를 전면 재구성하고, 데스크톱/모바일 메뉴의 쿼리 파라미터 연동을 개선.
- 템플릿 문자열 오류를 제거하고 클래스 결합 유틸리티를 도입하여 코드 가독성과 안정성을 확보.
- `npm run build`로 전체 빌드를 통과시켜 수정 사항이 정상적으로 컴파일되는지 확인.
