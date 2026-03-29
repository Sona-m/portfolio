import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDevJokes, getRandomJoke } from "../config/portfolioConfig";
import "./LoadingScreen.scss";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [joke, setJoke] = useState<string>("");
  const [jokes, setJokes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch jokes when component mounts
    const getJokes = async () => {
      try {
        const fetchedJokes = await fetchDevJokes();
        setJokes(fetchedJokes);
        setJoke(getRandomJoke(fetchedJokes));
      } catch (error) {
        console.error("Failed to fetch jokes:", error);
      }
    };

    getJokes();

    // Change joke every 5 seconds
    const jokeInterval = setInterval(() => {
      if (jokes.length > 0) {
        setJoke(getRandomJoke(jokes));
      }
    }, 5000);

    return () => clearInterval(jokeInterval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loading-content"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading Portfolio...
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={joke}
                className="joke-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="loading-joke">{joke}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
