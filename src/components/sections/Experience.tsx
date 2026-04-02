import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import TechPill from '../ui/TechPill';
import { SectionProps } from '../../types/common';
import './Experience.scss';

const Experience: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          label="Work History"
          title="Experience"
          subtitle="Where I've worked and what I've achieved."
        />

        <div className="exp-timeline">
          {portfolioConfig.experience.map((job, index) => (
            <motion.div
              key={`${job.company}-${index}`}
              className="exp-item"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="exp-item__dot" aria-hidden="true" />
              {index < portfolioConfig.experience.length - 1 && (
                <div className="exp-item__line" aria-hidden="true" />
              )}

              <div className="exp-item__card">
                <div className="exp-item__header">
                  <div className="exp-item__title-group">
                    <h3 className="exp-item__role">{job.role}</h3>
                    <span className="exp-item__company">@ {job.company}</span>
                  </div>
                  <div className="exp-item__right">
                    <span className="exp-item__period">{job.period}</span>
                    <Badge variant={job.type.toLowerCase().replace('-', '-')} label={job.type} />
                  </div>
                </div>

                <ul className="exp-item__highlights">
                  {job.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.15 + i * 0.06 }}
                    >
                      <span className="exp-item__bullet" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="exp-item__tech">
                  {job.technologies.map(tech => (
                    <TechPill key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
