import React, { useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import CourseSection from '../components/main/CourseSection';
import { CourseCategory, CourseFormat } from '../types';
import { fetchCourses } from '../services/courseService';

interface CourseFilterForm {
  keyword: string;
  category: CourseCategory | '전체';
  format: CourseFormat | '전체';
}

const categories: Array<CourseCategory | '전체'> = ['전체', '재직자', '취업예정자'];
const formats: Array<CourseFormat | '전체'> = ['전체', '온라인', '오프라인', '혼합'];

const targetMap: Record<string, CourseCategory | '전체'> = {
  employee: '재직자',
  student: '취업예정자'
};

const formatMap: Record<string, CourseFormat | '전체'> = {
  online: '온라인',
  offline: '오프라인',
  hybrid: '혼합'
};

const reverseTargetMap: Record<CourseCategory, string> = {
  재직자: 'employee',
  취업예정자: 'student'
};

const reverseFormatMap: Record<CourseFormat, string> = {
  온라인: 'online',
  오프라인: 'offline',
  혼합: 'hybrid'
};

const CourseListPage: React.FC = () => {
  const { control, register, setValue, getValues } = useForm<CourseFilterForm>({
    defaultValues: {
      keyword: '',
      category: '전체',
      format: '전체'
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();
  const filters = useWatch({ control });
  const syncFromUrlRef = useRef(false);
  const lastSyncedQueryRef = useRef<string | null>(null);

  useEffect(() => {
    syncFromUrlRef.current = true;

    const currentValues = getValues();
    const targetParam = searchParams.get('target');
    const formatParam = searchParams.get('format');
    const keywordParam = searchParams.get('q');

    const mappedCategory = targetParam && targetMap[targetParam] ? targetMap[targetParam] : '전체';
    const mappedFormat = formatParam && formatMap[formatParam] ? formatMap[formatParam] : '전체';
    const mappedKeyword = keywordParam ?? '';

    if (currentValues.category !== mappedCategory) {
      setValue('category', mappedCategory, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    }
    if (currentValues.format !== mappedFormat) {
      setValue('format', mappedFormat, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    }
    if (currentValues.keyword !== mappedKeyword) {
      setValue('keyword', mappedKeyword, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    }

    lastSyncedQueryRef.current = searchParamsString;

    Promise.resolve().then(() => {
      syncFromUrlRef.current = false;
    });
  }, [getValues, searchParams, searchParamsString, setValue]);

  const queryFilters = useMemo(
    () => ({
      keyword: filters?.keyword?.trim() || undefined,
      category: filters?.category ?? '전체',
      format: filters?.format ?? '전체'
    }),
    [filters?.keyword, filters?.category, filters?.format]
  );

  useEffect(() => {
    if (syncFromUrlRef.current) {
      return;
    }

    const next = new URLSearchParams();
    if (queryFilters.keyword) {
      next.set('q', queryFilters.keyword);
    }
    if (queryFilters.category && queryFilters.category !== '전체') {
      next.set('target', reverseTargetMap[queryFilters.category]);
    }
    if (queryFilters.format && queryFilters.format !== '전체') {
      next.set('format', reverseFormatMap[queryFilters.format]);
    }

    const nextString = next.toString();
    if (lastSyncedQueryRef.current === nextString) {
      return;
    }

    if (nextString === '') {
      setSearchParams(new URLSearchParams(), { replace: true });
    } else {
      setSearchParams(next, { replace: true });
    }
    lastSyncedQueryRef.current = nextString;
  }, [queryFilters, setSearchParams]);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', queryFilters],
    queryFn: () => fetchCourses(queryFilters)
  });

  const noResult = !isLoading && courses.length === 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">전체 강의 목록</h1>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              키워드
            </label>
            <input
              id="keyword"
              type="text"
              placeholder="과정명 혹은 태그를 입력하세요"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('keyword')}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              교육 대상
            </label>
            <select
              id="category"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('category')}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              교육 방식
            </label>
            <select
              id="format"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('format')}
            >
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
        </form>
      </section>

      {noResult ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-10 text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">조건에 맞는 과정이 없습니다</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">다른 키워드나 필터를 선택해 다시 검색해 보세요.</p>
        </div>
      ) : (
        <CourseSection title="검색 결과" courses={courses} loading={isLoading} />
      )}
    </div>
  );
};

export default CourseListPage;
