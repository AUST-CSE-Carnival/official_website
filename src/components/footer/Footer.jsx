import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiExternalLink
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';
import siteLogo from '../../assets/images/site_logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Event', path: '/event' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Sponsor', path: '/sponsor' },
  { name: 'Contact', path: '/contact' }
];

const socialLinks = [
  {
    name: 'Facebook',
    icon: FiFacebook,
    url: 'https://facebook.com/austcsecarnivalofficial',
    color: '#1877F2'
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    url: 'https://wa.me/8801890430560',
    color: '#25D366'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://youtube.com/playlist?list=PL5qPo7BnQjCBElhY9ciX6k3cP_-c-awzv&si=amj90SjwH3JjN798',
    color: '#FF0000'
  }
];

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'austcsecarnival@gmail.com',
    link: 'mailto:austcsecarnival@gmail.com'
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+880 1890-430560',
    link: 'tel:+8801890430560'
  },
  {
    icon: FiMapPin,
    label: 'Address',
    value: 'AUST Campus, Tejgaon, Dhaka',
    link: 'https://maps.google.com/?q=AUST+Tejgaon+Dhaka'
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <motion.div
            className={styles.brandSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className={styles.logoContainer}>
              <img src={siteLogo} alt="AUST CSE Carnival" className={styles.logo} />
            </Link>
            <p className={styles.brandDescription}>
              Join us for an exciting celebration of technology, innovation, and creativity.
              Experience the thrilling AUST CSE Carnival with competitions, exhibitions, and networking opportunities.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  style={{ '--social-color': social.color }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={link.path} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Contact Info</h3>
            <div className={styles.contactList}>
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.contactItem}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <contact.icon className={styles.contactIcon} size={16} />
                  <span>{contact.value}</span>
                  {contact.link.startsWith('http') && (
                    <FiExternalLink size={12} className={styles.externalIcon} />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Event Info */}
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Event Info</h3>
            <div className={styles.eventInfo}>
              <div className={styles.eventItem}>
                <span className={styles.eventLabel}>Date:</span>
                <span className={styles.eventValue}>21-28 August</span>
              </div>
              <div className={styles.eventItem}>
                <span className={styles.eventLabel}>Venue:</span>
                <span className={styles.eventValue}>AUST Campus</span>
              </div>
              <div className={styles.eventItem}>
                <span className={styles.eventLabel}>Duration:</span>
                <span className={styles.eventValue}>Full Day Event</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className={styles.footerBottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © {currentYear} AUST CSE Carnival. All rights reserved.
            </p>
            <div className={styles.footerBottomLinks}>
              <Link to="/privacy" className={styles.footerBottomLink}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={styles.footerBottomLink}>
                Terms of Service
              </Link>
              <span className={styles.divider}>•</span>
              <a 
                href="https://boraq.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.developerCredit}
              >
                Developed by Boraq.
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
