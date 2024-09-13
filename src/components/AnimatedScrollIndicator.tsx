import React, { useEffect, useState } from 'react'

interface ScrollIndicatorProps {
  currentLesson: number
}

const AnimatedScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  currentLesson
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY
      const windowHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / windowHeight) * 100
      setScrollProgress(scrollPercentage)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="scroll-indicator fixed left-0 top-0 h-1 bg-blue-500"
      style={{ width: `${scrollProgress}%` }}
    ></div>
  )
}

export default AnimatedScrollIndicator
