import React from 'react';
import {translate as ts} from '../i18n/translate';
import {Link} from 'react-router-dom';
import {navigatorPush} from '../config/navigationOptions.web';
import footerlogo from '../assets/images/footerlogo.svg';

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="container">
        <div className='f-col-row'>
          <div className='f-col f-col-fixed'></div>
          <div className='f-col f-col-auto'>
            <div className="footer-links">
              <div className="footer-link-item">
                <Link to="/Contact">{ts('PRESENTATION')}</Link>
              </div>
              <div className="footer-link-item">
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
              </div>
            </div>
          </div>
          <div className='f-col f-col-fixed'>
            <div className='poweredby'>
              <h4>Powered by</h4>
              <span>
              <img src={footerlogo} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
