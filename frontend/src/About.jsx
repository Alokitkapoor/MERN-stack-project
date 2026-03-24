import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About AlgoCycle</h2>
          <p className="section-subtitle">
            Your Personal Companion for Tracking Coding Progress, Task Management, and Daily Coding Practice.
          </p>
        </div>

        <div className="about-grid narrow">
          <div className="about-card card" style={{ 
            background: "#101c2e",
            }}>

            <h3 style={{color:"white"}}>Mission</h3>
            <p style={{color:"white"}}>
              To help programmers stay consistent, track coding challenges, manage tasks, and improve algorithmic problem-solving skills daily.
            </p>
          </div>
          <div className="about-card card" style={{ 
            background: "#101c2e",
            }}>
            <h3 style={{color:"white"}}>Vision</h3>
            <p style={{color:"white"}}>
              To be the go-to platform for coders worldwide to organize learning, track progress, and achieve coding mastery efficiently.
            </p>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-card card">
            <h3>Platform Overview</h3>
            <p>
              AlgoCycle allows users to create coding tasks, schedule them, and track completion. 
              It integrates a clean frontend with a secure backend, providing a responsive and dynamic experience.
            </p>
            <p>
              Users can log in, add tasks with deadlines, and monitor their progress. 
              Future features may include notifications, reminders, and analytics for performance improvement.
            </p>
          </div>

          <div className="about-card card">
            <h3>Core Features</h3>
            <ul className="about-list">
              <li>User authentication with JWT-based login/signup</li>
              <li>Create, read, update, and delete coding tasks</li>
              <li>Dynamic task refresh using polling (or WebSockets in future)</li>
              <li>Theme toggle (light/dark) for better user experience</li>
              <li>Responsive UI using React + Bootstrap</li>
            </ul>
          </div>

          <div className="about-card card">
            <h3>Technologies Used</h3>
            <ul className="about-list">
              <li>Frontend: React.js, Bootstrap, JavaScript</li>
              <li>Backend: Node.js, Express.js</li>
              <li>Database: MongoDB Atlas</li>
              <li>Authentication: JWT</li>
              <li>Hosting (future): Vercel / Render</li>
            </ul>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-card card">
            <h3>Why AlgoCycle?</h3>
            <ul className="about-list two-col">
              <li>Stay consistent with daily coding challenges</li>
              <li>Track tasks and deadlines efficiently</li>
              <li>Plan your coding journey step-by-step</li>
              <li>Visualize progress and improve productivity</li>
              <li>Simple, secure, and fast to use</li>
              <li>Responsive design for any device</li>
            </ul>
          </div>

          <div className="about-card card">
            <h3>Get Started</h3>
            <p>
              Sign up and start tracking your coding tasks today! Build consistency, monitor your improvement, and achieve your coding goals faster.
            </p>
            <div className="cta-actions">
              <a
                href="/signup"
                className="btn btn-primary"
              >
                Sign Up Now
              </a>
              <a
                href="/login"
                className="btn btn-light text-primary"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;