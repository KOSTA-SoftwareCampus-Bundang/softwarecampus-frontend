import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpenIcon,
  StarIcon,
  UsersIcon,
  Building2,
  ImageIcon,
  CheckCircle,
  XCircle,
  XIcon,
  AlertCircle,
  Search,
  PlusIcon,
  EditIcon,
  Trash2,
  Eye,
  FilterIcon
} from '../components/icons/Icons';
import {
  getCourseApprovalRequests,
  processCourseApproval,
  restoreCourse,
  getReviewApprovalRequests,
  processReviewApproval,
  getAdminUsers,
  updateUserStatus,
  deleteUser,
  getAdminAcademies,
  createAcademy,
  updateAcademy,
  deleteAcademy,
  getAcademyQnA,
  answerAcademyQnA,
  deleteAcademyQnA,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner
} from '../services/adminService';
import type {
  CourseApprovalRequest,
  ReviewApprovalRequest,
  AdminUser,
  AdminAcademy,
  AcademyQnA,
  BannerData
} from '../data/mockAdminData';

type TabType = 'dashboard' | 'courses' | 'reviews' | 'users' | 'academies' | 'banners';

/**
 * 관리자 페이지 메인 컴포넌트
 * 과정, 리뷰, 회원, 훈련기관, 배너를 관리합니다.
 */
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // 과정 승인 요청
  const [courseRequests, setCourseRequests] = useState<CourseApprovalRequest[]>([]);
  const [courseFilter, setCourseFilter] = useState<'전체' | '대기' | '승인' | '거부'>('전체');

  // 리뷰 승인 요청
  const [reviewRequests, setReviewRequests] = useState<ReviewApprovalRequest[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'전체' | '대기' | '승인' | '거부'>('전체');

  // 회원 관리
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'전체' | 'admin' | 'user' | 'academy'>('전체');
  const [userStatusFilter, setUserStatusFilter] = useState<'전체' | '활성' | '정지' | '탈퇴'>('전체');

  // 훈련기관 관리
  const [academies, setAcademies] = useState<AdminAcademy[]>([]);
  const [academySearchTerm, setAcademySearchTerm] = useState('');
  const [academyStatusFilter, setAcademyStatusFilter] = useState<'전체' | '활성' | '정지'>('전체');

  // 훈련기관 Q&A
  const [qnaList, setQnaList] = useState<AcademyQnA[]>([]);
  const [qnaStatusFilter, setQnaStatusFilter] = useState<'전체' | '대기' | '답변완료'>('전체');

  // 배너 관리
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [bannerFilter, setBannerFilter] = useState<'전체' | '활성' | '비활성'>('전체');

  // 과정 상세 모달
  const [selectedCourse, setSelectedCourse] = useState<CourseApprovalRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터 로드
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'courses') {
        const requests = await getCourseApprovalRequests();
        setCourseRequests(requests);
      } else if (activeTab === 'reviews') {
        const requests = await getReviewApprovalRequests();
        setReviewRequests(requests);
      } else if (activeTab === 'users') {
        const userList = await getAdminUsers();
        setUsers(userList);
      } else if (activeTab === 'academies') {
        const academyList = await getAdminAcademies();
        setAcademies(academyList);
        const qna = await getAcademyQnA();
        setQnaList(qna);
      } else if (activeTab === 'banners') {
        const bannerList = await getBanners();
        setBanners(bannerList);
      } else if (activeTab === 'dashboard') {
        // 대시보드 데이터 로드
        const [courses, reviews, userList] = await Promise.all([
          getCourseApprovalRequests(),
          getReviewApprovalRequests(),
          getAdminUsers()
        ]);
        setCourseRequests(courses);
        setReviewRequests(reviews);
        setUsers(userList);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 과정 승인 처리
  const handleCourseApproval = async (requestId: number, action: '승인' | '거부') => {
    try {
      await processCourseApproval(requestId, action);
      await loadData();
    } catch (error) {
      console.error('Failed to process course approval:', error);
    }
  };

  // 리뷰 승인 처리
  const handleReviewApproval = async (requestId: number, action: '승인' | '거부') => {
    try {
      await processReviewApproval(requestId, action);
      await loadData();
    } catch (error) {
      console.error('Failed to process review approval:', error);
    }
  };

  // 과정 복구 처리
  const handleCourseRestore = async (requestId: number) => {
    if (!confirm('이 과정을 복구하시겠습니까?')) return;
    try {
      await restoreCourse(requestId);
      await loadData();
    } catch (error) {
      console.error('Failed to restore course:', error);
    }
  };

  // 회원 상태 변경
  const handleUserStatusChange = async (userId: number, status: '활성' | '정지' | '탈퇴') => {
    try {
      await updateUserStatus(userId, status);
      await loadData();
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  // 회원 삭제
  const handleUserDelete = async (userId: number) => {
    if (!confirm('정말로 이 회원을 삭제하시겠습니까?')) return;
    try {
      await deleteUser(userId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  // 훈련기관 삭제
  const handleAcademyDelete = async (academyId: number) => {
    if (!confirm('정말로 이 훈련기관을 삭제하시겠습니까?')) return;
    try {
      await deleteAcademy(academyId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete academy:', error);
    }
  };

  // 과정 상세 보기
  const handleCourseDetail = (course: CourseApprovalRequest) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // 필터링된 데이터
  const filteredCourseRequests = courseRequests.filter(req =>
    courseFilter === '전체' ? true : req.status === courseFilter
  );

  const filteredReviewRequests = reviewRequests.filter(req =>
    reviewFilter === '전체' ? true : req.status === reviewFilter
  );

  const filteredUsers = users.filter(user => {
    const matchesRole = userRoleFilter === '전체' || user.role === userRoleFilter;
    const matchesStatus = userStatusFilter === '전체' || user.status === userStatusFilter;
    const matchesSearch = !userSearchTerm ||
      user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const filteredAcademies = academies.filter(academy => {
    const matchesStatus = academyStatusFilter === '전체' || academy.status === academyStatusFilter;
    const matchesSearch = !academySearchTerm ||
      academy.name.toLowerCase().includes(academySearchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredQnA = qnaList.filter(qna =>
    qnaStatusFilter === '전체' ? true : qna.status === qnaStatusFilter
  );

  const filteredBanners = banners.filter(banner => {
    if (bannerFilter === '전체') return true;
    return bannerFilter === '활성' ? banner.isActive : !banner.isActive;
  });

  // 대시보드 통계
  const stats = {
    pendingCourses: courseRequests.filter(r => r.status === '대기').length,
    pendingReviews: reviewRequests.filter(r => r.status === '대기').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === '활성').length,
    totalAcademies: academies.length,
    activeBanners: banners.filter(b => b.isActive).length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* 사이드바 */}
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">관리자 페이지</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="px-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              대시보드
            </button>
            
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpenIcon className="w-5 h-5" />
              과정 관리
              {stats.pendingCourses > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingCourses}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <StarIcon className="w-5 h-5" />
              리뷰 관리
              {stats.pendingReviews > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingReviews}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              회원 관리
            </button>
            
            <button
              onClick={() => setActiveTab('academies')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'academies'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Building2 className="w-5 h-5" />
              훈련기관 관리
            </button>
            
            <button
              onClick={() => setActiveTab('banners')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'banners'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              배너 관리
            </button>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500 dark:text-gray-400">로딩 중...</div>
            </div>
          ) : (
            <>
              {/* 대시보드 */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">대시보드</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">승인 대기 과정</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {stats.pendingCourses}
                          </p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                          <BookOpenIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">승인 대기 리뷰</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {stats.pendingReviews}
                          </p>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                          <StarIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">전체 회원</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {stats.totalUsers}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            활성: {stats.activeUsers}
                          </p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                          <UsersIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">훈련기관</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {stats.totalAcademies}
                          </p>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                          <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">활성 배너</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                            {stats.activeBanners}
                          </p>
                        </div>
                        <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                          <ImageIcon className="w-6 h-6 text-pink-600 dark:text-pink-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 최근 승인 대기 항목 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        최근 과정 승인 요청
                      </h3>
                      <div className="space-y-3">
                        {courseRequests.filter(r => r.status === '대기').slice(0, 5).map(request => (
                          <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {request.courseTitle}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {request.academyName} · {request.requestDate}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              request.requestType === '등록'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {request.requestType}
                            </span>
                          </div>
                        ))}
                        {courseRequests.filter(r => r.status === '대기').length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            승인 대기 중인 요청이 없습니다.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        최근 리뷰 승인 요청
                      </h3>
                      <div className="space-y-3">
                        {reviewRequests.filter(r => r.status === '대기').slice(0, 5).map(request => (
                          <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {request.courseTitle}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {request.authorName} · {'⭐'.repeat(request.rating)}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              request.requestType === '등록'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {request.requestType}
                            </span>
                          </div>
                        ))}
                        {reviewRequests.filter(r => r.status === '대기').length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            승인 대기 중인 요청이 없습니다.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 과정 관리 */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">과정 관리</h2>
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value as any)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="전체">전체</option>
                      <option value="대기">대기</option>
                      <option value="승인">승인</option>
                      <option value="거부">거부</option>
                    </select>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">과정명</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">기관</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">요청유형</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">상태</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">액션</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredCourseRequests.map(request => (
                          <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleCourseDetail(request)}
                                className="text-sm text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
                              >
                                {request.courseTitle}
                              </button>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {request.category} · {request.target} · {request.format}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{request.academyName}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${request.requestType === '등록' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {request.requestType}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${request.status === '대기' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : request.status === '승인' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {request.status === '대기' ? (
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => handleCourseApproval(request.id, '승인')} 
                                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
                                  >
                                    승인
                                  </button>
                                  <button 
                                    onClick={() => handleCourseApproval(request.id, '거부')} 
                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
                                  >
                                    거부
                                  </button>
                                </div>
                              ) : request.status === '승인' && request.requestType === '삭제' ? (
                                <button 
                                  onClick={() => handleCourseRestore(request.id)} 
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                                >
                                  복구
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredCourseRequests.length === 0 && (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">표시할 데이터가 없습니다.</div>
                    )}
                  </div>
                </div>
              )}

              {/* 리뷰 관리 */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">리뷰 관리</h2>
                  <div className="grid gap-4">
                    {filteredReviewRequests.map(request => (
                      <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.courseTitle}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{request.authorName} · {'⭐'.repeat(request.rating)}</p>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">{request.content}</p>
                          </div>
                          {request.status === '대기' && (
                            <div className="flex gap-2 ml-6">
                              <button onClick={() => handleReviewApproval(request.id, '승인')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">승인</button>
                              <button onClick={() => handleReviewApproval(request.id, '거부')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">거부</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 회원 관리 */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">회원 관리</h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">회원정보</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">권한</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">상태</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">가입일</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.role === 'admin' ? '관리자' : user.role === 'academy' ? '기관' : '일반'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === '활성' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.registeredDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 훈련기관 관리 */}
              {activeTab === 'academies' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">훈련기관 관리</h2>
                  <div className="grid gap-4">
                    {filteredAcademies.map(academy => (
                      <div key={academy.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{academy.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{academy.email} · {academy.phone}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{academy.address}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${academy.status === '활성' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                            {academy.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 배너 관리 */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">배너 관리</h2>
                  <div className="grid gap-6">
                    {filteredBanners.map(banner => (
                      <div key={banner.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <div className="flex">
                          <div className="w-64 h-32 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                            <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{banner.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">링크: {banner.linkUrl}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>기간: {banner.startDate} ~ {banner.endDate}</span>
                              <span className={`px-2 py-1 rounded-full ${banner.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                {banner.isActive ? '활성' : '비활성'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* 과정 상세 모달 */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* 배경 오버레이 */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
              onClick={handleCloseModal}
            />

            {/* 모달 센터링 */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            {/* 모달 컨텐츠 */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              {/* 헤더 */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    과정 상세 정보
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* 바디 */}
              <div className="px-6 py-4 space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCourse.courseTitle}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedCourse.academyName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">카테고리</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCourse.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">대상</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCourse.target}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">형식</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCourse.format}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">요청 유형</p>
                    <p className="mt-1">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedCourse.requestType === '등록'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {selectedCourse.requestType}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">요청 상태</p>
                    <p className="mt-1">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedCourse.status === '대기'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : selectedCourse.status === '승인'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {selectedCourse.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">요청일</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCourse.requestDate}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">요청자</p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedCourse.requesterName} (ID: {selectedCourse.requesterId})
                    </p>
                  </div>
                </div>
              </div>

              {/* 푸터 */}
              {selectedCourse.status === '대기' ? (
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      handleCourseApproval(selectedCourse.id, '승인');
                      handleCloseModal();
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => {
                      handleCourseApproval(selectedCourse.id, '거부');
                      handleCloseModal();
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    거부
                  </button>
                </div>
              ) : selectedCourse.status === '승인' && selectedCourse.requestType === '삭제' ? (
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      handleCourseRestore(selectedCourse.id);
                      handleCloseModal();
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    복구
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
