import React from "react";
import './styles.scss';

function Footer(props) {
    return (
        <footer className="main-footer fl-wrap" >
            <div className="footer-inner fl-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="footer-widget fl-wrap">
                                <div className="footer-contacts-widget fl-wrap">
                                    <ul className="footer-contacts fl-wrap no-list-style">
                                        <div className="col-md-4">
                                            <li>
                                                <span><i className="fal fa-envelope" /> Mail :</span><a href="#" target="_blank">yourmail@domain.com</a>
                                            </li>
                                        </div>
                                        <div className="col-md-4">
                                            <li> <span><i className="fal fa-map-marker" /> Adress :</span><a href="#" target="_blank">USA 27TH Brooklyn NY</a></li>
                                        </div>
                                        <div className="col-md-4">
                                            <li><span><i className="fal fa-phone" /> Phone :</span><a href="#">+7(111)123456789</a></li>
                                        </div>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-wave">
                    <svg viewBox="0 0 100 25">
                        <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                    </svg>
                </div>
            </div>
            <div className="sub-footer  fl-wrap">
                <div className="container">
                    <div className="copyright"> © Fun Trip .  All rights reserved.</div>
                    <div className="footer-social">
                        <span>Find  us on: </span>
                        <ul className="no-list-style">
                            <li><a href="#" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-twitter" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-vk" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-whatsapp" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;