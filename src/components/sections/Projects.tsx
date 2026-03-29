import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { SectionProps } from "../../types/common";
import "./Projects.scss";

const Projects: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
        >
          projects.
        </motion.h2>

        <div className="projects-grid">
          {portfolioConfig.projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.name}</h3>
                  {project.isLive && (
                    <span className="project-badge">Live</span>
                  )}
                </div>

                <ul className="project-description">
                  {project.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <FontAwesomeIcon icon={faGithub} /> Code
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo for ${project.name}`}
                    >
                      <FontAwesomeIcon icon={faExternalLink} /> Demo
                    </a>
                  )}
                </div>
              </div>

              {project.image && (
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
