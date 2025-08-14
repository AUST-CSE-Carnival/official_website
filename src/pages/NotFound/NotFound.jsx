import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - AUST CSE Carnival</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles.errorCode}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.div>
          
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className={styles.backButton}
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
