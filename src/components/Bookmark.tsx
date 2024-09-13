import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

interface BookmarkProps {
  isBookmarked: boolean
  onToggleBookmark: () => void
}

const Bookmark: React.FC<BookmarkProps> = ({
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <button
      className="text-xl"
      onClick={onToggleBookmark}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? <FaStar color="gold" /> : <FaRegStar />}
    </button>
  )
}

export default Bookmark
