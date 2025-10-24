import axios from 'axios';
import { Course, CourseCategory, CourseFormat } from '../types';
import { mockCourses } from '../data/mockData';

const apiClient = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL ?? '',
  timeout: 5_000
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CourseFilter {
  keyword?: string;
  category?: CourseCategory | '전체';
  format?: CourseFormat | '전체';
}

export async function fetchCourses(filter?: CourseFilter): Promise<Course[]> {
  void apiClient; // 실제 API 연동 시 활용 예정
  await delay(400);

  return mockCourses.filter((course) => {
    const keyword = filter?.keyword;
    const matchKeyword = keyword
      ? course.title.toLowerCase().includes(keyword.toLowerCase()) ||
        course.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))
      : true;
    const matchCategory = filter?.category && filter.category !== '전체'
      ? course.category === filter.category
      : true;
    const matchFormat = filter?.format && filter.format !== '전체'
      ? course.format === filter.format
      : true;

    return matchKeyword && matchCategory && matchFormat;
  });
}

export async function fetchCourseById(courseId: number): Promise<Course | undefined> {
  await delay(300);
  return mockCourses.find((course) => course.id === courseId);
}
