import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollInfo, setScrollInfo] = useState({
    position: 0,
    total: 0,
    percentage: 0,
  });

  const updateScroll = () => {
    // Calculate scroll progress
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);

    // Update scroll info
    const position = window.pageYOffset;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = Math.min(Math.round((position / total) * 100), 100);
    setScrollInfo({ position, total, percentage });

    // Toggle button visibility
    setIsVisible(position > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Vertical scroll indicator */}
      <div className={cn(
        'fixed right-8 top-1/2 -translate-y-1/2 h-48 w-1 bg-gray-200 rounded transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}>
        <div 
          className="bg-green-600 w-full rounded transition-all duration-300"
          style={{ height: `${scrollInfo.percentage}%` }}
        />
      </div>

      {/* Back to top button with circular progress */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-20 right-4"
          >
            <div className="relative">
              {/* Circular Progress Ring */}
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                />
                <circle
                  className="text-green-600 transition-all duration-300"
                  strokeWidth="2"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 * ((100 - scrollProgress) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                />
              </svg>

              {/* Button */}
              <motion.button
                className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg"
                onClick={scrollToTop}
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5 text-green-600" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}