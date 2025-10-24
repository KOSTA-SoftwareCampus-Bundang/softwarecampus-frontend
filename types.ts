export type CourseCategory = '재직자' | '취업예정자';
export type CourseFormat = '온라인' | '오프라인' | '혼합';
export type CommunityBoard = '공지사항' | '문의사항' | '진로이야기' | '코딩이야기';

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

export interface CommunityPost {
  id: number;
  title: string;
  author: string;
  recommendations: number;
  board: CommunityBoard;
  createdAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}
