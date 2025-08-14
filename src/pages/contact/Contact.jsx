import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Icon from '../../components/common/Icon';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={styles.contact}>
      <Helmet>
        <title>Contact Us - AUST CSE Carnival</title>
        <meta name="description" content="Get in touch with AUST CSE Carnival team. Contact us for registration, sponsorship, or any inquiries." />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Contact Us</h1>
            <p className={styles.heroSubtitle}>
              Have questions? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.formContainer}>
                <h2 className={styles.sectionTitle}>Send us a Message</h2>
                <p className={styles.sectionSubtitle}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="registration">Event Registration</option>
                      <option value="sponsorship">Sponsorship Inquiry</option>
                      <option value="media">Media & Press</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      rows="6"
                      required
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className={styles.infoSection}>
              <div className={styles.infoContainer}>
                <h2 className={styles.sectionTitle}>Get in Touch</h2>
                <p className={styles.sectionSubtitle}>
                  Reach out to us through any of the following channels.
                </p>

                <div className={styles.contactInfo}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Icon type="location" size="large" />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Address</h3>
                      <p>
                        Ahsanullah University of Science and Technology<br />
                        141-142 Love Road, Tejgaon<br />
                        Dhaka-1208, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Icon type="phone" size="large" />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Phone</h3>
                      <p>+880 1890-430560</p>
                      <p>+880 1732-395364</p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Icon type="email" size="large" />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Email</h3>
                      <p>austcsecarnival@gmail.com</p>
                      <p>rakib.cse.20210204027@aust.edu</p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Icon type="web" size="large" />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Social Media</h3>
                      <div className={styles.socialLinks}>
                        <a href="https://facebook.com/austcsecarnivalofficial" className={styles.socialLink}>Facebook</a>
                        <a href="https://wa.me/8801890430560" className={styles.socialLink}>WhatsApp</a>
                        <a href="https://youtube.com/playlist?list=PL5qPo7BnQjCBElhY9ciX6k3cP_-c-awzv&si=amj90SjwH3JjN798" className={styles.socialLink}>YouTube</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Card */}
                <div className={styles.quickContact}>
                  <h3>Need Quick Help?</h3>
                  <p>For urgent inquiries, contact our event coordinator directly:</p>
                  <div className={styles.coordinatorInfo}>
                    <strong>Event Coordinator</strong>
                    <p>Phone: +880 1890-430560</p>
                    <p>Email: rakib.cse.20210204027@aust.edu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Find Us</h2>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8979305905436!2d90.38885731536328!3d23.750892294594845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a2d0f6d6d7%3A0x5f1b9b6f5f1b9b6f!2sAhsanullah%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1635123456789!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AUST Location"
                className={styles.map}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
