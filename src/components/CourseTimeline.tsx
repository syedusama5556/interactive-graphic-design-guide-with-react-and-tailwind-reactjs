import React from 'react'

interface CourseTimelineProps {
  lessons: { id: string; title: string; completed?: boolean }[] // Add an optional "completed" property
  onLessonSelect: (id: number) => void
  currentLesson: number
  completedLessons: string[]
}

const CourseTimeline: React.FC<CourseTimelineProps> = ({
  lessons,
  onLessonSelect,
  currentLesson,
  completedLessons
}) => {
  return (
    <div className="timeline">
      {lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className={`lesson-item cursor-pointer p-2 ${
            currentLesson === index + 1
              ? 'bg-blue-200' // Highlight current lesson
              : completedLessons.includes(lesson.id)
                ? 'bg-green-200' // Mark completed lessons green
                : ''
          }`}
          onClick={() => onLessonSelect(Number(lesson.id))}
        >
          <span className="lesson-index">{index + 1}. </span>{' '}
          {/* Displaying the index */}
          {lesson.title}
        </div>
      ))}
    </div>
  )
}

export default CourseTimeline
