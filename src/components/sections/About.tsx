import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { SectionProps } from '../../types/common';
import './About.scss';

import { ZapIcon, LayersIcon, ChartIcon, PaletteIcon } from '../ui/Icons';

const About: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { personalInfo, socialLinks } = portfolioConfig;

  const highlights = [
    { icon: <ZapIcon />, label: 'End-to-end ownership from design to prod' },
    { icon: <LayersIcon />, label: 'Expert in design systems & micro-frontends' },
    { icon: <ChartIcon />, label: '60% Core Web Vitals performance improvement' },
    { icon: <PaletteIcon />, label: 'Figma design + React implementation' },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          label="Who I Am"
          title="About Me"
          subtitle="I care about building things that work beautifully and scale gracefully."
        />

        <div className="about__grid">
          {/* Left — text */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="about__intro-text">{personalInfo.intro}</p>
            <p className="about__status">{personalInfo.jobStatus}</p>

            <div className="about__meta">
              <div className="about__meta-item">
                <span className="about__meta-key">Location</span>
                <span className="about__meta-val">📍 {personalInfo.location}</span>
              </div>

            </div>

            <div className="about__cta">
              <a
                href={personalInfo.resumeUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
              <a href="#contact" className="btn btn-outline">
                Get in Touch
              </a>
            </div>
          </motion.div>

          {/* Right — avatar & highlights */}
          <motion.div
            className="about__right"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {personalInfo.avatarUrl && (
              <motion.div 
                className="about__avatar-wrapper"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo.name} 
                  className="about__avatar" 
                />
                <div className="about__avatar-backdrop" />
              </motion.div>
            )}
            
            <div className="about__highlights">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="about__highlight-card"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1 }}
              >
                <span className="about__highlight-icon">{h.icon}</span>
                <span className="about__highlight-text">{h.label}</span>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
