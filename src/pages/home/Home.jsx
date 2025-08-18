import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import styles from './Home.module.css';

// Import images properly for Vite
import titleSponsor from '../../assets/images/title_sponsor.jpg';
import heroImg1 from '../../../public/images/home_hero/home_hero_image1.png';
import heroImg2 from '../../../public/images/home_hero/home_hero_image2.png';
import heroImg3 from '../../../public/images/home_hero/home_hero_image3.png';
import heroImg4 from '../../../public/images/home_hero/home_hero_image4.png';
import organizerLogo from '../../assets/images/organizer and supporter/organizer_cse_society.png';
import SupporoterLogo from '../../assets/images/organizer and supporter/supporter_operand.png';
import coSupporoterLogo from '../../assets/images/organizer and supporter/co_supporter_perceptron.jpg';

const faqs = [
  {
    id: 1,
    question: "Who can participate in the carnival?",
    answer: "This event is only for AUST students. Students from other universities are not eligible to participate."
  },
  {
    id: 2,
    question: "Is there any registration fee?",
    answer: "Some segments have a registration fee, while others are completely free. Details will be mentioned for each segment during registration."
  },
  {
    id: 3,
    question: "What kind of segments will be there?",
    answer: "The carnival will feature multiple exciting segments, including Programming Contests, Hackathons, UI/UX Competitions, Workshops, and more."
  },
  {
    id: 4,
    question: "How do I register for a segment?",
    answer: "Registration links for each segment will be shared on the official AUST CSE Carnival 6.0 page along with guidelines."
  },
  {
    id: 5,
    question: "Can I participate in more than one segment?",
    answer: "Yes! You can register for multiple segments as long as the schedules don’t clash."
  },
  {
    id: 6,
    question: "What do winners get?",
    answer: "Winners will receive prize money, crests, and other exclusive benefits based on the segment they participate in."
  }
];

function FAQSection() {
  const [expandedId, setExpandedId] = useState(1);

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <h2 className={styles.sectionTitleFAQ}>Frequently asked questions</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to know about the sponsorship and billing.
          </p>
        </div>
        <div className={styles.faqList}>
          {faqs.map(faq => (
              <div
                  key={faq.id}
                  className={`${styles.faqItem} ${expandedId === faq.id ? styles.expanded : ''}`}
              >
                <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={expandedId === faq.id}
                >
                  {faq.question}
                  <span className={styles.faqIcon}>{expandedId === faq.id ? '−' : '+'}</span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}

const Home = () => {
  console.log('Home component rendering...'); // Debug log

  return (
    <div className={styles.home}>
      {/* Use existing Header component */}
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Experience the Thrilling AUST CSE Carnival
            </h1>
            <p className={styles.heroSubtitle}>
              Join us for a week of innovation, competition, and fun!
            </p>
            <div className={styles.heroButtons}>
              <Link to="/event" className={styles.btnPrimary}>Learn More</Link>
              <Link to="https://www.facebook.com/share/1B4Pjifngd/" className={styles.btnSecondary}>Register Now</Link>
            </div>
          </div>

          <div className={styles.heroImageSection}>
            <div className={styles.heroImageGrid}>
              <img src={heroImg1} alt="Hero Image 1" className={styles.heroImg} />
              <img src={heroImg2} alt="Hero Image 2" className={styles.heroImg} />
              <img src={heroImg3} alt="Hero Image 3" className={styles.heroImg} />
              <img src={heroImg4} alt="Hero Image 4" className={styles.heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className={styles.discover}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Experience the Thrills of AUST CSE Carnival
          </h2>
          <p className={styles.sectionDescription}>
            Immerse yourself in a world of technology, innovation, and competition. Our carnival brings together the brightest minds in computer science for an unforgettable experience.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon type="calendar" size="xlarge" />
              </div>
              <h3 className={styles.featureTitle}>Main Events</h3>
              <p className={styles.featureDescription}>Experience exciting programming contests, hackathons, and technical competitions that challenge your skills.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon type="graduation" size="xlarge" />
              </div>
              <h3 className={styles.featureTitle}>Workshops</h3>
              <p className={styles.featureDescription}>Learn from industry experts through hands-on workshops covering latest technologies and best practices.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon type="trophy" size="xlarge" />
              </div>
              <h3 className={styles.featureTitle}>Activities</h3>
              <p className={styles.featureDescription}>Participate in fun activities, networking sessions, and cultural events throughout the carnival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            Join the exciting CSE Carnival!
          </h2>
          <div className={styles.ctaButtons}>
            <Link to="/event" className={styles.btnPrimary}>Explore Events</Link>
            <Link to="/contact" className={styles.btnOutline}>Get Involved</Link>
          </div>
        </div>
      </section>

      {/* Title Sponsor Section */}
      <section className={styles.titleSponsor}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Our Title Sponsor HAVIT
          </h2>
          <div className={styles.sponsorContent}>
            <div className={styles.sponsorLogo}>
              <img src={titleSponsor} alt="Habit Logo" />
            </div>
            <div className={styles.sponsorInfo}>
              <h3>HAVIT Bangladesh</h3>
              <p>
                Founded in 1998, HAVIT is a global consumer tech brand that integrates R&D, industrial design, large-scale production, and global omnichannel marketing. It encompasses audio devices, gaming gears, mobile accessories, and smart life electronic products.
                <br/><br/>
                Welcome to HAVIT Bangladesh. Our vision is Exploring innovative technology and providing smart, aesthetic and functional products to service users in Bangladesh. Applying innovative technology to empower everyone to become fun creators of a better life. Explore and Innovate; Strive and Undertake.
              </p>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Link to="https://havit.com.bd/" className={styles.btnSecondary} >HAVIT BD</Link>
              <Link to="https://havitsmart.com/" className={styles.btnSecondary}>HAVIT Smart</Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Organizer Section - CORRECTED */}
      <section className={styles.organizer}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Event Organizers
          </h2>
          <div className={styles.organizerGrid}>
            <div className={styles.organizerCard}>
              <div className={styles.organizerLogo}>
                <img src={organizerLogo} alt="AUST CSE Society Logo" />
              </div>
              <div className={styles.organizerContent}>
                <h3>Organized by</h3>
                <h4>AUST CSE Society</h4>
                <p>
                  The AUST CSE Society is a central platform for fostering academic excellence, advancing technical skills, and strengthening community engagement within the CSE Department of Ahsanullah University of Science and Technology (AUST). Through seminars, workshops, competitions, and cultural programs, it provides diverse opportunities for students to learn, innovate, and collaborate. By facilitating connections with industry professionals and alumni, the society effectively bridges the gap between academic study and practical application.
                </p>
              </div>
            </div>

            <div className={styles.organizerCard}>
              <div className={styles.organizerLogo}>
                <img src={SupporoterLogo} alt="Operand Logo" />
                <img src={coSupporoterLogo} alt="Perceptron Logo" />
              </div>
              <div className={styles.organizerContent}>
                <h3>Supported by</h3>
                <h4>Operand 48 & Perceptron 53</h4>
                <p>
                  Operand 48 and Perceptron 53 are two dynamic batches of the CSE department, united by their passion for technology and innovation. Dedicated to cultivating computational thinking, problem-solving skills, and technical excellence, they work together to inspire and guide their peers. Through organising programming contests, hands-on workshops, hackathons, and educational events, they want to create a vibrant tech community where learning is exciting and collaboration is key.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use existing Footer component */}
        <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
