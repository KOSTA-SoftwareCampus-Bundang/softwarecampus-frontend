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

/**
 * 사용자 프로필 정보를 가져옵니다.
 * @param userId 사용자 ID
 * @returns 사용자 프로필 정보
 */
export const getUserProfile = async (userId?: number): Promise<UserProfile> => {
  // TODO: 실제 API 호출로 대체 예정
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // 임시로 role에 따라 다른 프로필 반환
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
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return mockBookmarkedCourses;
};

/**
 * 프로필 정보를 업데이트합니다.
 * @param profileData 업데이트할 프로필 정보
 * @returns 업데이트된 프로필 정보
 */
export const updateUserProfile = async (
  profileData: Partial<UserProfile>
): Promise<UserProfile> => {
  // TODO: 실제 API 호출로 대체 예정
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    ...mockUserProfile,
    ...profileData,
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
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return true;
};
