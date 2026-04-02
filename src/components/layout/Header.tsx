import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioConfig } from '../../config/portfolioConfig';
import './Header.scss';

interface HeaderProps {
  portfolioConfig: PortfolioConfig;
}

import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from '../ui/Icons';

const Header: React.FC<HeaderProps> = ({ portfolioConfig }) => {
  const { theme, toggleTheme } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { personalInfo, navLinks } = portfolioConfig;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header${isScrolled ? ' header--scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo" onClick={closeMenu}>
            <motion.div
              className="header-logo__inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {personalInfo.avatarUrl && (
                <img 
                  src={personalInfo.avatarUrl} 
                  alt="Avatar" 
                  className="header-logo__avatar" 
                />
              )}
              <span className="header-logo__text">
                {personalInfo.name.split(' ')[0]}
                <span className="logo-dot">.</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main navigation">
            <ul className="header-nav__list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <a href={link.href} className="header-nav__link" onClick={closeMenu}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <a
              href={personalInfo.resumeUrl}
              className="btn btn-outline header-resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>

            {/* Mobile toggle */}
            <button
              className="header-mobile-toggle"
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="header-mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile navigation"
          >
            <ul>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>{link.label}</a>
                </li>
              ))}
              <li className="drawer-resume">
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="btn btn-primary"
                >
                  View Resume
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
