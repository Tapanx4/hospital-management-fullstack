import React from "react";
//import { BrowserRouter as Link } from "react-router-dom";
import './about.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import logo from './newlogo.jpg'
import { useNavigate } from 'react-router-dom';



function About() {
    return (
        <html>
            <head>
                <title>Trinity Hospital</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"></link>
            </head>
            <body>
                <div>
                    <h1 className="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>About Hospital</h1>
                </div>
                <div className="section"><br/><br/>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div>
              <p className="intro">Welcome to <strong>Trinity Hospital</strong>, where compassionate care meets cutting-edge medicine. Our dedicated team of healthcare professionals is committed to providing the highest quality healthcare services in a patient-centered environment. At Trinity Hospital, your well-being is our top priority. With state-of-the-art facilities and a reputation for excellence, we offer a comprehensive range of medical specialties to address your healthcare needs. Whether you're seeking routine medical care or advanced treatments, trust Trinity Hospital to deliver exceptional healthcare tailored to you.</p>
              <h4 className="headings">Mission</h4>
              <p className="intro">At Trinity Hosp, we believe in the power of healing with heart. Our mission is to treat each patient with the warmth and care we would offer to our own families. We are dedicated to providing the best medical expertise, advanced technology, and unwavering support to guide you through your unique healthcare journey. Your health, your hope, our purpose."</p>
              <h4 className="headings">Our Infrastructure</h4>
              <ul className="intro">
                <li>Ultramodern class 100 operation theatre; laminar air flow; anti-bacterial, anti-fungal, anti-static Epoxy coatings on walls &amp; floor; Jointless surfaces (coving); Fully automated OT table.</li>
                <li>12000 square feet hygienic, elegant &amp; pleasant environment hospital with ample parking.</li>
                <li>Semi-deluxe, deluxe &amp; suite rooms &bull; Central oxygen supply &amp; fully automatic horizontal autoclave system.</li>
                <li>In house medical store &amp; pathology laboratory &bull; In house portable Xray (GE USA) &amp; CR system (Fuji Japan).</li>
                <li>OT ventilator, debrillator, 5 para monitors, electro-cautery &amp; suction.</li>
                <li>Free Wi-fi, RO water, CCTVs, computerized patient data record system.</li>
                <li>Stryker (USA) system G drill and reamer system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
            {/* Footer */}
            <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#d4efe8' }}>
                {/* Section: Social media */}
                <section className="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: '#52ae7f' }}>
                    {/* Left */}
                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div>
                        <a href="https://www.facebook.com/" className="text-white me-4">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D"
                            className="text-white me-4">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.google.com/" className="text-white me-4">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="https://www.instagram.com/" className="text-white me-4">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}
                {/* Section: Links */}
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <img className="logo" src={logo} alt="Trinity Hospital Logo" />
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold">Quick Links</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a  className="text-dark links">Home</a>
                                </p>
                                <p>
                                    <a className="text-dark links">Services</a>
                                </p>
                                <p>
                                    <a href="contact us.html" className="text-dark links">Contact us</a>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p><FontAwesomeIcon icon={faHome} className="mr-3" /> Opp. Marwadi Building, Nana Mava Main Road, Rajkot 360004</p>
                                <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> Contactus@gmail.com</p>
                                <p><FontAwesomeIcon icon={faPhone} className="mr-3" /> + 01 234 567 88</p>
                                <p><FontAwesomeIcon icon={faPrint} className="mr-3" /> + 01 234 567 89</p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links */}
                {/* Copyright */}
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright:Trinity Hospital
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </div>
            </body>
        </html>
    )
}
export default About