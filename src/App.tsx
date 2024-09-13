import React, { useState, useEffect } from 'react'
import CourseTimeline from './components/CourseTimeline'
import Lesson from './components/Lesson'
import Bookmark from './components/Bookmark'
import AnimatedScrollIndicator from './components/AnimatedScrollIndicator'
import lessonsData from './data/lessons.json'

const App: React.FC = () => {
  const [currentLessonId, setCurrentLessonId] = useState<number>(1)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [bookmarkedLessonId, setBookmarkedLessonId] = useState<number | null>(
    null
  )

  // Fetch completed lessons from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('completedLessons')
    try {
      setCompletedLessons(JSON.parse(storedData || '[]'))
    } catch (error) {
      console.error('Error parsing completedLessons from local storage:', error)
    }
  }, [])

  // Update local storage when completedLessons changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons))
  }, [completedLessons])

  // Fetch saved lesson from local storage on component mount
  useEffect(() => {
    const savedLesson = localStorage.getItem('currentLesson')
    if (savedLesson) {
      setCurrentLessonId(Number(savedLesson))
    }
  }, [])

  const handleLessonChange = (lessonId: number) => {
    setCurrentLessonId(lessonId)
    localStorage.setItem('currentLesson', lessonId.toString())
  }

  const handleBookmark = () => {
    setBookmarkedLessonId(currentLessonId)
    localStorage.setItem('bookmarkedLesson', currentLessonId.toString())
  }

  // Function to update completedLessons state when a lesson is completed
  const handleLessonCompleted = (completedLessonId: string) => {
    setCompletedLessons([...completedLessons, completedLessonId])
  }

  const currentLesson = lessonsData.lessons.find(
    (lesson) => lesson.id === currentLessonId.toString()
  )!

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center">
        <h1 className="mb-3 text-3xl font-bold">Graphic Design Course</h1>
      </div>

      <AnimatedScrollIndicator currentLesson={currentLessonId} />

      <div className="container mx-auto flex">
        <div className="mr-4 h-full w-1/5 rounded-lg bg-white shadow-md">
          <CourseTimeline
            lessons={lessonsData.lessons}
            onLessonSelect={handleLessonChange}
            completedLessons={completedLessons}
            currentLesson={currentLessonId}
          />
        </div>
        <div className="w-4/5 p-4">
          <Bookmark
            lesson={bookmarkedLessonId}
            onContinue={() => setCurrentLessonId(bookmarkedLessonId!)}
          />
          <div className="rounded-lg bg-white p-4 shadow-md">
            <Lesson
              lesson={currentLesson}
              completedLessons={completedLessons}
              onLessonCompleted={handleLessonCompleted} // Pass the handler prop
            />
          </div>
          <button
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            onClick={handleBookmark}
          >
            Bookmark this Lesson
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
