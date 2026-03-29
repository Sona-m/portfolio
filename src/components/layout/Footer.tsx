import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { PortfolioConfig } from "../../config/portfolioConfig";
import "./Footer.scss";

interface FooterProps {
  portfolioConfig: PortfolioConfig;
}

const Footer: React.FC<FooterProps> = ({ portfolioConfig }) => {
  const currentYear = new Date().getFullYear();

  // Helper function to determine if icon is from brand or solid icons
  const getIconPrefix = (iconName: string) => {
    if (["github", "linkedin", "twitter"].includes(iconName)) {
      return "fab";
    }
    return "fas";
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            {portfolioConfig.socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.name}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <FontAwesomeIcon icon={[getIconPrefix(link.icon), link.icon]} />
              </motion.a>
            ))}
          </div>

          <motion.p
            className="copyright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} {portfolioConfig.personalInfo.name}. All rights
            reserved.
          </motion.p>

          <motion.p
            className="credit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Built with <span className="accent-text">❤</span> using React &
            TypeScript
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
