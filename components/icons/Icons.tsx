
import React from 'react';

type IconProps = {
  className?: string;
  ariaLabel?: string;
};

export const MenuIcon: React.FC<IconProps> = ({ className, ariaLabel = '메뉴' }) => (
  <svg 
    className={className} 
    stroke="currentColor" 
    fill="none" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className, ariaLabel = '닫기' }) => (
  <svg 
    className={className} 
    stroke="currentColor" 
    fill="none" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className, ariaLabel = '라이트 모드' }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className, ariaLabel = '다크 모드' }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ className, ariaLabel = '사용자' }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className, ariaLabel = '이전' }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className, ariaLabel = '다음' }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className, ariaLabel = '별점' }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const ChatAltIcon: React.FC<IconProps> = ({ className, ariaLabel = '댓글' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className, ariaLabel = '화살표 오른쪽' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className, ariaLabel = '일정' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const DesktopIcon: React.FC<IconProps> = ({ className, ariaLabel = '컴퓨터' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className, ariaLabel = '사용자들' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({ className, ariaLabel = '조회수' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const MessageSquare: React.FC<IconProps> = ({ className, ariaLabel = '댓글' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
  </svg>
);

export const ThumbsUp: React.FC<IconProps> = ({ className, ariaLabel = '추천' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

export const Paperclip: React.FC<IconProps> = ({ className, ariaLabel = '첨부파일' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

export const Send: React.FC<IconProps> = ({ className, ariaLabel = '전송' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export const Pencil: React.FC<IconProps> = ({ className, ariaLabel = '편집' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

export const Trash: React.FC<IconProps> = ({ className, ariaLabel = '삭제' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className, ariaLabel = '펼치기' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const ChevronUp: React.FC<IconProps> = ({ className, ariaLabel = '접기' }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    role="img"
    aria-label={ariaLabel}
  >
    {ariaLabel && <title>{ariaLabel}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);
