import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import TechPill from '../ui/TechPill';
import Badge from '../ui/Badge';
import { CaseStudy } from '../../config/portfolioConfig';
import { SectionProps } from '../../types/common';
import './CaseStudies.scss';

const typeLabels: Record<string, string> = {
  product: 'Product',
  'design-system': 'Design System',
  architecture: 'Architecture',
};

import { ChevronIcon } from '../ui/Icons';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      className={`cs-card${isOpen ? ' cs-card--open' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card Header — always visible */}
      <button
        className="cs-card__header"
        onClick={() => setIsOpen(v => !v)}
        aria-expanded={isOpen}
        aria-controls={`cs-body-${study.id}`}
      >
        <div className="cs-card__meta">
          <Badge variant={study.type} label={typeLabels[study.type] ?? study.type} />
        </div>
        <div className="cs-card__title-row">
          <h3 className="cs-card__title">{study.title}</h3>
          <ChevronIcon open={isOpen} />
        </div>
        <p className="cs-card__tagline">{study.tagline}</p>
        <p className="cs-card__description">{study.description}</p>
      </button>

      {/* Expand content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`cs-body-${study.id}`}
            className="cs-card__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cs-card__body-inner">
              {/* Problem */}
              <div className="cs-block cs-block--problem">
                <div className="cs-block__label">
                  <span className="cs-block__dot cs-block__dot--problem" />
                  The Problem
                </div>
                <p>{study.problem}</p>
              </div>

              {/* Approach */}
              <div className="cs-block cs-block--approach">
                <div className="cs-block__label">
                  <span className="cs-block__dot cs-block__dot--approach" />
                  My Approach
                </div>
                <ul className="cs-list">
                  {study.approach.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <span className="cs-list__marker">↳</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="cs-block cs-block--impact">
                <div className="cs-block__label">
                  <span className="cs-block__dot cs-block__dot--impact" />
                  Impact & Results
                </div>
                <ul className="cs-list cs-list--impact">
                  {study.impact.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                    >
                      <span className="cs-list__marker cs-list__marker--impact">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="cs-tech">
                {study.technologies.map(tech => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CaseStudies: React.FC<SectionProps> = ({ portfolioConfig }) => {
  return (
    <section id="case-studies" className="case-studies">
      <div className="container">
        <SectionHeader
          label="Core Work"
          title="Case Studies"
          subtitle="Deep dives into the problems I solved, the approaches I took, and the impact delivered."
        />

        <div className="case-studies__list">
          {portfolioConfig.caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
