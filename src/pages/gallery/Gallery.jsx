import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import styles from './Gallery.module.css';
import { carnivalData, magazineData } from '../../data/galleryData';

const Gallery = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState(new Set(['hero'])); // Initialize with hero visible

  const roadmapRef = useRef(null);
  const observerRef = useRef(null);

  // Fixed Intersection Observer for scroll animations - completely rewritten
  useEffect(() => {
    // Cleanup any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a more reliable intersection observer
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        if (sectionId) {
          if (entry.isIntersecting) {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.add(sectionId);
              console.log('Section visible:', sectionId); // Debug log
              return newSet;
            });
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px 0px -20px 0px'
    });

    // Wait for DOM to be fully ready, then observe elements
    const observeElements = () => {
      const sections = document.querySelectorAll('[data-section]');
      console.log('Found sections:', sections.length); // Debug log

      sections.forEach((section) => {
        if (section && observerRef.current) {
          observerRef.current.observe(section);
          console.log('Observing section:', section.getAttribute('data-section')); // Debug log
        }
      });
    };

    // Use a longer delay and also try on next tick
    const timer1 = setTimeout(observeElements, 200);
    const timer2 = setTimeout(observeElements, 500);

    // Also try on next animation frame
    requestAnimationFrame(() => {
      setTimeout(observeElements, 100);
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Keep empty dependency array

  // Force visibility check on mount and scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const sectionId = section.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.add(sectionId);
              return newSet;
            });
          }
        }
      });
    };

    // Initial check
    setTimeout(handleScroll, 100);

    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigate to gallery page
  const openGallery = (version) => {
    // Encode the version to be URL-safe (replace dots with dashes)
    const urlSafeVersion = version.replace(/\./g, '-');
    navigate(`/gallery/${urlSafeVersion}`);
  };

  // Fixed Roadmap Section Component
  const RoadmapSection = ({ carnival, version, index }) => {
    const isVisible = visibleSections.has(`carnival-${version}`);

    return (
      <div
        className={`${styles.roadmapSection} ${styles[carnival.position]} ${isVisible ? styles.visible : ''}`}
        data-section={`carnival-${version}`}
        style={{
          animationDelay: `${index * 0.2}s`,
          '--carnival-index': index
        }}
      >
        {/* Fixed Timeline connector - moved to avoid collision */}
        <div className={styles.timelineConnector}>
          <div className={styles.yearBadge}>
            <span className={styles.yearText}>{carnival.year}</span>
          </div>
          <div className={styles.timelineDot} style={{ backgroundColor: carnival.accentColor }}>
            <span className={styles.carnivalNumber}>{carnival.carnivalNumber}</span>
          </div>
          {index < Object.keys(carnivalData).length - 1 && (
            <div className={styles.timelineLine} style={{ backgroundColor: carnival.accentColor }}></div>
          )}
        </div>

        {/* Fixed carnival card positioning */}
        <div
          className={styles.carnivalCard}
          style={{
            background: `linear-gradient(135deg, ${carnival.accentColor}20 0%, ${carnival.accentColor}40 50%, ${carnival.accentColor}60 100%)`,
            '--carnival-accent-color': carnival.accentColor,
            '--carnival-accent-color-shadow': `${carnival.accentColor}50` // Add 50 for 50% opacity
          }}
          onClick={() => openGallery(version)}
        >
          <div className={styles.cardGlow} style={{ boxShadow: `0 0 50px ${carnival.accentColor}40` }}></div>

          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <span className={styles.carnivalNumber}>{carnival.carnivalNumber}</span>
            </div>
            <div className={styles.cardYear}>{carnival.year}</div>
          </div>

          <div className={styles.cardContent}>
            <h3 className={styles.carnivalTitle}>{carnival.title}</h3>
            <p className={styles.carnivalSubtitle}>{carnival.subtitle}</p>
            <p className={styles.carnivalDescription}>{carnival.description}</p>

            {/* Enhanced stats section */}
            <div className={styles.carnivalStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{carnival.stats.photos}</span>
                <span className={styles.statLabel}>Photos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{carnival.stats.events}</span>
                <span className={styles.statLabel}>Events</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{carnival.stats.participants}</span>
                <span className={styles.statLabel}>Participants</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{carnival.stats.duration}</span>
                <span className={styles.statLabel}>Duration</span>
              </div>
            </div>

            {/* Highlights section */}
            <div className={styles.highlights}>
              {carnival.highlights.map((highlight, idx) => (
                <span key={idx} className={styles.highlight}>{highlight}</span>
              ))}
            </div>

            <button
              className={styles.viewGalleryButton}
              onClick={(e) => {
                e.stopPropagation();
                openGallery(version);
              }}
              aria-label={`View ${carnival.title} gallery`}
            >
              <span className={styles.buttonText}>View Gallery</span>
              <span className={styles.buttonIcon}>
                <Icon type="camera" size="medium" />
              </span>
              <div className={styles.buttonRipple}></div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.galleryPage}>
      <Header />

      <main className={styles.main}>
        {/* Enhanced Hero Section */}
        <section className={styles.heroSection} data-section="hero">
          <div className={styles.heroBackground}>
            <div className={styles.heroParticles}></div>
          </div>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>
                <span className={styles.titleGradient}>Best Memories</span>
                <span className={styles.titleAccent}>
                  <Icon type="sparkles" size="large" />
                </span>
              </h1>
              <p className={styles.pageSubtitle}>
                Journey through the evolution of AUST CSE Carnival - from humble beginnings to extraordinary celebrations
              </p>
              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNumber}>6</span>
                  <span className={styles.heroStatLabel}>Carnival Editions</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNumber}>12+</span>
                  <span className={styles.heroStatLabel}>Total segments</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatNumber}>5000+</span>
                  <span className={styles.heroStatLabel}>Total participations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Interactive Roadmap Timeline */}
        <section className={styles.roadmapTimeline} ref={roadmapRef} data-section="timeline">
          <div className={styles.container}>
            <div className={styles.timelineHeader}>
              <h2 className={styles.timelineTitle}>Our Carnival Journey</h2>
              <p className={styles.timelineSubtitle}>Click on any carnival to explore its gallery</p>
            </div>

            <div className={styles.roadmapContainer}>
              {Object.entries(carnivalData).map(([version, carnival], index) => (
                <RoadmapSection
                  key={version}
                  carnival={carnival}
                  version={version}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Current Carnival Section */}
        <section className={styles.currentCarnival} data-section="current">
          <div className={styles.container}>
            <div className={styles.currentCard}>
              <div className={styles.currentIcon}>
                <Icon type="tent" size="xxlarge" />
              </div>
              <h2 className={styles.currentTitle}>AUST CSE Carnival 6.0</h2>
              <p className={styles.currentSubtitle}>
                The latest and most spectacular edition of our carnival journey, featuring cutting-edge technology and unforgettable experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced Magazines Section */}
        <section className={styles.magazinesSection} data-section="magazines">
          <div className={styles.container}>
            <div className={styles.magazineHeader}>
              <h2 className={styles.sectionTitle}>Digital Magazines</h2>
              <p className={styles.sectionSubtitle}>
                Dive deep into our carnival stories through our comprehensive digital publications
              </p>
            </div>

            <div className={styles.magazineGrid}>
              {magazineData.map((mag) => (
                <a key={mag.id} href={mag.link} className={styles.magazineCard} style={{ '--accent-color': mag.color }} target="_blank" rel="noopener noreferrer">
                  <div className={styles.magazineCover}>
                    <div className={styles.magazineGlow}></div>
                    <div className={styles.magazineContent}>
                      <div className={styles.magazineYear}>{mag.year}</div>
                      <h3>{mag.title}</h3>
                      <p>{mag.description}</p>
                      <div className={styles.magazineButton}>
                        <span>Read More</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
