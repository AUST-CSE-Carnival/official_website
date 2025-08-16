import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import styles from './ImageViewer.module.css';
import { carnivalData } from '../../data/galleryData';

const ImageViewer = () => {
  const { carnivalId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Decode the URL-safe carnival ID back to original format (replace dashes with dots)
  const decodedCarnivalId = carnivalId ? carnivalId.replace(/-/g, '.') : null;

  // Get current carnival data using the decoded ID
  const currentCarnival = carnivalData[decodedCarnivalId];

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  // Auto-hide controls on mobile after 3 seconds
  useEffect(() => {
    if (!isMobile) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, isMobile]);

  // Show controls when user interacts
  const showControlsTemporarily = () => {
    if (isMobile) {
      setShowControls(true);
      setTimeout(() => setShowControls(false), 3000);
    }
  };

  // Redirect if carnival doesn't exist
  useEffect(() => {
    if (!currentCarnival) {
      console.log('Carnival not found for ID:', decodedCarnivalId, 'Available IDs:', Object.keys(carnivalData));
      navigate('/gallery');
      return;
    }
  }, [currentCarnival, navigate, decodedCarnivalId]);

  // Get image index from URL params
  useEffect(() => {
    const imageIndex = parseInt(searchParams.get('image')) || 0;
    if (imageIndex >= 0 && imageIndex < currentCarnival?.images?.length) {
      setCurrentImageIndex(imageIndex);
    }
  }, [searchParams, currentCarnival]);

  // Update URL when image changes
  const updateImageIndex = useCallback((index) => {
    setIsLoading(true);
    setCurrentImageIndex(index);
    setSearchParams({ image: index.toString() });

    // Preload next and previous images
    if (currentCarnival) {
      const nextIndex = index < currentCarnival.images.length - 1 ? index + 1 : 0;
      const prevIndex = index > 0 ? index - 1 : currentCarnival.images.length - 1;

      [nextIndex, prevIndex].forEach(preloadIndex => {
        const img = new Image();
        img.src = currentCarnival.images[preloadIndex].src;
      });
    }

    setTimeout(() => setIsLoading(false), 300);
  }, [setSearchParams, currentCarnival]);

  // Navigation functions
  const nextImage = useCallback(() => {
    if (currentCarnival) {
      const nextIndex = currentImageIndex < currentCarnival.images.length - 1
        ? currentImageIndex + 1
        : 0;
      updateImageIndex(nextIndex);
    }
  }, [currentImageIndex, currentCarnival, updateImageIndex]);

  const prevImage = useCallback(() => {
    if (currentCarnival) {
      const prevIndex = currentImageIndex > 0
        ? currentImageIndex - 1
        : currentCarnival.images.length - 1;
      updateImageIndex(prevIndex);
    }
  }, [currentImageIndex, currentCarnival, updateImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          navigate('/gallery');
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
        case 'f':
        case 'F':
          setIsFullscreen(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, nextImage, prevImage]);

  // Enhanced touch/swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [touchDistance, setTouchDistance] = useState(0);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchDistance(0);
    showControlsTemporarily();
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    setTouchDistance(touchStart - currentTouch);
  };

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75;  // Increased threshold for more deliberate swipes
    const isRightSwipe = distance < -75;

    if (isLeftSwipe) nextImage();
    else if (isRightSwipe) prevImage();

    setTouchDistance(0);
  }, [touchStart, touchEnd, nextImage, prevImage]);

  // Double tap to toggle fullscreen on mobile
  const [lastTap, setLastTap] = useState(0);
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      setIsFullscreen(prev => !prev);
    } else {
      setLastTap(now);
    }
  };

  // Return early if no carnival data
  if (!currentCarnival) {
    return null;
  }

  const currentImage = currentCarnival.images[currentImageIndex];
  const totalImages = currentCarnival.images.length;

  return (
    <div className={`${styles.imageViewerPage} ${isFullscreen ? styles.fullscreen : ''} ${isMobile ? styles.mobile : ''}`}>
      {!isFullscreen && <Header />}

      <main className={styles.main}>
        {/* Mobile-optimized Header */}
        {(!isMobile || showControls) && (
          <div className={`${styles.viewerHeader} ${!showControls ? styles.hidden : ''}`}>
            <div className={styles.headerLeft}>
              <button
                className={styles.backButton}
                onClick={() => navigate('/gallery')}
                aria-label="Back to gallery"
              >
                <Icon type="arrow-left" size="medium" />
                {!isMobile && <span>Back to Gallery</span>}
              </button>
            </div>

            <div className={styles.headerCenter}>
              <div className={styles.carnivalInfo}>
                <span className={styles.carnivalIcon}>{currentCarnival.carnivalNumber}</span>
                {!isMobile && <h1 className={styles.carnivalTitle}>{currentCarnival.title}</h1>}
                <span className={styles.carnivalYear}>{currentCarnival.year}</span>
              </div>
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {totalImages}
              </div>
            </div>

            <div className={styles.headerRight}>
              <button
                className={styles.fullscreenButton}
                onClick={() => setIsFullscreen(prev => !prev)}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Icon type={isFullscreen ? "minimize" : "maximize"} size="medium" />
              </button>
            </div>
          </div>
        )}

        {/* Main Image Container with enhanced mobile support */}
        <div
          className={styles.imageContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={isMobile ? showControlsTemporarily : undefined}
          onDoubleClick={isMobile ? handleDoubleTap : undefined}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}

          {/* Swipe indicator */}
          {isMobile && Math.abs(touchDistance) > 30 && (
            <div className={`${styles.swipeIndicator} ${touchDistance > 0 ? styles.swipeLeft : styles.swipeRight}`}>
              <Icon type={touchDistance > 0 ? "chevron-left" : "chevron-right"} size="large" />
            </div>
          )}

          {/* Navigation Arrows - Hidden on mobile by default */}
          {(!isMobile || showControls) && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevImage}
                aria-label="Previous image"
              >
                <Icon type="chevron-left" size="large" />
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextImage}
                aria-label="Next image"
              >
                <Icon type="chevron-right" size="large" />
              </button>
            </>
          )}

          {/* Image Display */}
          <div className={styles.imageWrapper}>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`${styles.mainImage} ${touchDistance !== 0 ? styles.swiping : ''}`}
              style={{
                transform: touchDistance !== 0 ? `translateX(${-touchDistance * 0.3}px)` : 'none'
              }}
              loading="eager"
              onError={() => setImageLoadError(true)}
              onLoad={() => setImageLoadError(false)}
            />
            {imageLoadError && (
              <div className={styles.imageError}>
                <Icon type="camera" size="xxlarge" />
                <p>Unable to load image</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile-optimized Thumbnail Strip */}
        {(!isMobile || showControls) && !isFullscreen && (
          <div className={`${styles.thumbnailStrip} ${!showControls ? styles.hidden : ''}`}>
            <div className={styles.thumbnailContainer}>
              {currentCarnival.images.map((image, index) => (
                <button
                  key={image.id}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => updateImageIndex(index)}
                >
                  <img src={image.src} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                  <div className={styles.thumbnailOverlay}>
                    <span>{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentImageIndex + 1) / totalImages) * 100}%` }}
          />
        </div>
      </main>

      {!isFullscreen && <Footer />}

      {/* Mobile Instructions */}
      {isMobile && !showControls && (
        <div className={styles.mobileInstructions}>
          <p>Tap to show controls • Swipe to navigate • Double tap for fullscreen</p>
        </div>
      )}

      {/* Desktop Keyboard Shortcuts Info */}
      {!isMobile && (
        <div className={styles.shortcutsInfo}>
          <p>Use ← → arrow keys to navigate • Press F for fullscreen • ESC to go back</p>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
