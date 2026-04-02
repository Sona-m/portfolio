import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { PortfolioConfig } from '../../config/portfolioConfig';
import './Hero.scss';

interface HeroProps {
  portfolioConfig: PortfolioConfig;
}

import { getSocialIcon } from '../ui/Icons';

const Hero: React.FC<HeroProps> = ({ portfolioConfig }) => {
  const typedEl = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<Typed | null>(null);
  const { personalInfo, socialLinks } = portfolioConfig;

  useEffect(() => {
    if (typedEl.current) {
      typedRef.current = new Typed(typedEl.current, {
        strings: personalInfo.typedStrings,
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
      });
    }
    return () => typedRef.current?.destroy();
  }, [personalInfo.typedStrings]);



  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="hero" aria-label="Introduction">
      {/* Decorative blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="hero__content"
          variants={container}
          initial="hidden"
          animate="visible"
        >


          {/* Name */}
          <motion.h1 className="hero__name" variants={item}>
            {personalInfo.name}
          </motion.h1>

          {/* Typed role */}
          <motion.div className="hero__role" variants={item}>
            <span className="hero__role-arrow">→</span>
            <span className="hero__typed" aria-live="polite">
              <span ref={typedEl} />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.p className="hero__headline" variants={item}>
            {personalInfo.headline}
          </motion.p>

          {/* Intro */}
          <motion.p className="hero__intro" variants={item}>
            {personalInfo.intro}
          </motion.p>

          {/* CTA Row */}
          <motion.div className="hero__cta" variants={item}>
            <a
              href={personalInfo.resumeUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
            <a href="#case-studies" className="btn btn-ghost">
              See My Work
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div className="hero__social" variants={item}>
            {socialLinks.map(link => (
              <motion.a
                key={link.url}
                href={link.url}
                className="hero__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {getSocialIcon(link.name)}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          {personalInfo.stats?.length > 0 && (
            <motion.div className="hero__stats" variants={item}>
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="hero__stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                >
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
