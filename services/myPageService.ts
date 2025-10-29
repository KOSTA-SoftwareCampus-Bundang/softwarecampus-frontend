import type {
  UserProfile,
  MyPost,
  MyComment,
  BookmarkedCourse,
} from '../types';

import {
  mockUserProfile,
  mockAcademyUserProfile,
  mockMyPosts,
  mockMyComments,
  mockBookmarkedCourses,
} from '../data/mockMyPageData';

// ============================================================================
// API 엔드포인트 정의 (백엔드 연동 시 사용)
// 엔드포인트 명칭은 변동의 여지 있음 (백엔드 확정 시 백엔드 구현에 맞춰 수정 예정)
// ============================================================================
// GET    /api/users/{userId}/profile          - 사용자 프로필 조회
// PUT    /api/users/{userId}/profile          - 사용자 프로필 수정
// POST   /api/users/{userId}/profile/image    - 프로필 이미지 업로드
// GET    /api/users/{userId}/posts            - 작성한 게시글 목록
// GET    /api/users/{userId}/comments         - 작성한 댓글 목록
// GET    /api/users/{userId}/bookmarks        - 찜한 과정 목록
// POST   /api/courses/{courseId}/bookmark     - 과정 찜하기
// DELETE /api/courses/{courseId}/bookmark     - 과정 찜 취소
// ============================================================================

/**
 * 사용자 프로필 정보를 가져옵니다.
 * @param userId 사용자 ID
 * @returns 사용자 프로필 정보
 */
export const getUserProfile = async (userId?: number): Promise<UserProfile> => {
  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/profile`);
  // if (!response.ok) throw new Error('Failed to fetch user profile');
  // return await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // 임시로 userId에 따라 다른 프로필 반환
  return userId === 2 ? mockAcademyUserProfile : mockUserProfile;
};

/**
 * 사용자가 작성한 게시글 목록을 가져옵니다.
 * @param page 페이지 번호
 * @param limit 페이지당 항목 수
 * @returns 작성한 게시글 목록
 */
export const getMyPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ posts: MyPost[]; total: number }> => {
  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/posts?page=${page}&limit=${limit}`);
  // if (!response.ok) throw new Error('Failed to fetch posts');
  // return await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const posts = mockMyPosts.slice(start, end);
  
  return {
    posts,
    total: mockMyPosts.length,
  };
};

/**
 * 사용자가 작성한 댓글 목록을 가져옵니다.
 * @param page 페이지 번호
 * @param limit 페이지당 항목 수
 * @returns 작성한 댓글 목록
 */
export const getMyComments = async (
  page: number = 1,
  limit: number = 10
): Promise<{ comments: MyComment[]; total: number }> => {
  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/comments?page=${page}&limit=${limit}`);
  // if (!response.ok) throw new Error('Failed to fetch comments');
  // return await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const comments = mockMyComments.slice(start, end);
  
  return {
    comments,
    total: mockMyComments.length,
  };
};

/**
 * 사용자가 찜한 과정 목록을 가져옵니다.
 * @returns 찜한 과정 목록
 */
export const getBookmarkedCourses = async (): Promise<BookmarkedCourse[]> => {
  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/bookmarks`);
  // if (!response.ok) throw new Error('Failed to fetch bookmarked courses');
  // return await response.json();
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return mockBookmarkedCourses;
};

/**
 * 프로필 정보를 업데이트합니다.
 * @param userId 사용자 ID
 * @param profileData 업데이트할 프로필 정보
 * @returns 업데이트된 프로필 정보
 */
export const updateUserProfile = async (
  userId: number | undefined,
  profileData: Partial<UserProfile>
): Promise<UserProfile> => {
  // userId 검증
  if (userId === undefined) {
    throw new Error('User ID is required to update profile');
  }

  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/profile`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(profileData),
  // });
  // if (!response.ok) throw new Error('Failed to update profile');
  // return await response.json();
  
  // 목업: 인위적인 딜레이 후 업데이트된 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // 목업: 기존 프로필 데이터를 기반으로 업데이트 (실제 API 동작 모방)
  // userId에 따라 적절한 기본 프로필 선택
  const baseProfile = userId === 2 ? mockAcademyUserProfile : mockUserProfile;
  
  return {
    ...baseProfile,
    ...profileData,
    id: userId, // userId는 변경되지 않도록 보장
  };
};

/**
 * 과정 찜하기/취소를 처리합니다.
 * @param courseId 과정 ID
 * @param isBookmarked 찜 상태
 * @returns 성공 여부
 */
export const toggleCourseBookmark = async (
  courseId: number,
  isBookmarked: boolean
): Promise<boolean> => {
  // TODO: 실제 API 호출로 대체 예정
  // if (isBookmarked) {
  //   const response = await fetch(`/api/courses/${courseId}/bookmark`, {
  //     method: 'POST',
  //   });
  //   if (!response.ok) throw new Error('Failed to bookmark course');
  // } else {
  //   const response = await fetch(`/api/courses/${courseId}/bookmark`, {
  //     method: 'DELETE',
  //   });
  //   if (!response.ok) throw new Error('Failed to unbookmark course');
  // }
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return true;
};

/**
 * 프로필 이미지를 업로드합니다.
 * @param userId 사용자 ID
 * @param formData 이미지 파일이 포함된 FormData
 * @returns 업로드된 이미지 URL
 */
export const uploadProfileImage = async (
  userId: number,
  formData: FormData
): Promise<string> => {
  // TODO: 실제 API 호출로 대체 예정
  // const response = await fetch(`/api/users/${userId}/profile/image`, {
  //   method: 'POST',
  //   body: formData,
  // });
  // if (!response.ok) throw new Error('Failed to upload profile image');
  // const data = await response.json();
  // return data.imageUrl;
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // 목업: 임시 URL 반환
  return 'https://via.placeholder.com/150';
};
