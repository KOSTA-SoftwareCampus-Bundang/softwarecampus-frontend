export type CourseCategory = '재직자' | '취업예정자';
export type CourseFormat = '온라인' | '오프라인' | '혼합';
export type CommunityCategory = '공지사항' | '진로이야기' | '코딩이야기';
export type AcademyField = '웹개발' | '모바일' | '데이터·AI' | '클라우드·보안' | 'IoT·임베디드·반도체' | '게임·블록체인' | '기획·마케팅·기타' | '디자인·3D' | '프로젝트·취준·창업' | '전체';

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

// 기관(Academy) 관련 타입 정의
export interface Academy {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  establishedDate: string;
  courseCount: number;
  contentCount: number;
  isRecruiting: boolean; // 모집중 여부
  isUpdated: boolean; // 최근 업데이트 여부
  fields: AcademyField[]; // 교육 분야
  tags: string[];
  rating?: number;
  reviewCount?: number;
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

// 기관 Q&A 관련 타입 정의
export interface AcademyQnA {
  id: number;
  academyId: number;
  question: string;
  answer?: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  answeredAt?: string;
}