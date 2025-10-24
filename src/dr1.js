import React from "react";
import './dr1.css';
import Docpicture from './dr1.jpg';

function dr1() {
    return (
        <html>
            <head>
                <title>
                    Trinity Hospital
                </title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
                    </head>
                    <div className="dr-profile-container">
            <div>
                <h1 className="d text-white" style={{paddingTop: '20px', paddingLeft: '100px'}}>Dr.Tapan Khetani</h1>
            </div>
            <br/><br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <img id="ContentPlaceHolder1_imgPhotos" className="drimg" title="Dr.Tapan Khetani" src={Docpicture} alt="Dr.Tapan Khetani" />
                    </div>
                    <div className="col-sm-9">
                        <div id="ContentPlaceHolder1_divDescription" className="text-desc">
                            <ul>
                                <li><strong>MBBS -</strong> BJ Medical College, Ahmedabad (2006)</li>
                                <li><strong>MS Ortho -</strong> BJ Medical College & Civil Hospital, Ahmedabad (2010) under Dr. HP Bhalodiya (renowned Joint Replacement Surgeon)</li>
                                <li><strong>Assistant Professor -</strong> Dept. of Orthopaedics, MP Shah Medical College & GG Hospital, Jamnagar (2011)</li>
                                <li><strong>MCh. Orth (UK) -</strong> University of Dundee & Ninewells NHS Hospital, UK (accredited by Royal College of Surgeons of England (2011-12))</li>
                                <li><strong>FAROS (Germany) -</strong> Fellowship in Arthroplasty & Reconstructive Orthopaedic Surgery at Marien Hospital, Erwitte, Germany (2012)</li>
                                <li><strong>Consultant Orthopaedic & Joint Replacement Surgeon</strong> at Ashirwad Hospital, Rajkot (2013-2018)</li>
                                <li><strong>Consultant Orthopaedic & Joint Replacement Surgeon</strong> at Trinity Hospital (2018 Onwards)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                </html>
                )
 }
                export default dr1