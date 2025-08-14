import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import styles from './Gallery.module.css';

// Import carnival images with proper paths for production
const importCarnivalImages = (carnivalVersion, count) => {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push({
      src: `/images/carnivals/Carnival ${carnivalVersion}.0/carnival_${carnivalVersion}_img_${i}.jpg`,
      alt: `AUST CSE Carnival ${carnivalVersion}.0 - Memory ${i}`,
      id: `carnival_${carnivalVersion}_${i}`,
      thumbnail: `/images/carnivals/Carnival ${carnivalVersion}.0/carnival_${carnivalVersion}_img_${i}.jpg`
    });
  }
  return images;
};

// Enhanced carnival data with comprehensive information.
const carnivalData = {
  "1.0": {
    title: "Integer 43",
    subtitle: "The Pioneer Journey Begins",
    description: "The very first AUST CSE Carnival that started our amazing tradition of innovation and technology celebration.",
    year: "2021",
    gradient: "linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-accent-dark) 100%)",
    accentColor: "#403168",
    icon: "rocket",
    position: "left",
    images: importCarnivalImages("1", 18),
    stats: { photos: 18, events: 5, participants: "500+", duration: "3 days" },
    highlights: ["First Ever Carnival", "Programming Contest", "Tech Exhibition"]
  },
  "2.0": {
    title: "Decipher 44",
    subtitle: "Continuing the Legacy",
    description: "Building upon our foundation with expanded events and greater participation from the tech community.",
    year: "2022",
    gradient: "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent-bright) 100%)",
    accentColor: "#8e3795",
    icon: "target",
    position: "right",
    images: importCarnivalImages("2", 6),
    stats: { photos: 6, events: 6, participants: "750+", duration: "3 days" },
    highlights: ["UI/UX Competition", "Hackathon", "AI Workshop"]
  },
  "3.0": {
    title: "Qubits 45",
    subtitle: "Setting New Benchmarks",
    description: "A quantum leap in carnival excellence with cutting-edge competitions and industry partnerships.",
    year: "2023",
    gradient: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary-dark) 100%)",
    accentColor: "#325666",
    icon: "star",
    position: "left",
    images: importCarnivalImages("3", 8),
    stats: { photos: 8, events: 7, participants: "1000+", duration: "4 days" },
    highlights: ["Quantum Computing", "Robotics Showcase", "Startup Pitch"]
  },
  "4.0": {
    title: "Carnival 4.0",
    subtitle: "Innovation at Its Peak",
    description: "The fourth iteration brought revolutionary changes with international participation and advanced tech demos.",
    year: "2024",
    gradient: "linear-gradient(135deg, var(--color-accent-bright) 0%, var(--color-accent-dark) 100%)",
    accentColor: "#0b0146",
    icon: "tent",
    position: "right",
    images: importCarnivalImages("4", 10),
    stats: { photos: 10, events: 8, participants: "1200+", duration: "4 days" },
    highlights: ["International Speakers", "VR/AR Demos", "Blockchain Workshop"]
  },
  "5.0": {
    title: "Carnival 5.0",
    subtitle: "The Future is Here",
    description: "Our most ambitious carnival yet, showcasing the latest in AI, machine learning, and emerging technologies.",
    year: "2025",
    gradient: "linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-accent-bright) 100%)",
    accentColor: "#420605",
    icon: "sparkles",
    position: "left",
    images: importCarnivalImages("5", 12),
    stats: { photos: 12, events: 10, participants: "1500+", duration: "5 days" },
    highlights: ["AI Revolution", "Metaverse Expo", "Global Tech Summit"]
  }
};

const Gallery = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
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

  // Enhanced gallery opening with preloading
  const openGallery = useCallback((carnivalVersion) => {
    setIsLoading(true);
    setImageLoadError(false);
    setActiveGallery(carnivalVersion);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';

    // Preload first few images
    const carnival = carnivalData[carnivalVersion];
    if (carnival) {
      carnival.images.slice(0, 3).forEach(img => {
        const image = new Image();
        image.src = img.src;
      });
    }

    setTimeout(() => setIsLoading(false), 600);
  }, []);

  // Enhanced gallery closing
  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
    setActiveGallery(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  }, []);

  // Enhanced image navigation with preloading
  const nextImage = useCallback(() => {
    if (activeGallery && carnivalData[activeGallery]) {
      const images = carnivalData[activeGallery].images;
      const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(nextIndex);

      // Preload next image
      if (nextIndex + 1 < images.length) {
        const image = new Image();
        image.src = images[nextIndex + 1].src;
      }
    }
  }, [activeGallery, currentImageIndex]);

  const prevImage = useCallback(() => {
    if (activeGallery && carnivalData[activeGallery]) {
      const images = carnivalData[activeGallery].images;
      const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      setCurrentImageIndex(prevIndex);

      // Preload previous image
      if (prevIndex - 1 >= 0) {
        const image = new Image();
        image.src = images[prevIndex - 1].src;
      }
    }
  }, [activeGallery, currentImageIndex]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isGalleryOpen) return;

      switch (e.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case ' ':
          e.preventDefault();
          nextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGalleryOpen, closeGallery, nextImage, prevImage]);

  // Enhanced touch/swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextImage();
    else if (isRightSwipe) prevImage();
  }, [touchStart, touchEnd, nextImage, prevImage]);


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
            <Icon type={carnival.icon} size="medium" />
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
              <Icon type={carnival.icon} size="large" />
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

  // Enhanced Gallery Modal Component
  const GalleryModal = () => {
    if (!isGalleryOpen || !activeGallery) return null;

    const currentCarnival = carnivalData[activeGallery];
    const currentImage = currentCarnival.images[currentImageIndex];
    const totalImages = currentCarnival.images.length;

    return (
      <div className={styles.galleryOverlay} onClick={closeGallery}>
        <div className={styles.galleryModal} onClick={e => e.stopPropagation()}>
          {/* Enhanced Gallery Header */}
          <div className={styles.galleryHeader}>
            <div className={styles.galleryInfo}>
              <div className={styles.galleryTitle}>
                <span className={styles.carnivalIcon}>{currentCarnival.icon}</span>
                <h3>{currentCarnival.title}</h3>
                <span className={styles.galleryYear}>{currentCarnival.year}</span>
              </div>
              <div className={styles.galleryMeta}>
                <span className={styles.imageCounter}>
                  {currentImageIndex + 1} / {totalImages}
                </span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((currentImageIndex + 1) / totalImages) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={closeGallery}
              aria-label="Close gallery"
            >
              <span>✕</span>
            </button>
          </div>

          {/* Enhanced Gallery Content */}
          <div
            className={styles.galleryContent}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isLoading ? (
              <div className={styles.galleryLoader}>
                <div className={styles.loader}>
                  <div className={styles.loaderRing}></div>
                  <div className={styles.loaderRing}></div>
                  <div className={styles.loaderRing}></div>
                </div>
                <p>Loading amazing memories...</p>
              </div>
            ) : (
              <>
                {/* Enhanced Navigation Arrows */}
                <button
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevImage}
                  aria-label="Previous image"
                  disabled={currentImageIndex === 0}
                >
                  <span>‹</span>
                </button>

                {/* Enhanced Image Container */}
                <div className={styles.imageContainer}>
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className={styles.galleryImage}
                    loading="lazy"
                    onError={() => setImageLoadError(true)}
                    onLoad={() => setImageLoadError(false)}
                  />
                  {imageLoadError && (
                    <div className={styles.imageError}>
                      <Icon type="camera" size="large" />
                      <p>Unable to load image</p>
                    </div>
                  )}
                </div>

                <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextImage}
                  aria-label="Next image"
                  disabled={currentImageIndex === totalImages - 1}
                >
                  <span>›</span>
                </button>
              </>
            )}
          </div>

          {/* Enhanced Thumbnail Strip */}
          <div className={styles.thumbnailStrip}>
            <div className={styles.thumbnailContainer}>
              {currentCarnival.images.map((image, index) => (
                <button
                  key={image.id}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img src={image.src} alt={`Thumbnail ${index + 1}`} />
                  <div className={styles.thumbnailOverlay}>
                    <span>{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
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
              {[
                { id: 1, title: "Digital Innovation Handbook", year: "2025", color: "#2ec095" },
                { id: 2, title: "Tech Excellence Magazine", year: "2024", color: "#03624c" },
                { id: 3, title: "Future Leaders Journal", year: "2023", color: "#042222" }
              ].map((mag) => (
                <div key={mag.id} className={styles.magazineCard} style={{ '--accent-color': mag.color }}>
                  <div className={styles.magazineCover}>
                    <div className={styles.magazineGlow}></div>
                    <div className={styles.magazineContent}>
                      <div className={styles.magazineYear}>{mag.year}</div>
                      <h3>{mag.title}</h3>
                      <p>CSE Carnival Edition {mag.id}</p>
                      <div className={styles.magazineButton}>
                        <span>Read More</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Gallery Modal */}
      <GalleryModal />
    </div>
  );
};

export default Gallery;
