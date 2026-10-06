import React from 'react';
import './App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">◎ LocalLink</div>
    <ul className="nav-links">
      <li>Home</li>
      <li>Services</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
    <button className="btn-yellow">Emergency Service</button>
  </nav>
);

const Hero = () => (
  <header className="hero-section">
    <Navbar />
    <div className="hero-content">
      <h1>Reliable Handyman<br/>Services for<br/>Home Repair</h1>
      <p>Don't just find a service provider. Find the right one, understand the expected price, and know who you can trust.</p>
      <div className="hero-buttons">
        <button className="btn-yellow">Book Now</button>
        <button className="btn-outline">Our Services</button>
      </div>
    </div>
  </header>
);

const StatsBar = () => (
  <div className="stats-container">
    <div className="stats-card">
      <div className="stat-item"><span className="yellow-circle">1</span> <b>92/100</b> Trust Score Avg</div>
      <div className="stat-item"><span className="yellow-circle">2</span> <b>10,000+</b> Jobs Completed</div>
      <div className="stat-item"><span className="yellow-circle">3</span> <b>24/7</b> Emergency Support</div>
    </div>
  </div>
);

const ServicesGrid = () => (
  <section className="services-section">
    <h2>Discover Our Services</h2>
    <p>Find trusted local professionals categorized for your convenience.</p>
    <div className="services-grid">
      {/* Map through your services here */}
      <div className="service-card">
        <div className="card-image bg-plumbing"></div>
        <h3>Plumbing</h3>
      </div>
      <div className="service-card">
        <div className="card-image bg-electrical"></div>
        <h3>Electrical</h3>
      </div>
      <div className="service-card">
        <div className="card-image bg-carpentry"></div>
        <h3>Carpentry</h3>
      </div>
    </div>
  </section>
);

const BookingPromo = () => (
  <section className="booking-promo">
    <div className="promo-left">
      <h2>Book Your Trusted<br/>Local Expert Today</h2>
      <ul className="promo-list">
        <li><span className="icon-yellow">$</span> Transparent Fair Price Estimator</li>
        <li><span className="icon-yellow">★</span> Verified Trust Scores</li>
        <li><span className="icon-yellow">⚡</span> Fast Emergency Mode</li>
      </ul>
    </div>
    <div className="promo-right yellow-card">
      <h2>Book a Handyman</h2>
      <div className="booking-form-mockup">
        <div className="mock-input">Select Your Issue</div>
        <div className="mock-input">Enter Locality</div>
        <button className="btn-dark-blue">Find Providers</button>
      </div>
    </div>
  </section>
);

function App() {
  return (
    <div className="app-container">
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <BookingPromo />
    </div>
  );
}

export default App;