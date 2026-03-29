import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionProps } from "../../types/common";
import "./Experience.scss";

const Experience: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
        >
          worked as.
        </motion.h2>

        <div className="experience-timeline">
          {portfolioConfig.experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${index}`}
              className="experience-item"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <div className="experience-header">
                <h3 className="position">
                  {experience.position}
                  <span className="company">, {experience.company}</span>
                </h3>
                <span className="period">{experience.period}</span>
              </div>

              <ul className="responsibilities">
                {experience.description.map((item, i) => (
                  <li key={i}>
                    <span className="responsibility-marker">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              {experience.technologies && (
                <div className="technologies">
                  {experience.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
