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

  // Fetch completed lessons and bookmarked lesson from local storage on component mount
  useEffect(() => {
    const storedCompletedLessons = localStorage.getItem('completedLessons')
    const storedBookmarkedLesson = localStorage.getItem('bookmarkedLesson')
    const savedLesson = localStorage.getItem('currentLesson')

    try {
      setCompletedLessons(JSON.parse(storedCompletedLessons || '[]'))
      setBookmarkedLessonId(
        storedBookmarkedLesson ? Number(storedBookmarkedLesson) : null
      )
      if (savedLesson) {
        setCurrentLessonId(Number(savedLesson))
      }
    } catch (error) {
      console.error('Error parsing data from local storage:', error)
    }
  }, [])

  // Update local storage when completedLessons or bookmarkedLessonId changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons))
    if (bookmarkedLessonId !== null) {
      localStorage.setItem('bookmarkedLesson', bookmarkedLessonId.toString())
    } else {
      localStorage.removeItem('bookmarkedLesson')
    }
  }, [completedLessons, bookmarkedLessonId])

  // Update local storage when currentLessonId changes
  useEffect(() => {
    localStorage.setItem('currentLesson', currentLessonId.toString())
  }, [currentLessonId])

  const handleLessonChange = (lessonId: number) => {
    setCurrentLessonId(lessonId)
  }

  const handleBookmark = () => {
    if (bookmarkedLessonId === currentLessonId) {
      // Remove the bookmark if the current lesson is already bookmarked
      setBookmarkedLessonId(null)
      localStorage.removeItem('bookmarkedLesson')
    } else {
      // Bookmark the current lesson
      setBookmarkedLessonId(currentLessonId)
      localStorage.setItem('bookmarkedLesson', currentLessonId.toString())
    }
  }

  // Function to update completedLessons state when a lesson is completed
  const handleLessonCompleted = (completedLessonId: string) => {
    setCompletedLessons([...completedLessons, completedLessonId])
  }

  // Navigate to the bookmarked lesson if the button is clicked
  const continueFromBookmark = () => {
    if (bookmarkedLessonId !== null) {
      setCurrentLessonId(bookmarkedLessonId)
    }
  }

  const currentLesson = lessonsData.lessons.find(
    (lesson) => lesson.id === currentLessonId.toString()
  )!

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center">
        <h1 className="mb-3 text-3xl font-bold">Graphic Design Course</h1>
      </div>

      <AnimatedScrollIndicator />

      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="mb-4 flex flex-col lg:mb-0 lg:mr-4 lg:w-1/5">
          <div className="mb-4 flex items-center">
            <Bookmark
              isBookmarked={bookmarkedLessonId === currentLessonId}
              onToggleBookmark={handleBookmark}
            />
            {bookmarkedLessonId !== null && (
              <button
                className="ml-4 rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-green-600"
                onClick={continueFromBookmark}
              >
                Continue from Bookmark
              </button>
            )}
          </div>
          <div className="h-full rounded-lg bg-white shadow-md">
            <CourseTimeline
              lessons={lessonsData.lessons}
              onLessonSelect={handleLessonChange}
              completedLessons={completedLessons}
              currentLesson={currentLessonId}
            />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <Lesson
              lesson={currentLesson}
              completedLessons={completedLessons}
              onLessonCompleted={handleLessonCompleted} // Pass the handler prop
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
