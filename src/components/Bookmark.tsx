import React from 'react'

interface BookmarkProps {
  lesson: number | null
  onContinue: () => void
}

const Bookmark: React.FC<BookmarkProps> = ({ lesson, onContinue }) => {
  return lesson !== null ? (
    <div className="bookmark">
      <button
        className="rounded bg-green-500 p-2 text-white"
        onClick={onContinue}
      >
        Continue from Lesson {lesson}
      </button>
    </div>
  ) : null
}

export default Bookmark
