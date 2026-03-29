import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { PortfolioConfig } from "../../config/portfolioConfig";
import "./Hero.scss";

interface HeroProps {
  portfolioConfig: PortfolioConfig;
}

const Hero: React.FC<HeroProps> = ({ portfolioConfig }) => {
  const typedElement = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedElement.current) {
      typed.current = new Typed(typedElement.current, {
        strings: [
          `${portfolioConfig.personalInfo.title}`,
          "Problem Solver",
          "UI Enthusiast",
        ],
        typeSpeed: 200,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, [portfolioConfig]);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="greeting">👋 Hi, I am</span>
              <br />
              <span className="name">{portfolioConfig.personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              className="typed-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="accent-text">
                <span ref={typedElement}></span>
              </span>
            </motion.h2>

            <motion.p
              className="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {portfolioConfig.personalInfo.intro}
            </motion.p>

            <motion.div
              className="cta-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href={portfolioConfig.personalInfo.resumeUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFile} /> Resume
              </a>

              {portfolioConfig.personalInfo.calendarUrl && (
                <a
                  href={portfolioConfig.personalInfo.calendarUrl}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faCalendar} /> Schedule a call
                </a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
