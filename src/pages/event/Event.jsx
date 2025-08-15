import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Event.module.css'; // Updated to use enhanced CSS
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { carnivalSegments, getAllSegments, getAllSegmentsByDate, getSegmentsByType } from '../../data/carnivalSegments';

// Import all 8 hero images from event page hero image gallery
import heroImg1 from '../../assets/images/event page hero image gallery/carnival_1_img_13.jpg';
import heroImg2 from '../../assets/images/event page hero image gallery/carnival_1_img_5.jpg';
import heroImg3 from '../../assets/images/event page hero image gallery/carnival_1_img_6.jpg';
import heroImg4 from '../../assets/images/event page hero image gallery/carnival_2_img_2.jpg';
import heroImg5 from '../../assets/images/event page hero image gallery/carnival_3_img_17.jpg';
import heroImg6 from '../../assets/images/event page hero image gallery/carnival_3_img_21.jpg';
import heroImg7 from '../../assets/images/event page hero image gallery/carnival_5_img_32.jpg';
import heroImg8 from '../../assets/images/event page hero image gallery/carnival_5_img_4.jpg';

// Import partner logos
import partner1 from '../../assets/images/partners/partner_1.png';
import partner2 from '../../assets/images/partners/partner_2.png';
import partner3 from '../../assets/images/partners/partner_3.png';
import partner4 from '../../assets/images/partners/partner_4.png';
import partner5 from '../../assets/images/partners/partner_5.png';
import partner6 from '../../assets/images/partners/partner_6.png';

const partners = [
  { id: 1, name: 'Partner 1', logo: partner1 },
  { id: 2, name: 'Partner 2', logo: partner2 },
  { id: 3, name: 'Partner 3', logo: partner3 },
  { id: 4, name: 'Partner 4', logo: partner4 },
  { id: 5, name: 'Partner 5', logo: partner5 },
  { id: 6, name: 'Partner 6', logo: partner6 },
];

// Updated heroImages array with all 8 images
const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6, heroImg7, heroImg8];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroCarousel}>
        <img
          src={heroImages[currentSlide]}
          alt="Event highlight"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Experience the Thrilling AUST CSE Carnival</h1>
          <p className={styles.heroSubtitle}>
            Join us for a week of excitement, innovation, and fun from August 20-28, 2025!
          </p>
          <Link to="/gallery" className={styles.heroButton}>
            Gallery <span className={styles.arrowIcon}>→</span>
          </Link>
        </div>
        <div className={styles.carouselDots}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventSchedule() {
  const [selectedTab, setSelectedTab] = useState('workshops');

  // Get sorted segments by type
  const getSortedSegmentsByType = (type) => {
    switch(type) {
      case 'workshops':
        return carnivalSegments.workshops.sort((a, b) => {
          const dateA = new Date(a.date.split(' - ')[0]);
          const dateB = new Date(b.date.split(' - ')[0]);
          return dateA - dateB;
        });
      case 'prelims':
        return carnivalSegments.prelims.sort((a, b) => {
          const dateA = new Date(a.date.split(' - ')[0]);
          const dateB = new Date(b.date.split(' - ')[0]);
          return dateA - dateB;
        });
      case 'main':
        return carnivalSegments.mainSegments.sort((a, b) => {
          const dateA = new Date(a.date.split(' - ')[0]);
          const dateB = new Date(b.date.split(' - ')[0]);
          return dateA - dateB;
        });
      default:
        return [];
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.split(' - ')[0]); // Handle date ranges
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFullDate = (dateString) => {
    if (dateString.includes(' - ')) {
      const [startDate, endDate] = dateString.split(' - ');
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return formatDate(dateString);
  };

  return (
    <section className={styles.schedule}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Event Roadmap</h2>
        <p className={styles.sectionSubtitle}>
          Follow the journey through AUST CSE Carnival 2025 - August 20-28, 2025
        </p>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            className={`${styles.tabButton} ${selectedTab === 'workshops' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('workshops')}
          >
            Workshops
          </button>
          <button
            className={`${styles.tabButton} ${selectedTab === 'prelims' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('prelims')}
          >
            Preliminaries
          </button>
          <button
            className={`${styles.tabButton} ${selectedTab === 'main' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('main')}
          >
            Main Events
          </button>
        </div>

        {/* Workshops Roadmap */}
        {selectedTab === 'workshops' && (
          <div className={styles.scheduleContent}>
            <h3 className={styles.scheduleTitle}>Workshops Roadmap</h3>
            <div className={styles.roadmapContainer}>
              <div className={styles.timelinePath}></div>
              {getSortedSegmentsByType('workshops').map((event, index) => (
                <div key={event.id} className={styles.roadmapEvent}>
                  <div className={styles.timelineNode}></div>
                  <Link to={`/segment/${event.id}`} className={styles.roadmapCard}>
                    <div className={styles.roadmapImage}>
                      <img src={event.image} alt={event.title} />
                      <div className={styles.eventTypeRoadmap}>{event.type}</div>
                    </div>
                    <div className={styles.roadmapContent}>
                      <div className={styles.eventDateRoadmap}>{formatFullDate(event.date)}</div>
                      <h4 className={styles.eventTitleRoadmap}>{event.title}</h4>
                      <p className={styles.eventDescriptionRoadmap}>{event.description}</p>
                      <div className={styles.eventDetailsRoadmap}>
                        <span className={styles.eventCategoryRoadmap}>{event.category}</span>
                        <span className={styles.eventTeamSizeRoadmap}>{event.registration.teamSize}</span>
                      </div>
                      <span className={styles.eventButtonRoadmap}>
                        Learn More →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prelims Roadmap */}
        {selectedTab === 'prelims' && (
          <div className={styles.scheduleContent}>
            <h3 className={styles.scheduleTitle}>Preliminary Events Roadmap</h3>
            <div className={styles.roadmapContainer}>
              <div className={styles.timelinePath}></div>
              {getSortedSegmentsByType('prelims').map((event, index) => (
                <div key={event.id} className={styles.roadmapEvent}>
                  <div className={styles.timelineNode}></div>
                  <Link to={`/segment/${event.id}`} className={styles.roadmapCard}>
                    <div className={styles.roadmapImage}>
                      <img src={event.image} alt={event.title} />
                      <div className={styles.eventTypeRoadmap}>{event.type}</div>
                    </div>
                    <div className={styles.roadmapContent}>
                      <div className={styles.eventDateRoadmap}>{formatFullDate(event.date)}</div>
                      <h4 className={styles.eventTitleRoadmap}>{event.title}</h4>
                      <p className={styles.eventDescriptionRoadmap}>{event.description}</p>
                      <div className={styles.eventDetailsRoadmap}>
                        <span className={styles.eventCategoryRoadmap}>{event.category}</span>
                        <span className={styles.eventTeamSizeRoadmap}>{event.registration.teamSize}</span>
                      </div>
                      <span className={styles.eventButtonRoadmap}>
                        Learn More →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Events Roadmap */}
        {selectedTab === 'main' && (
          <div className={styles.scheduleContent}>
            <h3 className={styles.scheduleTitle}>Main Events Roadmap</h3>
            <div className={styles.roadmapContainer}>
              <div className={styles.timelinePath}></div>
              {getSortedSegmentsByType('main').map((event, index) => (
                <div key={event.id} className={styles.roadmapEvent}>
                  <div className={styles.timelineNode}></div>
                  <Link to={`/segment/${event.id}`} className={styles.roadmapCard}>
                    <div className={styles.roadmapImage}>
                      <img src={event.image} alt={event.title} />
                      <div className={styles.eventTypeRoadmap}>{event.type}</div>
                    </div>
                    <div className={styles.roadmapContent}>
                      <div className={styles.eventDateRoadmap}>{formatFullDate(event.date)}</div>
                      <h4 className={styles.eventTitleRoadmap}>{event.title}</h4>
                      <p className={styles.eventDescriptionRoadmap}>{event.description}</p>
                      <div className={styles.eventDetailsRoadmap}>
                        <span className={styles.eventCategoryRoadmap}>{event.category}</span>
                        <span className={styles.eventTeamSizeRoadmap}>{event.registration.teamSize}</span>
                      </div>
                      <span className={styles.eventButtonRoadmap}>
                        Learn More →
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PartnersSection() {
  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Partners</h2>
        <div className={styles.partnersContainer}>
          <div className={styles.partnersTrack}>
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.id}-${index}`} className={styles.partnerCard}>
                <img src={partner.logo} alt={partner.name} className={styles.partnerLogo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Event() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.event}>
      <Header />
      <HeroSection />
        <PartnersSection />
        <EventSchedule />
      <Footer />
    </div>
  );
}

export default Event;
