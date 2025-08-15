import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiUsers, FiMapPin, FiDollarSign, FiInfo, FiAward, FiExternalLink } from 'react-icons/fi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getSegmentById, getAllSegments } from '../../data/carnivalSegments';
import styles from './SegmentDetails.module.css';

const SegmentDetails = () => {
  const { id } = useParams();
  const [segment, setSegment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const foundSegment = getSegmentById(id);
    setSegment(foundSegment);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Header />
        <div className={styles.loadingContent}>
          <LoadingSpinner />
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!segment) {
    return <Navigate to="/event" replace />;
  }

  const formatDate = (dateString) => {
    if (dateString.includes(' - ')) {
      const [startDate, endDate] = dateString.split(' - ');
      const start = new Date(startDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const end = new Date(endDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return `${start} - ${end}`;
    }

    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiInfo },
    { id: 'registration', label: 'Registration', icon: FiUsers },
    { id: 'rules', label: 'Rules & Guidelines', icon: FiAward }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <>
      <Helmet>
        <title>{segment.title} | AUST CSE Carnival</title>
        <meta name="description" content={segment.description} />
        <meta name="keywords" content={`AUST, CSE, Carnival, ${segment.title}, ${segment.category}, ${segment.type}`} />
      </Helmet>

      <Header />

      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={styles.main}
      >
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <img
              src={segment.image}
              alt={segment.title}
              className={`${styles.heroImage} ${isImageLoaded ? styles.imageLoaded : ''}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className={styles.heroOverlay}></div>
          </div>

          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={styles.breadcrumb}
            >
              <Link to="/event" className={styles.backLink}>
                <FiArrowLeft />
                <span>Back to Events</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={styles.heroInfo}
            >
              <div className={styles.eventBadge}>
                <span className={`${styles.typeBadge} ${styles[segment.type.toLowerCase()]}`}>
                  {segment.type}
                </span>
                <span className={styles.categoryBadge}>
                  {segment.category}
                </span>
              </div>

              <h1 className={styles.eventTitle}>{segment.title}</h1>
              <p className={styles.eventDescription}>{segment.description}</p>

              <div className={styles.quickInfo}>
                <div className={styles.infoItem}>
                  <FiCalendar className={styles.infoIcon} />
                  <span>{formatDate(segment.date)}</span>
                </div>
                {segment.time && segment.time !== 'TBA' && (
                  <div className={styles.infoItem}>
                    <FiClock className={styles.infoIcon} />
                    <span>{segment.time}</span>
                  </div>
                )}
                <div className={styles.infoItem}>
                  <FiMapPin className={styles.infoIcon} />
                  <span>{segment.type}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.container}>
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={styles.tabNavigation}
            >
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent className={styles.tabIcon} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.tabContent}
              >
                {activeTab === 'overview' && (
                  <div className={styles.overviewContent}>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailsCard}>
                        <h3>Event Details</h3>
                        <div className={styles.detailsList}>
                          <div className={styles.detailItem}>
                            <FiCalendar className={styles.detailIcon} />
                            <div>
                              <label>Date</label>
                              <span>{formatDate(segment.date)}</span>
                            </div>
                          </div>
                          {segment.time && segment.time !== 'TBA' && (
                            <div className={styles.detailItem}>
                              <FiClock className={styles.detailIcon} />
                              <div>
                                <label>Time</label>
                                <span>{segment.time}</span>
                              </div>
                            </div>
                          )}
                          <div className={styles.detailItem}>
                            <FiMapPin className={styles.detailIcon} />
                            <div>
                              <label>Type</label>
                              <span>{segment.type}</span>
                            </div>
                          </div>
                          <div className={styles.detailItem}>
                            <FiAward className={styles.detailIcon} />
                            <div>
                              <label>Category</label>
                              <span>{segment.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.descriptionCard}>
                        <h3>About This Event</h3>
                        <p>{segment.description}</p>
                        {segment.longDescription && (
                          <p>{segment.longDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'registration' && (
                  <div className={styles.registrationContent}>
                    {/* Special handling for E-Sports with multiple games */}
                    {segment.isMultiGame ? (
                      <div className={styles.multiGameRegistration}>
                        <div className={styles.registrationCard}>
                          <h3>Registration Information</h3>
                          <div className={styles.registrationDetails}>
                            <div className={styles.regItem}>
                              <FiCalendar className={styles.regIcon} />
                              <div>
                                <label>Registration Deadline</label>
                                <span>{segment.registration?.deadline || 'TBA'}</span>
                              </div>
                            </div>
                            <div className={styles.regItem}>
                              <FiDollarSign className={styles.regIcon} />
                              <div>
                                <label>Registration Fee</label>
                                <span>{segment.registration?.fee || 'TBA'}</span>
                              </div>
                            </div>
                            <div className={styles.regItem}>
                              <FiUsers className={styles.regIcon} />
                              <div>
                                <label>Team Size</label>
                                <span>{segment.registration?.teamSize || 'Varies by game'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.gamesSection}>
                          <h3>Choose Your Game</h3>
                          <p>Register for one or more gaming tournaments below:</p>
                          <div className={styles.gamesGrid}>
                            {segment.games?.map((game) => (
                              <div key={game.id} className={styles.gameCard}>
                                <div className={styles.gameInfo}>
                                  <h4>{game.name}</h4>
                                  <p>{game.description}</p>
                                  <div className={styles.gameTeamSize}>
                                    <FiUsers className={styles.gameIcon} />
                                    <span>{game.teamSize}</span>
                                  </div>
                                </div>
                                <a
                                  href={game.registrationLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.gameRegisterButton}
                                >
                                  <FiExternalLink />
                                  <span>Register for {game.name}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard registration for single-game events */
                      <div className={styles.registrationGrid}>
                        <div className={styles.registrationCard}>
                          <h3>Registration Information</h3>
                          <div className={styles.registrationDetails}>
                            <div className={styles.regItem}>
                              <FiCalendar className={styles.regIcon} />
                              <div>
                                <label>Registration Deadline</label>
                                <span>{segment.registration?.deadline || 'TBA'}</span>
                              </div>
                            </div>
                            <div className={styles.regItem}>
                              <FiDollarSign className={styles.regIcon} />
                              <div>
                                <label>Registration Fee</label>
                                <span>{segment.registration?.fee || 'TBA'}</span>
                              </div>
                            </div>
                            <div className={styles.regItem}>
                              <FiUsers className={styles.regIcon} />
                              <div>
                                <label>Team Size</label>
                                <span>{segment.registration?.teamSize || 'Individual'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.actionCard}>
                          <h3>Ready to Participate?</h3>
                          <p>Register now to secure your spot in this exciting event!</p>
                          {segment.registrationLink ? (
                            <a
                              href={segment.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.registerButton}
                            >
                              <FiExternalLink />
                              <span>Register Now</span>
                            </a>
                          ) : (
                            <button className={styles.registerButton} disabled>
                              <FiExternalLink />
                              <span>Register Now</span>
                            </button>
                          )}
                          <p className={styles.registrationNote}>
                            {segment.registrationLink ?
                              'Click to open registration form in a new tab.' :
                              'Registration opens soon. Stay tuned for updates!'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'rules' && (
                  <div className={styles.rulesContent}>
                    {/* Rulebook Button */}
                    {segment.rulebookLink && (
                      <div className={styles.rulebookHeader}>
                        <a
                          href={segment.rulebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.rulebookButton}
                        >
                          <FiExternalLink />
                          <span>Rulebook & Resources</span>
                        </a>
                      </div>
                    )}

                    <div className={styles.rulesCard}>
                      <h3>Rules & Guidelines</h3>
                      <div className={styles.rulesList}>
                        <div className={styles.ruleItem}>
                          <h4>General Rules</h4>
                          <ul>
                            <li>All participants must be registered before the deadline</li>
                            <li>Valid student ID is required for verification</li>
                            <li>Participants must follow the code of conduct</li>
                            <li>Late submissions will not be accepted</li>
                          </ul>
                        </div>
                        <div className={styles.ruleItem}>
                          <h4>Event-Specific Guidelines</h4>
                          <ul>
                            <li>Team size: {segment.registration?.teamSize || 'Individual'}</li>
                            <li>Event type: {segment.type}</li>
                            <li>Category: {segment.category}</li>
                            <li>More details will be provided upon registration</li>
                          </ul>
                        </div>
                        <div className={styles.ruleItem}>
                          <h4>Judging Criteria</h4>
                          <ul>
                            <li>Technical excellence and innovation</li>
                            <li>Problem-solving approach</li>
                            <li>Presentation quality</li>
                            <li>Overall impact and feasibility</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Related Events */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={styles.relatedEvents}
            >
              <h3>Other Events You Might Like</h3>
              <div className={styles.relatedGrid}>
                {getAllSegments()
                  .filter(relatedSegment => relatedSegment.id !== segment.id)
                  .slice(0, 3)
                  .map((relatedSegment) => (
                    <Link
                      key={relatedSegment.id}
                      to={`/segment/${relatedSegment.id}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImage}>
                        <img src={relatedSegment.image} alt={relatedSegment.title} />
                        <div className={styles.relatedOverlay}>
                          <FiExternalLink className={styles.relatedIcon} />
                        </div>
                      </div>
                      <div className={styles.relatedContent}>
                        <span className={styles.relatedType}>{relatedSegment.type}</span>
                        <h4>{relatedSegment.title}</h4>
                        <p>{relatedSegment.description}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </motion.section>
          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  );
};

export default SegmentDetails;
