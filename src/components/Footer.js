import React from 'react';
import {translate as ts} from '../i18n/translate';
import {Link} from 'react-router-dom';
import {navigatorPush} from '../config/navigationOptions.web';
import footerlogo from '../assets/images/footerlogo.svg';
import GLOBALS from '../constants';
const {IMAGE_BASE_URL} = GLOBALS;
const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="f-col-row">
          <div className="f-col f-col-fixed">
            <p class="footer-text">© 2022 Curio. All rights reserved.</p>
          </div>
          <div className="f-col f-col-auto">
            <div className="footer-links">
              <div className="footer-link-item">
                <a
                  target="_blank"
                  href={`${IMAGE_BASE_URL}upload/acknowldgement.pdf`}>
                  Terms of Use
                </a>
              </div>
              <div className="footer-link-item">
                <a
                  target="_blank"
                  href={`${IMAGE_BASE_URL}upload/PRIVACY_POLICY0203_stella.pdf`}>
                  Privacy Policy
                </a>
              </div>
              <div className="footer-link-item">
                <Link to="/Contact">Contact Us</Link>
              </div>
              {/* <div className="footer-link-item">
                <Link to="#">{ts('TERMS')}</Link>
              </div>
              <div className="footer-link-item">
                <Link to="#">{ts('OPERATION')}</Link>
              </div>
              <div className="footer-link-item">
                <Link to="#">{ts('ABOUT')}</Link>
              </div>
              <div className="footer-link-item">
                <Link to="#">{ts('TEAM')}</Link>
              </div>
              <div className="footer-link-item">
                <Link to="#">{ts('CONTACT')}</Link>
              </div>
              <div className="footer-link-item">
                <Link to="#">{ts('HELP')}</Link>
              </div> */}
            </div>
            <p class="footer-text text-center">
              If you are in a crisis or any other person may be in danger -
              please call the National Suicide
              <br />
              Prevention Lifeline at 1-800-273-TALK (8255).
            </p>
          </div>

          <div className="f-col f-col-fixed">
            <a
              target="_blank"
              className="poweredby"
              href="https://www.curiodigitaltx.com/">
              <h4>Powered by</h4>
              <span>
                <img src={footerlogo} alt="" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
