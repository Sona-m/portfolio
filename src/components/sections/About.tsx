import { motion } from "framer-motion";
import { SectionProps } from "../../types/common";
import { useInView } from "framer-motion";
import { useRef } from "react";
import "./About.scss";

const About: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
        >
          about me.
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>{portfolioConfig.personalInfo.intro}</p>
            <p>{portfolioConfig.personalInfo.jobStatus}</p>

            <div className="personal-details">
              <div className="detail">
                <span className="detail-label">Name:</span>
                <span className="detail-value">
                  {portfolioConfig.personalInfo.name}
                </span>
              </div>

              <div className="detail">
                <span className="detail-label">Location:</span>
                <span className="detail-value">
                  {portfolioConfig.personalInfo.location}
                </span>
              </div>

              {portfolioConfig.personalInfo.pronouns && (
                <div className="detail">
                  <span className="detail-label">Pronouns:</span>
                  <span className="detail-value">
                    {portfolioConfig.personalInfo.pronouns}
                  </span>
                </div>
              )}
            </div>

            <div className="about-cta">
              <a
                href={portfolioConfig.personalInfo.resumeUrl}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
          </motion.div>

          {portfolioConfig.personalInfo.avatarUrl && (
            <motion.div
              className="about-image"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="image-container">
                <img
                  src={portfolioConfig.personalInfo.avatarUrl}
                  alt={portfolioConfig.personalInfo.name}
                />
                <div className="image-backdrop"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
