import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimelineProps {
  lessons: {
    id: string
    title: string
  }[]
  currentLessonId: string | null
  bookmarkedLessonId: string | null
}

const Timeline: React.FC<TimelineProps> = ({
  lessons,
  currentLessonId,
  bookmarkedLessonId
}) => {
  const getCompletedLessonsFromLocalStorage = () => {
    const storedData = localStorage.getItem('completedLessons')
    try {
      return JSON.parse(storedData || '') || []
    } catch (error) {
      console.error('Error parsing completedLessons from local storage:', error)
      return []
    }
  }

  const [completedLessons, setCompletedLessons] = useState(
    getCompletedLessonsFromLocalStorage() || []
  )

  useEffect(() => {
    // Update local storage when completedLessons changes
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  const handleLessonClick = (lessonId: string) => {
    // Reset test only if lesson is not completed yet
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev: string[]) => [...prev, lessonId])
    }
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => (
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`rounded-lg p-3 shadow-md transition-all duration-200 ${
            lesson.id === currentLessonId
              ? 'border-l-4 border-blue-500 bg-blue-100'
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => handleLessonClick(lesson.id)}
        >
          <h3 className="text-lg font-semibold">{lesson.title}</h3>
          {lesson.id === bookmarkedLessonId && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-2 inline-block text-yellow-500"
            >
              ★
            </motion.span>
          )}
          {!completedLessons.includes(lesson.id) && ( // Show test indicator if not completed
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: lesson.id === currentLessonId ? 1 : 0 }}
              className="mt-2 h-1 bg-blue-500"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline
