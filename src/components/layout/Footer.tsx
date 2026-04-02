import { motion } from 'framer-motion';
import { PortfolioConfig } from '../../config/portfolioConfig';
import './Footer.scss';

interface FooterProps {
  portfolioConfig: PortfolioConfig;
}

import { getSocialIcon } from '../ui/Icons';

const Footer: React.FC<FooterProps> = ({ portfolioConfig }) => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <motion.p
            className="footer__copyright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            © {currentYear} {portfolioConfig.personalInfo.name}. Built with React & TypeScript.
          </motion.p>

          <div className="footer__social">
            {portfolioConfig.socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                title={link.name}
                whileHover={{ y: -3, scale: 1.1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
