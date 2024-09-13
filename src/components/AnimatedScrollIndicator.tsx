import React, { useEffect, useState } from 'react'

interface ScrollIndicatorProps {}

const AnimatedScrollIndicator: React.FC<ScrollIndicatorProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / windowHeight) * 100
      setScrollProgress(scrollPercentage)
    }

    window.addEventListener('scroll', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500"
      style={{ width: `${scrollProgress}%` }}
    />
  )
}

export default AnimatedScrollIndicator
