import React, { useState, useEffect } from 'react'

interface LessonProps {
  lesson: {
    id: string
    title: string
    content: string
    quiz: { question: string; options: string[]; correctAnswer: string }[]
  }
  completedLessons: string[] // Array of completed lesson IDs
  onLessonCompleted: (completedLessonId: string) => void // Function to notify completion
}

const Lesson: React.FC<LessonProps> = ({
  lesson,
  completedLessons,
  onLessonCompleted
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [savedScores, setSavedScores] = useState<Record<string, number>>({}) // Object for storing lesson ID and score pairs

  // Fetch saved scores from local storage on component mount
  useEffect(() => {
    const storedScores = localStorage.getItem('lessonScores')
    try {
      setSavedScores(storedScores ? JSON.parse(storedScores) : {})
    } catch (error) {
      console.error('Error parsing lesson scores from local storage:', error)
    }
  }, [])

  // Update saved scores in local storage on score change
  useEffect(() => {
    localStorage.setItem('lessonScores', JSON.stringify(savedScores))
  }, [savedScores])

  // Check if the current lesson is completed before showing the quiz
  const showQuiz = !completedLessons.includes(lesson.id)

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === lesson.quiz[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    // Update current question only if it's not the last one
    if (currentQuestion < lesson.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }

    setSelectedAnswer(null) // Reset selected answer for next question

    // Check if all questions are answered
    if (currentQuestion === lesson.quiz.length - 1 && selectedAnswer !== null) {
      // Mark lesson as completed and save score
      onLessonCompleted(lesson.id)
      setSavedScores({ ...savedScores, [lesson.id]: score })
    }
  }

  const isLastQuestion = currentQuestion === lesson.quiz.length - 1

  const savedScore = savedScores[lesson.id] || 0 // Get saved score or default to 0

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{lesson.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: lesson.content }}
        className="mb-8 text-lg"
      />

      {showQuiz && (
        <div className="rounded-lg bg-gray-100 p-4 shadow-md">
          {currentQuestion < lesson.quiz.length && (
            <>
              <h4 className="mb-4 text-lg font-bold">
                {lesson.quiz[currentQuestion].question}
              </h4>
              <ul className="list-none space-y-2">
                {lesson.quiz[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleOptionClick(option)}
                        className="size-4 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                disabled={!selectedAnswer}
                onClick={handleSubmitAnswer}
                className={`mt-4 rounded-md px-4 py-2 font-bold text-white ${
                  isLastQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-500 hover:bg-gray-700'
                }`}
              >
                {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
              </button>
            </>
          )}
          {currentQuestion === lesson.quiz.length && (
            <div className="rounded-lg bg-gray-100 p-4 shadow-md">
              <h2 className="text-lg font-bold">
                You scored{' '}
                <span className="font-bold text-green-500">{savedScore}</span>{' '}
                out of {lesson.quiz.length}
              </h2>
            </div>
          )}
        </div>
      )}

      {/* Ternary operator to display score conditionally */}
      {showQuiz ? null : (
        <div className="rounded-lg bg-gray-100 p-4 shadow-md">
          <h2 className="text-lg font-bold">
            You scored{' '}
            <span className="font-bold text-green-500">{savedScore}</span> out
            of {lesson.quiz.length}
          </h2>
        </div>
      )}
    </div>
  )
}
export default Lesson
