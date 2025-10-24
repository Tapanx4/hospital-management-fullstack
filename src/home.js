import React from 'react'
import './home.css'
import bootstrap from 'bootstrap'
import icu1 from './icu1.jpg'
import icu2 from './icu2.jpg'
import proom from './proom.jpg'
import reception from './reception.jpg'
import building from './bulding.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import logo from './newlogo.jpg'

function Home() {
return (
<html>
    <head>
        <title>
            Trinity Hospital
        </title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"></link>
    </head>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={icu1} className="d-block" style={{ height: '522px', width: '1370px' }} alt="icu" />
                </div>
                <div className="carousel-item">
                    <img src={icu2} className="d-block w-100" style={{ height: '522px' }} alt="equiment" />
                </div>
                <div className="carousel-item">
                    <img src={proom} className="d-block w-100" style={{ height: '522px' }} alt="private room" />
                </div>
                <div className="carousel-item">
                    <img src={reception} className="d-block w-100" alt="reception" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className="container mt-4">
      <div className="row">
        {/* Text Column */}
        <div className="col-sm-6">
          <h1>
            <span>Welcome to <br /></span>
            <p className="text-success">Trinity Hospital</p>
          </h1>
          <div className="text-desc ">
            <p><strong>Trinity Hospital</strong>, located in one of the fastest developing cities in Saurashtra - Rajkot, is an epitome of healthcare providing facility. We have state-of-the-art infrastructure and equipment to deliver healthcare services in the fields of Orthopaedics, Gynecology & Obstetrics, and Pathology & Laboratory Science. The hospital has a well-trained and experienced team of doctors. We have well-trained, well-mannered, polite & enthusiastic nursing and backup staff. We treat all ailments related to bones & joints, pregnancy & woman care. We also perform a majority of pathology investigations in our most advanced laboratory.</p>
          </div>
        </div>
        {/* Image Column */}
        <div className="col-sm-6 d-flex justify-content-center align-items-center">
          <img src={building} className="img-fluid" style={{ maxWidth: '500px', height: 'auto' }} alt="building" />
        </div>
      </div>
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div className="whyus2">
      <div className="container">
        <div className="whyusbg">
          <div className="text-desc clearfix row">
            <div className="col-sm-6" style={{ paddingLeft: '55px' }}>
              <h4>General Facilities</h4>
              <ul>
                <li>12000 sq ft hygienic, elegant, pleasant environment hospital with ample parking</li>
                <li>Semi-deluxe, deluxe &amp; suite rooms</li>
                <li>Central Oxygen supply</li>
                <li>Fully automated OT table</li>
                <li>Computerized patient data records system</li>
                <li>In house medical store</li>
              </ul>
              <h4>Orthopedic Facilities</h4>
              <ul>
                <li>Ultramodern <strong>CLASS 100</strong> Joint Replacement OT</li>
                <li>GE (USA) portable X-ray machine</li>
                <li>Fuji (Japan) digital CR (X-ray) system</li>
                <li>Fully automated horizontal autoclave system</li>
                <li>Allengers (India) 9&rdquo; imageplus IITV</li>
                <li>OT ventilator, defibrillator, 5 para monitor, electro-cautery &amp; suction</li>
                <li>Stryker(US) System G Drill</li>
                <li>Stryker (US) Latest Arthroscopy Camera System</li>
                <li>Operating Microscope with motorized fine focusing &amp;amp; beam splitter for assistant view</li>
                <li>GI Endoscopy System</li>
              </ul>
            </div>
            <div className="col-sm-6" style={{ paddingLeft: '55px' }}>
              <h4>Gynecology Facilities</h4>
              <ul>
                <li>GE (USA) LOGIQ V5 sonography with 3D/4D probes</li>
                <li>Dedicated Gynec Operation Theatre with laparoscopy system</li>
                <li>Labour room &amp; New born care area</li>
              </ul>
              <h4>Laboratory Facilities</h4>
              <ul>
                <li>Well-equipped pathology laboratory</li>
                <li>Erba (Germany) chem 7 biochemistry analyzer</li>
                <li>Sysmex (Japan) XP-100 3 part hematology analyzer</li>
                <li>Carl Zeiss (Germany) primostar microscope</li>
                <li>Computerized reporting also available on email &amp; whatsapp</li>
                <li>Home &amp; bedside sample collection facility</li>
              </ul>
            </div>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
    <div className="section2 funfact">
      <div className="container">
        <div className="clearfix row">
          <div className="col-sm-4 funfact-box">
            <h3>12000</h3>
            <p>Area (Sq.ft.)</p>
          </div>
          <div className="col-sm-4 funfact-box">
            <h3>2</h3>
            <p>Modular OT</p>
          </div>
          <div className="col-sm-4 funfact-box">
            <h3>16</h3>
            <p>Indoor Bed</p>
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
                                    <a href="home.html" className="text-dark links">Home</a>
                                </p>
                                <p>
                                    <a href="services.html" className="text-dark links">Services</a>
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
</html>
)
}
export default Home