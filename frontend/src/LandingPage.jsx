import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
// import "./css/landingwhite.css"; 
// import "./css/landingdark.css";
import About from "./About"; 
import './About.css';

import Footer from "./Footer"
import "./Footer.css"

// Note -> Do not write import up here it will directly override if you want
// to load css dynamically  

import people from "./assets/people.png";
import right from "./assets/right.png";
import left from "./assets/left.png";
import sample1 from "./assets/sample1.png";
import icon from "./assets/icon.png";

const LandingPage = () => {
  // STRICT RULE -> hooks must be called at the top ( very beginning )
  // yeh sbb applications hain useState function ke
  
  const [theme, setTheme] = useState("w");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  // use navigate is the hook 
  // useNavigate() rturn a function 
  // which is not stored in the navigate 
  // we can now use it form routing to multiple pages
  // of our site

  // theme toggle logic ------------------->>
  const toggleTheme = () => {
    const nextTheme = theme === "w" ? "d" : "w"; // fixed logic
    setTheme(nextTheme); // set theme is the function

    const link = document.getElementById("theme");
    if (link) {
      link.setAttribute(
        "href",
        nextTheme === "w" ? "/css/landingwhite.css" : "/css/landingdark.css"
      );
    }
  };

  // logic so that both the overlays do not appear simultaneiousl

  // Sign In submit logic ------------------------------>
  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = e.target.eml.value;
    const username = e.target.unm.value;
    const password = e.target.pwd.value;

    if (!email || !username || !password) {
      alert("Please enter all details");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the backend returns an error
        alert(data.message || "Signup failed");
        return;
      }

      // Save token and username for session
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      alert("Registered Successfully");
      setOverlayOpen(false); // close overlay
      navigate("/main");     // go to main dashboard

    } catch (err) {
      // Now err is correctly defined
      alert("Server error. Please try again later.");
      console.error("Signup Error:", err);
    }
  };

  // Login submit logic --------------------------------->
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) return alert("Please enter all details");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }), // backend login uses email
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      alert(`Welcome back ${data.user.username}`);
      setLoginOpen(false);
      navigate("/main");
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <>
      {/* theme link */}
      <link id="theme" rel="stylesheet" href="/css/landingwhite.css" />

      {/* Background layers */}
      <div className="animated-bg"></div>
      <div>
        <img className="dots-layer" alt="" />
      </div>
      <div className="grid-layer"></div>

      {/* Navbar */}
      <nav className="navbar custom-navbar">
        <div className="container-fluid navbar-content d-flex justify-content-between align-items-center">
          <span className="navbar-brand fw-bold">AlgoCycle</span>

          <div className="d-none d-lg-flex justify-content-center">
            <div className="glass-search d-flex">
              <input type="text" className="search-input" placeholder="Search" />
              <button className="search-btn">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              id="modeToggle"
              onClick={toggleTheme}
              className="btn btn-outline-light p-2"
            >
              <i className={`bi ${theme === "w" ? "bi-moon-fill" : "bi-sun-fill"}`}></i>
            </button>

            <div className="dropdown d-lg-none">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="navMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end bg-dark text-light"
                aria-labelledby="navMenu"
              >
                <li>
                  <a
                    className="dropdown-item text-light"
                    href="#"
                    onClick={() => { if (!loginOpen) setOverlayOpen(true);}}
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-light"
                    href="#"
                    onClick={() => {if (!overlayOpen) setLoginOpen(true); }}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>

            {/* the if conditions written in the onClick function is so that
            both the over lays do not open simulataneiously */}
            
            <div className="d-none d-lg-flex gap-2">
              <button
                className="btn btn-primary fw-bold"
                onClick={() => { if (!loginOpen) setOverlayOpen(true);}}
              >
                Sign In
              </button>
              <button
                className="btn btn-light text-primary fw-bold"
                onClick={() => {if (!overlayOpen) setLoginOpen(true); }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <div className="hero-section text-center" style={{ display: "flex", flexDirection: "column" }}>
        <div className="hero-content">
          <div>
            <img src={people} alt="AlgoCycle Logo" className="hero-logo" />
          </div>
          <div>
            <h6 className="trust" style={{
              fontFamily: "sans-serif",
              marginTop: "-5vh",
              marginBottom: "4vh",
              fontSize: "1vw"
            }}><span style={{color: "#f37c5a"}}>{"{"}</span> Trusted by 1M+ users across the glode<span style={{color: "#f37c5a"}}> {"}"} </span></h6>
          </div>
        </div>

        <div className="hero-text">
          <h1 className="hero-title" style={{ marginTop: "-1vw" }}>
            Having Hard Times Retaining?
          </h1>
          <h1 className="hero2">
            <span>Your Best Companion, Got Your Back</span>
          </h1>
          <br></br>
          <p className="hero-subtitle">
            Track your progress with AlgoCycle, manage your coding revisions, and organize tasks efficiently. Stay focused, monitor your improvements, and streamline your preparation for coding challenges.
          </p>
          <div className="hero-buttons mt-4">
            <button
            style={{ fontSize: "1rem", backgroundColor: "#1d1e23", padding: "0.8rem 2rem", borderRadius: "12px", fontWeight: "600" }}

            className="btn btn-primary btn-lg me-3" onClick={() => setOverlayOpen(true)}>
              Sign In to Continue
            </button>
            <button 
            style={{ fontSize: "1rem", backgroundColor: "white", padding: "0.8rem 2rem", borderRadius: "12px", fontWeight: "600" }}

            className="btn btn-light btn-lg text-primary" onClick={() => setLoginOpen(true)}>
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Overlay */}
      {overlayOpen && (
        <div id="overlay" className="overlay active">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setOverlayOpen(false)}>&times;</span>
            <div className="icon-container">
              <img src={icon} alt="icon" className="blip-icon" />
            </div>
            <h2>Sign In</h2>
            <form className="signin-form" onSubmit={handleSignIn}>
              <input id="eml" name="eml" type="email" placeholder="Email" required />
              <input id="unm" name="unm" type="text" placeholder="Username" required />
              <input id="pwd" name="pwd" type="password" placeholder="Password" required />
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Login Overlay */}
      {loginOpen && (
        <div id="oy" className="overlay active">
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setLoginOpen(false)}>&times;</span>
            <div className="icon-container">
              <img src={icon} alt="icon" className="blip-icon" />
            </div>
            <h2>Login</h2>
            <form className="signin-form" onSubmit={handleLogin}>
              <input name="username" type="text" placeholder="Username" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      )}

      <About />
      <Footer />
    </>
  );
}


export default LandingPage;