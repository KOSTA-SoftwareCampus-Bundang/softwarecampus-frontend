import { Banner, CommunityPost, Course } from '../types';
import {
  mockBestCourses,
  mockClosingSoonCourses,
  mockCommunityPosts
} from '../data/mockData';
import { getActiveBanners } from './bannerService';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchHomeBanners(): Promise<Banner[]> {
  await delay(200);
  
  // 활성 배너 데이터를 가져옴
  const activeBanners = await getActiveBanners();
  
  // BannerData를 Banner 타입으로 변환
  return activeBanners.map(banner => ({
    id: banner.id,
    imageUrl: banner.imageUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    title: banner.title,
    subtitle: banner.description || (banner.startDate && banner.endDate ? `${banner.startDate} ~ ${banner.endDate}` : ''),
    link: banner.linkUrl
  }));
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
