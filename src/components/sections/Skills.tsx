import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionProps } from "../../types/common";
import "./Skills.scss";

const Skills: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
        >
          languages, frameworks & tools, I've worked with.
        </motion.h2>

        <div className="skills-container">
          {portfolioConfig.skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              className="skill-category"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h3 className="category-title">{skillCategory.category}:</h3>

              <div className="skill-tags">
                {skillCategory.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: 0.05 * i + 0.2 * index,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
