// import React from 'react'
// import './contact.css'
// import logo from './newlogo.jpg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';


// function Contact() {
//     return (
//         <html>
//              <head>
//             <title>Trinity Hospital</title>

//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></link>
//                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"></link>
//                     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

//     </head>

//             <div>
//                 <h1 class="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Contact Us</h1>
//             </div><br /><br />
//             <div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-4 col-md-12 col-sm-12">
//                             <div className="box">
//                                 <br /><br />
//                                 <ul className="bxtxt">
//                                     <li>
//                                         <h4 style={{ fontWeight: 700, fontSize: '30px' }}>
//                                             Trinity Hospital
//                                         </h4>
//                                     </li>
//                                     <li>
//                                         <p>
//                                             <i className="fas fa-map-marker-alt"></i>
//                                             <span>   Opp. Marwadi Building,<br />
//                                                 &nbsp;&nbsp;&nbsp;&nbsp;Nana Mava Main Road, <br />
//                                                 &nbsp;&nbsp;&nbsp;&nbsp;Rajkot 360004</span>
//                                         </p>
//                                     </li>
//                                     <li>
//                                         <p>
//                                             <i className="fas fa-mobile-alt"></i>
//                                             <span> + 01 234 567 88<br />&nbsp;&nbsp;&nbsp;&nbsp;+ 01 234 567 89</span>
//                                         </p>
//                                     </li>
//                                     <li>
//                                         <p>
//                                             <i className="fas fa-envelope-open"></i>
//                                             <span>    Contactus@gmail.com</span>
//                                         </p>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-md-7 offset-md-1">
//                             <h2 style={{ fontWeight: 'bolder', fontSize: '45px' }}>
//                                 Send a Message
//                             </h2>
//                             <div className="row form">
//                                 <div className="error-message">
//                                     <div className="alert alert-danger" style={{ display: 'none' }}>
//                                     </div>
//                                 </div>
//                                 <span style={{ display: 'none' }}></span>
//                             </div>
//                             <form className="form-group">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <input name="Name" type="text" placeholder="Name" className="form-control" required />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <input name="Subject" type="text" placeholder="Subject" className="form-control" required />
//                                     </div>
//                                 </div><br />
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <input name="ContactNo" type="number" id="ContactNo" placeholder="Contact No" className="form-control" required />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <input name="Email" type="email" placeholder="Email" className="form-control" required />
//                                     </div>
//                                 </div><br />
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <textarea name="Message" rows="2" placeholder="Message" className="form-control"></textarea>
//                                     </div>
//                                 </div><br />
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <input type="submit" name="Query" value="Send Enquiry" className="btn btn-primary" />
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div><br /><br /> <br /><br />
//             <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14758.549092998952!2d70.7757611!3d22.367321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c972761ce515%3A0x3651e3fe1e9df4f8!2sMarwadi%20University!5e0!3m2!1sen!2sin!4v1697290707673!5m2!1sen!2sin"
//                 width="100%" height="300"
//                 style={{ border: '0' }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//         <div>
//             {/* Footer */}
//             <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#d4efe8' }}>
//                 {/* Section: Social media */}
//                 <section className="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: '#52ae7f' }}>
//                     {/* Left */}
//                     <div className="me-5">
//                         <span>Get connected with us on social networks:</span>
//                     </div>
//                     {/* Left */}
//                     {/* Right */}
//                     <div>
//                         <a href="https://www.facebook.com/" className="text-white me-4">
//                             <FontAwesomeIcon icon={faFacebook} />
//                         </a>
//                         <a href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D"
//                             className="text-white me-4">
//                             <FontAwesomeIcon icon={faTwitter} />
//                         </a>
//                         <a href="https://www.google.com/" className="text-white me-4">
//                             <FontAwesomeIcon icon={faGoogle} />
//                         </a>
//                         <a href="https://www.instagram.com/" className="text-white me-4">
//                             <FontAwesomeIcon icon={faInstagram} />
//                         </a>
//                     </div>
//                     {/* Right */}
//                 </section>
//                 {/* Section: Social media */}
//                 {/* Section: Links */}
//                 <section className="">
//                     <div className="container text-center text-md-start mt-5">
//                         {/* Grid row */}
//                         <div className="row mt-3">
//                             {/* Grid column */}
//                             <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
//                                 <img className="logo" src={logo} alt="Trinity Hospital Logo" />
//                             </div>
//                             {/* Grid column */}
//                             {/* Grid column */}
//                             <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
//                                 {/* Links */}
//                                 <h6 className="text-uppercase fw-bold">Quick Links</h6>
//                                 <hr className="mb-4 mt-0 d-inline-block mx-auto"
//                                     style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
//                                 <p>
//                                     <a href="home.html" className="text-dark links">Home</a>
//                                 </p>
//                                 <p>
//                                     <a href="services.html" className="text-dark links">Services</a>
//                                 </p>
//                                 <p>
//                                     <a href="contact us.html" className="text-dark links">Contact us</a>
//                                 </p>
//                             </div>
//                             {/* Grid column */}
//                             {/* Grid column */}
//                             <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
//                                 {/* Links */}
//                                 <h6 className="text-uppercase fw-bold">Contact</h6>
//                                 <hr className="mb-4 mt-0 d-inline-block mx-auto"
//                                     style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
//                                 <p><FontAwesomeIcon icon={faHome} className="mr-3" /> Opp. Marwadi Building, Nana Mava Main Road, Rajkot 360004</p>
//                                 <p><FontAwesomeIcon icon={faEnvelope} className="mr-3" /> Contactus@gmail.com</p>
//                                 <p><FontAwesomeIcon icon={faPhone} className="mr-3" /> + 01 234 567 88</p>
//                                 <p><FontAwesomeIcon icon={faPrint} className="mr-3" /> + 01 234 567 89</p>
//                             </div>
//                             {/* Grid column */}
//                         </div>
//                         {/* Grid row */}
//                     </div>
//                 </section>
//                 {/* Section: Links */}
//                 {/* Copyright */}
//                 <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
//                     © 2023 Copyright:Trinity Hospital
//                 </div>
//                 {/* Copyright */}
//             </footer>
//             {/* Footer */}
//         </div>
//         </html>

//     );
// }
// export default Contact
import React, { useState } from 'react';
import './contact.css';
import logo from './newlogo.jpg'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { CheckCircle, AlertTriangle } from 'lucide-react'; // For response messages


const Contact = () => {
    // --- State for the form ---
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        // Renamed ContactNo to phone to match backend potentially
        phone: '', 
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState({ type: '', text: '' });

    // --- Handle input changes ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Handle form submission ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser submission
        setLoading(true);
        setResponseMsg({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Make sure the body keys match your backend schema (name, email, subject, message)
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                    // Phone is not in the backend schema, so we don't send it unless added
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }
            
            setResponseMsg({ type: 'success', text: data.message });
            // Reset form on success
            setFormData({ name: '', subject: '', phone: '', email: '', message: '' }); 
        } catch (err) {
            setResponseMsg({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    // --- JSX Structure (Cleaned up) ---
    return (
        <div> {/* Removed <html> and <head> */}
            <h1 className="d text-white" style={{ paddingTop: '20px', paddingLeft: '100px' }}>Contact Us</h1>
            <br /><br />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="box">
                                <br /><br />
                                <ul className="bxtxt">
                                    <li>
                                        <h4 style={{ fontWeight: 700, fontSize: '30px' }}>
                                            Trinity Hospital
                                        </h4>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>  Opp. Marwadi Building,<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;Nana Mava Main Road, <br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;Rajkot 360004</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="fas fa-mobile-alt"></i>
                                            <span> + 01 234 567 88<br />&nbsp;&nbsp;&nbsp;&nbsp;+ 01 234 567 89</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <i className="fas fa-envelope-open"></i>
                                            <span>    Contactus@gmail.com</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-7 offset-md-1">
                            <h2 style={{ fontWeight: 'bolder', fontSize: '45px' }}>
                                Send a Message
                            </h2>
                            
                            {/* Attach handleSubmit to the form */}
                            <form className="form-group" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* Controlled input */}
                                        <input name="name" type="text" placeholder="Name" className="form-control" 
                                               value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        {/* Controlled input */}
                                        <input name="subject" type="text" placeholder="Subject" className="form-control" 
                                               value={formData.subject} onChange={handleChange} /> 
                                    </div>
                                </div><br />
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* Controlled input - Note name change to 'phone' */}
                                        <input name="phone" type="tel" placeholder="Contact No" className="form-control" 
                                               value={formData.phone} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        {/* Controlled input */}
                                        <input name="email" type="email" placeholder="Email" className="form-control" 
                                               value={formData.email} onChange={handleChange} required />
                                    </div>
                                </div><br />
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* Controlled input */}
                                        <textarea name="message" rows="5" placeholder="Message" className="form-control"
                                                  value={formData.message} onChange={handleChange} required></textarea>
                                    </div>
                                </div><br />

                                {/* Display Success/Error Messages */}
                                {responseMsg.text && (
                                    <div className={`alert ${responseMsg.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center`} role="alert">
                                        {responseMsg.type === 'success' ? <CheckCircle className="me-2 flex-shrink-0" /> : <AlertTriangle className="me-2 flex-shrink-0" />}
                                        <div>{responseMsg.text}</div>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-12">
                                        {/* Submit button */}
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Enquiry'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div><br /><br /> <br /><br />
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14758.549092998952!2d70.7757611!3d22.367321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c972761ce515%3A0x3651e3fe1e9df4f8!2sMarwadi%20University!5e0!3m2!1sen!2sin!4v1697290707673!5m2!1sen!2sin"
                width="100%" height="300"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div>
                {/* Footer */}
                <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#d4efe8' }}>
                    {/* Section: Social media */}
                    <section className="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: '#52ae7f' }}>
                        {/* Left */}
                        <div className="me-5">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        {/* Right */}
                        <div>
                            <a href="https://www.facebook.com/" className="text-white me-4"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="https://twitter.com/" className="text-white me-4"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="https://www.google.com/" className="text-white me-4"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="https://www.instagram.com/" className="text-white me-4"><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </section>
                    {/* Section: Links */}
                    <section className="">
                        <div className="container text-center text-md-start mt-5">
                            <div className="row mt-3">
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                     {/* Make sure the logo path is correct */}
                                     <img className="logo" src={logo} alt="Trinity Hospital Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold">Quick Links</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                    {/* Use React Router Links if these pages are part of your app */}
                                    <p><a href="/" className="text-dark links">Home</a></p>
                                    <p><a href="/services" className="text-dark links">Services</a></p>
                                    <p><a href="/contact" className="text-dark links">Contact us</a></p>
                                </div>
                                {/* Grid column */}
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold">Contact</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                    <p><FontAwesomeIcon icon={faHome} className="me-2" /> Opp. Marwadi Building, Nana Mava Main Road, Rajkot 360004</p>
                                    <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> Contactus@gmail.com</p>
                                    <p><FontAwesomeIcon icon={faPhone} className="me-2" /> + 01 234 567 88</p>
                                    <p><FontAwesomeIcon icon={faPrint} className="me-2" /> + 01 234 567 89</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Copyright */}
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2023 Copyright: Trinity Hospital
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Contact; // Updated component name

