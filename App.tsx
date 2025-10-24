import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import PlaceholderPage from './pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';
import { useThemeStore } from './store/themeStore';

const NotFound: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">페이지를 찾을 수 없습니다</h1>
    <p className="text-gray-600 dark:text-gray-400">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
    <Link
      to="/"
      className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-white text-sm font-semibold hover:bg-opacity-90 transition"
    >
      메인으로 가기
    </Link>
  </div>
);

const App: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lectures" element={<CourseListPage />} />
        <Route path="/lectures/:courseId" element={<CourseDetailPage />} />
        <Route
          path="/community"
          element={
            <PlaceholderPage
              title="커뮤니티 준비 중"
              description="커뮤니티 기능은 현재 개편 중입니다. 곧 다양한 후기와 노하우를 공유하실 수 있도록 준비하겠습니다."
            />
          }
        />
        <Route
          path="/community/:postId"
          element={
            <PlaceholderPage
              title="게시글 준비 중"
              description="커뮤니티 게시글 상세 페이지는 곧 업데이트될 예정입니다."
              ctaLabel="커뮤니티로 돌아가기"
              ctaHref="/community"
            />
          }
        />
        <Route
          path="/partners"
          element={
            <PlaceholderPage
              title="협력기관 소개 준비 중"
              description="새로운 협력 프로그램과 교육 파트너 정보를 정리하고 있습니다."
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <PlaceholderPage
              title="마이페이지 준비 중"
              description="수강 이력과 즐겨찾기, 결제 내역을 확인할 수 있는 마이페이지를 개발 중입니다."
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PlaceholderPage
              title="관리자 페이지 준비 중"
              description="관리자 전용 기능은 현재 개발 중입니다."
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <PlaceholderPage
              title="개인정보 처리방침"
              description="개인정보 처리방침 문서는 작성 중입니다. 문의가 필요하신 경우 contact@swcampus.kr 로 연락 주세요."
            />
          }
        />
        <Route
          path="/terms"
          element={
            <PlaceholderPage
              title="이용약관"
              description="이용약관은 현재 검토 중입니다. 곧 투명하고 명확한 약관을 안내드리겠습니다."
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
