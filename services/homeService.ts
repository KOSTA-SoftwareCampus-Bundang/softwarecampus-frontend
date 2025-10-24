import { Banner, CommunityPost, Course } from '../types';
import {
  mockBanners,
  mockBestCourses,
  mockClosingSoonCourses,
  mockCommunityPosts
} from '../data/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchHomeBanners(): Promise<Banner[]> {
  await delay(200);
  return mockBanners;
}

export async function fetchHomeCourseSections(): Promise<{
  employeeBest: Course[];
  jobSeekerBest: Course[];
  closingSoon: Course[];
}> {
  await delay(300);
  return {
    employeeBest: mockBestCourses.filter((course) => course.category === '재직자').slice(0, 4),
    jobSeekerBest: mockBestCourses.filter((course) => course.category === '취업예정자').slice(0, 4),
    closingSoon: mockClosingSoonCourses.slice(0, 4)
  };
}

export async function fetchCommunityHighlights(): Promise<CommunityPost[]> {
  await delay(250);
  return mockCommunityPosts;
}
