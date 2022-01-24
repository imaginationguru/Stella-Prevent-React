import React from 'react';
import {translate as ts} from '../i18n/translate';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="container">
        <div className="footer-links">
          <div className="footer-link-item">
            <Link to="#">{ts('PRESENTATION')}</Link>
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
    </footer>
  );
};

export default Footer;
