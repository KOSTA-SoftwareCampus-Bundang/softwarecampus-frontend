import React from 'react';
import { useQuery } from '@tanstack/react-query';
import HeroBanner from '../components/main/HeroBanner';
import CourseSection from '../components/main/CourseSection';
import CommunitySection from '../components/main/CommunitySection';
import { fetchHomeBanners, fetchHomeCourseSections, fetchCommunityHighlights } from '../services/homeService';

const HomePage: React.FC = () => {
  const { data: banners = [], isLoading: bannersLoading } = useQuery({
    queryKey: ['home', 'banners'],
    queryFn: fetchHomeBanners
  });

  const { data: courseSections, isLoading: coursesLoading } = useQuery({
    queryKey: ['home', 'courseSections'],
    queryFn: fetchHomeCourseSections
  });

  const { data: communityPosts = [], isLoading: communityLoading } = useQuery({
    queryKey: ['home', 'community'],
    queryFn: fetchCommunityHighlights
  });

  return (
    <div className="space-y-12 md:space-y-20 pb-12 md:pb-20">
      <HeroBanner banners={banners} loading={bannersLoading} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <CourseSection
          title="재직자 베스트 과정"
          courses={courseSections?.employeeBest ?? []}
          loading={coursesLoading}
          link="/lectures?target=employee"
          targetCount={4}
        />
        <CourseSection
          title="취업예정자 베스트 과정"
          courses={courseSections?.jobSeekerBest ?? []}
          loading={coursesLoading}
          link="/lectures?target=student"
          targetCount={4}
        />
        <CourseSection
          title="마감 임박 과정"
          courses={courseSections?.closingSoon ?? []}
          loading={coursesLoading}
          link="/lectures"
          targetCount={4}
        />
        <CommunitySection posts={communityPosts} loading={communityLoading} />
      </main>
    </div>
  );
};

export default HomePage;
