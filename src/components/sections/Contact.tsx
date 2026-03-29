import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionProps } from "../../types/common";
import "./Contact.scss";

const Contact: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Helper function to determine if icon is from brand or solid icons
  const getIconPrefix = (iconName: string) => {
    if (["github", "linkedin", "twitter"].includes(iconName)) {
      return "fab";
    }
    return "fas";
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5 }}
        >
          contact, socials & coding profiles.
        </motion.h2>

        <motion.div
          className="contact-content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contact-text">
            <p>
              Feel free to reach out if you want to discuss potential
              collaborations, opportunities, or just have a chat!
            </p>
          </div>

          <div className="contact-links">
            {portfolioConfig.socialLinks.map((link, index) => (
              <motion.a
                key={link.url}
                href={link.url}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <span className="link-icon">
                  <FontAwesomeIcon
                    icon={[
                      getIconPrefix(link.icon as string),
                      link.icon as any,
                    ]}
                  />
                </span>
                <span className="link-text">
                  <span className="link-name">{link.name}</span>
                  <span className="link-url">
                    {link.url.replace("mailto:", "").replace("https://", "")}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>

          {portfolioConfig.personalInfo.calendarUrl && (
            <motion.div
              className="contact-cta"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href={portfolioConfig.personalInfo.calendarUrl}
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Meeting
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
