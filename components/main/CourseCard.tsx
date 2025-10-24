import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import { StarIcon, ChatAltIcon } from '../icons/Icons';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <Link to={`/lectures/${course.id}`} className="block h-full">
        <div className="relative">
          <img className="h-40 w-full object-cover" src={course.imageUrl} alt={course.title} />
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {course.category}
          </div>
          <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
            {course.format}
          </div>
        </div>
        <div className="p-4 flex flex-col h-full">
          <p className="text-xs text-gray-500 dark:text-gray-400">{course.institution}</p>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 truncate group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.duration}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
            <div className="flex items-center text-yellow-500">
              <StarIcon className="w-4 h-4 mr-1" />
              <span className="font-bold">{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <ChatAltIcon className="w-4 h-4 mr-1" />
              <span>{course.reviewCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
