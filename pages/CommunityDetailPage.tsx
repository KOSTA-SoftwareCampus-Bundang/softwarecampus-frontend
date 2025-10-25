import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useAuthStore } from '../store/authStore';
import {
  fetchBoardPost,
  fetchComments,
  recommendBoardPost,
  createComment,
  updateComment,
  deleteComment,
} from '../services/communityService';
import { Eye, MessageSquare, ThumbsUp, Paperclip, Send, Pencil, Trash } from '../components/icons/Icons';
import type { Comment } from '../types';
import '../styles/tiptap.css';

/**
 * 게시글 상세 페이지
 */
const CommunityDetailPage = () => {
  const { postId } = useParams<{ postId?: string }>();
  
  // postId 유효성 검사 - 모든 훅보다 먼저 실행
  if (!postId || isNaN(Number(postId))) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">유효하지 않은 게시글 ID입니다.</p>
          <Link
            to="/community"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const postIdNumber = parseInt(postId, 10);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // 게시글 조회
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['boardPost', postIdNumber, user?.id],
    queryFn: () => fetchBoardPost(postIdNumber, user?.id),
    enabled: true,
  });

  // 댓글 조회
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', postIdNumber],
    queryFn: () => fetchComments(postIdNumber),
    enabled: true,
  });

  // 추천 mutation
  const recommendMutation = useMutation({
    mutationFn: () => {
      // 인증 검증
      if (!user?.id) {
        throw new Error('로그인이 필요한 서비스입니다.');
      }
      return recommendBoardPost(postIdNumber, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardPost', postIdNumber, user?.id] });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  // 댓글 작성 mutation
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(postIdNumber, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postIdNumber] });
      queryClient.invalidateQueries({ queryKey: ['boardPost', postIdNumber, user?.id] });
      setCommentContent('');
    },
    onError: (error: any) => {
      console.error('댓글 작성 실패:', error);
      
      const errorMessage = error?.response?.data?.error 
        || error?.response?.data?.message 
        || error?.message
        || '댓글 작성에 실패했습니다.';
      
      alert(errorMessage);
    },
  });

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postIdNumber] });
      setEditingCommentId(null);
      setEditingContent('');
    },
  });

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postIdNumber] });
      queryClient.invalidateQueries({ queryKey: ['boardPost', postIdNumber] });
    },
  });

  // 댓글 작성 핸들러
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      // DB 제한 검증 (VARCHAR(500))
      if (commentContent.length > 500) {
        alert('댓글은 500자를 초과할 수 없습니다.');
        return;
      }
      createCommentMutation.mutate(commentContent);
    }
  };

  // 댓글 수정 시작
  const handleEditStart = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // 댓글 수정 제출
  const handleEditSubmit = (commentId: number) => {
    if (editingContent.trim()) {
      updateCommentMutation.mutate({ commentId, content: editingContent });
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">게시글을 찾을 수 없습니다.</p>
          <Link
            to="/community"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // XSS 공격 방지를 위한 HTML 정화
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(post.content, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 's', 'u', 'mark', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
        'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'span', 'div'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel', 'src', 'alt', 'title',
        'class', 'style'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
  }, [post.content]);

  // 현재 사용자가 게시글 작성자인지 확인
  const isAuthor = useMemo(() => {
    if (!user || !post) return false;
    return user.id === String(post.author.id);
  }, [user, post]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 게시글 헤더 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                post.category === '공지사항'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : post.category === '진로이야기'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {post.title}
            {post.hasAttachment && <Paperclip className="w-5 h-5 text-gray-400" />}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {post.author.name.charAt(0)}
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {post.commentCount}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {post.recommendCount}
            </span>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div
            className="tiptap-editor"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>

        {/* 추천 버튼 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (!user) {
                  alert('로그인이 필요한 서비스입니다.');
                  return;
                }
                if (!post.isRecommended) {
                  recommendMutation.mutate();
                }
              }}
              disabled={post.isRecommended || recommendMutation.isPending || !user}
              className={`flex flex-col items-center gap-2 px-8 py-4 rounded-lg transition-colors ${
                post.isRecommended
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 cursor-not-allowed'
                  : !user
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <ThumbsUp className="w-8 h-8" />
              <span className="font-medium">
                {post.isRecommended ? '추천했습니다' : !user ? '로그인 필요' : '추천하기'}
              </span>
              <span className="text-sm">{post.recommendCount}</span>
            </button>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            댓글 {comments.length}
          </h2>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="mb-2">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                댓글 <span className="text-xs">({commentContent.length}/500)</span>
              </label>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요"
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={3}
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!commentContent.trim() || createCommentMutation.isPending}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                댓글 작성
              </button>
            </div>
          </form>

          {/* 댓글 목록 */}
          {commentsLoading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!commentsLoading && comments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">첫 댓글을 작성해보세요.</p>
            </div>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium flex-shrink-0">
                    {comment.isDeleted ? '?' : comment.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    {comment.isDeleted ? (
                      // 삭제된 댓글 표시
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-500 dark:text-gray-400 italic">
                          {comment.content}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.author.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>

                        {editingCommentId === comment.id ? (
                          <div>
                            <textarea
                              value={editingContent}
                              onChange={(e) => setEditingContent(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                              rows={3}
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => handleEditSubmit(comment.id)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingContent('');
                                }}
                                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white text-sm rounded transition-colors"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                            {/* 댓글 작성자만 수정/삭제 가능 */}
                            {user && user.id === String(comment.author.id) && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditStart(comment)}
                                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                >
                                  <Pencil className="w-3 h-3" />
                                  수정
                                </button>
                                <button
                                  onClick={() => deleteCommentMutation.mutate(comment.id)}
                                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                                >
                                  <Trash className="w-3 h-3" />
                                  삭제
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between">
          <Link
            to="/community"
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg transition-colors"
          >
            목록으로
          </Link>
          {isAuthor && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/community/edit/${postIdNumber}`)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                수정
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
