import React from 'react'
import './services.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import ortho from './1joint-replacement--orthopaedic.jpg'
import liver from './2liver--gastroenterology.jpg'
import gyno from './2obstetrics-and-gynecology.jpg'
import patho from './3pathology--laboratory-medicine.jpg'
import logo from './newlogo.jpg'

function Services() {
    return (
        <html>
            <head>
                <title>Trinity Hospital</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"></link>
            </head>
            <div>
                <h1 className="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Services</h1>
                <br /><br />
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="service-box">
                                <img className="rounded-circle serviceimage border border-opacity-10" src={ortho} alt='Orthopaedics Superspeciality' />
                                <h4>Orthopaedics Superspeciality</h4>
                                <p>With a focus on minimally invasive techniques and personalized treatment plans, our orthopedic experts deliver the highest quality care, helping patients regain mobility and independence.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="service-box">
                                <img className="rounded-circle serviceimage border border-opacity-10" src={liver} alt='Liver & Gastroenterology' />
                                <h4>Liver & Gastroenterology</h4>
                                <p>Our hospital offers exceptional expertise in liver and gastroenterology care, providing precise, compassionate solutions for digestive and liver-related conditions to ensure overall well-being.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="service-box">
                                <img className="rounded-circle serviceimage border border-opacity-10" src={gyno} alt='Obstetrics & Gynecology' />
                                <h4>Obstetrics & Gynecology</h4>
                                <p>Our hospital is a leader in obstetrics and gynecology, offering specialized care by renowned experts in women's health. We are dedicated to providing comprehensive services to support women.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="service-box">
                                <img className="rounded-circle serviceimage border border-opacity-10" src={patho} alt='Pathology & Laboratory Medicine' />
                                <h4>Pathology & Laboratory Medicine</h4>
                                <p>Our hospital excels in pathology and laboratory medicine, with a team of highly skilled pathologists and cutting-edge diagnostic technology. We deliver accurate and timely results, playing a vital role in patient care and treatment decisions.</p>
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
export default Services