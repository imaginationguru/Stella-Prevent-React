import React from 'react';
import {translate as ts} from '../i18n/translate';
import {Link} from 'react-router-dom';
import {navigatorPush} from '../config/navigationOptions.web';
import footerlogo from '../assets/images/footerlogo.svg';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <div className="f-col-row">
          <div className="f-col f-col-fixed"></div>
          <div className="f-col f-col-auto">
            <div className="footer-links">
              <div className="footer-link-item">
                <a
                  target="_blank"
                  href="https://stella-careportal.curio-dtx.com/upload/acknowldgement.pdf">
                  Terms of Use
                </a>
              </div>
              <div className="footer-link-item">
                <a
                  target="_blank"
                  href="https://stella-careportal.curio-dtx.com/upload/PRIVACY_POLICY0203_stella.pdf">
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
          </div>

          {/* <div className="f-col f-col-auto">
            <div className="footer-links">
              <div className="footer-link-item">
                <Link to="/Contact">© 2022 Curio. All rights reserved.</Link>
              </div>
              <div className="footer-link-item">
                <Link to="/Contact">
                  If you are in a crisis or any other person may be in danger -
                  please call the National Suicide Prevention Lifeline
                  at 1-800-273-TALK (8255).
                </Link>
              </div>
              <div className="footer-link-item">
                <div className="poweredby">
                  <h4>Powered by</h4>
                  <span>
                    <img src={footerlogo} alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          <div
            class="flex-container"
            style={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: '30px',
              textAlign: 'center',
            }}>
            <div className="footer-link-item">
              <p class="footer-text">© 2022 Curio. All rights reserved.</p>
            </div>
            <div
              // className="footer-link-item"
              style={{paddingLeft: '50px', paddingRight: '50px'}}>
              <p class="footer-text">
                If you are in a crisis or any other person may be in danger -
                please call the National Suicide Prevention Lifeline
                at 1-800-273-TALK (8255).
              </p>
            </div>
            <div className="poweredby">
              <h4>Powered by</h4>
              <a target="_blank" href="https://www.curiodigitaltx.com/">
                <span>
                  <img src={footerlogo} alt="" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
