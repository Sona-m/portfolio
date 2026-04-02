import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.scss';

interface LoadingScreenProps {
  isLoading: boolean;
}

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "It's not a bug — it's an undocumented feature. 🤔",
  "!false... it's funny because it's true! 😄",
  "Why do Java developers wear glasses? Because they don't C#. 👓",
  "A SQL query walks into a bar, sees two tables and asks... 'Can I join you?' 🍺",
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [joke, setJoke] = useState(jokes[0]);

  useEffect(() => {
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    const id = setInterval(() => {
      setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="loading-content"
            initial={{ y: -16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />

            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading Portfolio...
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={joke}
                className="loading-joke"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {joke}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
