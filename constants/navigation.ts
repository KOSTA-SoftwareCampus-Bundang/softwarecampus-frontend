/**
 * 네비게이션 구조 정의
 */

export interface QueryParams {
  target?: 'employee' | 'student';
  format?: 'online' | 'offline' | 'hybrid';
  q?: string;
}

export interface RawNavNode {
  label: string;
  query?: QueryParams;
  children?: RawNavNode[];
}

export const rawCourseNav: RawNavNode[] = [
  {
    label: '재직자 과정',
    query: { target: 'employee' },
    children: [
      {
        label: '온라인',
        query: { format: 'online' },
        children: [
          { label: '데이터 엔지니어링', query: { q: '데이터 엔지니어링' } },
          { label: '클라우드', query: { q: '클라우드' } },
          { label: '보안', query: { q: '보안' } },
          { label: 'AI 응용', query: { q: 'AI' } }
        ]
      },
      {
        label: '오프라인',
        query: { format: 'offline' },
        children: [
          { label: '프로젝트 실습', query: { q: '프로젝트' } },
          { label: '리더십', query: { q: '리더십' } },
          { label: '비즈니스 전략', query: { q: '전략' } }
        ]
      },
      {
        label: '하이브리드(Blended)',
        query: { format: 'hybrid' },
        children: [
          { label: 'DevOps', query: { q: 'DevOps' } },
          { label: 'QA · 테스트', query: { q: '테스트' } },
          { label: '애자일 코칭', query: { q: '애자일' } }
        ]
      }
    ]
  },
  {
    label: '취업예정자 과정',
    query: { target: 'student' },
    children: [
      {
        label: '온라인',
        query: { format: 'online' },
        children: [
          { label: '코딩 테스트', query: { q: '코딩 테스트' } },
          { label: '프론트엔드', query: { q: '프론트엔드' } },
          { label: '백엔드', query: { q: '백엔드' } }
        ]
      },
      {
        label: '오프라인',
        query: { format: 'offline' },
        children: [
          { label: '취업 캠프', query: { q: '캠프' } },
          { label: '캡스톤 프로젝트', query: { q: '캡스톤' } },
          { label: '포트폴리오 특강', query: { q: '포트폴리오' } }
        ]
      },
      {
        label: '하이브리드(Blended)',
        query: { format: 'hybrid' },
        children: [
          { label: '면접 대비', query: { q: '면접' } },
          { label: '커뮤니케이션', query: { q: '커뮤니케이션' } },
          { label: '실무 프로젝트', query: { q: '실무 프로젝트' } }
        ]
      }
    ]
  }
];
