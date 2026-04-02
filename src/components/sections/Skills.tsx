import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { SectionProps } from '../../types/common';
import './Skills.scss';

const Skills: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          label="Toolkit"
          title="Skills & Technologies"
          subtitle="The languages, frameworks, and tools I use to build production systems."
        />

        <div className="skills__grid">
          {portfolioConfig.skills.map((group, gi) => (
            <motion.div
              key={group.category}
              className="skills__group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.12 }}
            >
              <div className="skills__group-header">
                <span className="skills__group-icon" aria-hidden="true">{group.icon}</span>
                <h3 className="skills__group-title">{group.category}</h3>
              </div>
              <div className="skills__pills">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skills__pill"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.12 + si * 0.04 }}
                    whileHover={{ y: -2, scale: 1.05 }}
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
