export type CourseCategory = '재직자' | '취업예정자';
export type CourseFormat = '온라인' | '오프라인' | '혼합';
export type CommunityCategory = '공지사항' | '진로이야기' | '코딩이야기';

export interface Course {
  id: number;
  title: string;
  institution: string;
  duration: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  imageUrl: string;
  category: CourseCategory;
  format: CourseFormat;
  description: string;
  highlights: string[];
}

// 게시판 관련 타입 정의
export interface BoardPost {
  id: number;
  title: string;
  content: string;
  category: CommunityCategory;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  viewCount: number;
  recommendCount: number;
  commentCount: number;
  hasAttachment: boolean;
  createdAt: string;
  updatedAt: string;
  isRecommended?: boolean; // 현재 사용자의 추천 여부 (백엔드에서 제공)
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  parentId?: number; // 대댓글을 위한 필드
  isDeleted?: boolean; // soft-delete 플래그
}

export interface CommunityPost {
  id: number;
  title: string;
  author: string;
  recommendations: number;
  board: CommunityCategory;
  createdAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}
