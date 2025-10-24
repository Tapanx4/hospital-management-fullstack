import React from "react";
import './dr2.css';
import DocPicture from './dr2.jpg'
 function dr2(){
    return (
        <html>
            <head>
                <title>
                    Trinity Hospital
                </title>

            </head>
            <div className="dr-profile-container">
            <div>
                <h1 className="d text-white" style={{paddingTop: '20px', paddingLeft: '100px'}}>Dr.Kashyap Goswami</h1>
            </div>
            <br/><br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <img className="drimg" title="Dr.Kashyap Goswami" src={DocPicture} alt="Dr.Kashyap Goswami" />
                    </div>
                    <div className="col-sm-9">
                        <div id="ContentPlaceHolder1_divDescription" className="text-desc">
                            <ul>
                                <li><strong>MBBS -</strong> BJ Medical College, Ahmedabad (2006)</li>
                                <li><strong>MS Ortho -</strong> Baroda Medical College & SSG Hospital, Vadodara (2010)</li>
                                <li><strong>Consultant Orthopaedic Surgeon</strong> at Ashirwad Hospital, Rajkot (2011)</li>
                                <li><strong>MCh Ortho (USAIM) -</strong> University of Seychelles American Institute of Medicine (2015)</li>
                                <li><strong>Consultant Orthopaedic Surgeon</strong> at Shri Giriraj Multispecialty Hospital, Rajkot (2012-2018)</li>
                                <li><strong>Operative Course for Hand Reconstruction Surgery</strong> at Ganga Hospital, Coimbatore (2017)</li>
                                <li><strong>Micro Surgery Course</strong> at Ganga Hospital, Coimbatore (2019)</li>
                                <li><strong>Hand Surgery Fellowship</strong> under aegis of Indian Society for Surgery of the Hand at Ganga Hospital, Coimbatore (2021)</li>
                                <li><strong>Consultant Orthopaedic & Hand Surgeon</strong> at Trinity Hospital (2018 Onwards)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </html>
    )
 }
 export default dr2
