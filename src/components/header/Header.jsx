import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import styles from './Header.module.css';
import siteLogo from '../../assets/images/site_logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Event', path: '/event' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Sponsor', path: '/sponsor' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Enhanced scroll handler with hide/show functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(`.${styles.nav}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${!isVisible ? styles.headerHidden : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className={styles.nav}>
        {/* Logo Section */}
        <Link to="/" className={styles.logoContainer}>
          <motion.img
            src={siteLogo}
            alt="AUST CSE Carnival"
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.span>
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className={styles.ctaSection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="https://youtu.be/Ra5L-uby8Hg" className={styles.ctaButton}>
            Watch Promo Video
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.div>
        </button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={styles.mobileMenuContent}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                  className={styles.mobileCta}
                >
                  <Link
                    to="https://youtu.be/Ra5L-uby8Hg"
                    className={styles.mobileCtaButton}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Watch Promo Video
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
