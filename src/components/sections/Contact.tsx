import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { SectionProps } from '../../types/common';
import './Contact.scss';

import { getSocialIcon, EmailIcon, ArrowRightLinkIcon } from '../ui/Icons';

const Contact: React.FC<SectionProps> = ({ portfolioConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { socialLinks, personalInfo } = portfolioConfig;



  const getLinkDisplay = (url: string) =>
    url.replace('mailto:', '').replace('https://', '').replace('www.', '');

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          label="Say Hello"
          title="Get In Touch"
          subtitle="Open to new opportunities, collaborations, or a simple conversation about frontend engineering."
        />

        <div className="contact__body">
          {/* Headline card */}
          <motion.div
            className="contact__cta-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="contact__cta-text">
              Whether you have an opportunity, want to build something together, or just want to say hi — my inbox is always open.
            </p>
            <a
              href={`mailto:${personalInfo.resumeUrl.includes('mailto') ? personalInfo.resumeUrl.replace('mailto:', '') : 'sonamkri1605@gmail.com'}`}
              className="btn btn-primary contact__email-btn"
            >
              <EmailIcon />
              Send an Email
            </a>
          </motion.div>

          {/* Social Links */}
          <div className="contact__links">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.url}
                href={link.url}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="contact__link-icon">
                  {getSocialIcon(link.name)}
                </div>
                <div className="contact__link-text">
                  <span className="contact__link-name">{link.name}</span>
                  <span className="contact__link-url">{getLinkDisplay(link.url)}</span>
                </div>
                <ArrowRightLinkIcon className="contact__link-arrow" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
