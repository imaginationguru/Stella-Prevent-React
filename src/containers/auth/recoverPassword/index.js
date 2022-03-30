/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import user from '../../../assets/images/user.svg';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import GLOBALS from '../../../constants'
const isIOS = Platform.OS === 'ios' ? true : false;
console.log('is IOS>>>>>>', isIOS);
const Dashboard = () => {
  const { IMAGE_BASE_URL, ACTION_TYPE, COLORS } = GLOBALS;
  const { LightYellow } = COLORS;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <div className="dashboard">
            <div className="dashboard-header">
              <div className="container">
                <div className="dashboard-header-inner"></div>
              </div>
            </div>
            <div className="dashboard-body">
              <div className="container">
                <div className="dashboard-body-inner">
                  <div className="dashboard-preview">
                    <div className="dashboard-nav">
                      <div className="nav-switch">
                        <div className="nav-wrapper">
                          <div className="nav">
                            <button className="navbutton active">1</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">2</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">3</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">
                              <svg
                                width="24"
                                height="30"
                                viewBox="0 0 24 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.92781 3.34694C2.38952 3.34694 2.44312 3.70307 2.44312 4.16323L3.11926 28.199C3.11401 28.4176 3.02366 28.6255 2.8675 28.7782C2.71133 28.931 2.50175 29.0165 2.28351 29.0165C2.06527 29.0165 1.85568 28.931 1.69952 28.7782C1.54335 28.6255 1.453 28.4176 1.44775 28.199V4.1613C1.44872 3.70355 1.46611 3.34694 1.92781 3.34694ZM2.82756 3.48871C2.82756 3.48871 4.55895 0.97694 6.60667 0.967746C10.3578 0.950811 13.3062 5.30855 17.5881 5.59501C19.6242 5.73146 21.7241 3.3871 21.7328 3.3871C21.7367 7.4763 21.7396 11.1552 21.7328 15.1452C21.7328 15.1452 20.0937 17.6061 18.0508 17.6855C14.4107 17.8263 10.8205 13.0548 7.17849 13.125C4.53432 13.1758 3.20716 15.5405 3.20667 15.5395L2.82756 3.48871Z"
                                  fill={LightYellow}
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">5</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">
                              <svg
                                width="24"
                                height="23"
                                viewBox="0 0 24 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="8.68"
                                  height="8.68"
                                  fill="white"
                                  stroke={LightYellow}
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                  strokeDasharray="2 2"
                                />
                                <rect
                                  x="15.0801"
                                  y="13.32"
                                  width="7.68"
                                  height="7.68"
                                  fill="white"
                                  stroke={LightYellow}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <line
                                  x1="12"
                                  y1="4.5"
                                  x2="19"
                                  y2="4.5"
                                  stroke={LightYellow}
                                  strokeLinejoin="round"
                                />
                                <line
                                  x1="18.5"
                                  y1="4"
                                  x2="18.5"
                                  y2="10"
                                  stroke={LightYellow}
                                />
                                <path
                                  d="M13.5 6L13 6.5L11 4.51401L13 2.5L13.5 3L12 4.5L13.4999 5.99442L13.5 6Z"
                                  fill={LightYellow}
                                />
                                <line
                                  x1="10.28"
                                  y1="18.5"
                                  x2="5.00003"
                                  y2="18.5"
                                  stroke={LightYellow}
                                  strokeLinejoin="round"
                                />
                                <line
                                  x1="5.5"
                                  y1="18.42"
                                  x2="5.5"
                                  y2="11.5"
                                  stroke={LightYellow}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">
                              <svg
                                width="36"
                                height="16"
                                viewBox="0 0 36 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M33.6398 1.46742H21.4287C21.359 1.46742 21.2922 1.43732 21.243 1.38374C21.1937 1.33016 21.1661 1.25749 21.1661 1.18171C21.1661 1.10593 21.1937 1.03326 21.243 0.97968C21.2922 0.926098 21.359 0.895996 21.4287 0.895996H33.6398C33.7095 0.895996 33.7763 0.926098 33.8255 0.97968C33.8748 1.03326 33.9024 1.10593 33.9024 1.18171C33.9024 1.25749 33.8748 1.33016 33.8255 1.38374C33.7763 1.43732 33.7095 1.46742 33.6398 1.46742ZM26.8121 6.163C22.9918 5.96971 22.1276 4.25771 21.4418 2.03885H33.6267C32.9485 4.23214 32.1472 5.92985 28.3877 6.15543V8.03885H28.9129C29.1219 8.03885 29.3223 8.12916 29.47 8.28991C29.6177 8.45065 29.7007 8.66867 29.7007 8.896C29.7007 9.12332 29.6177 9.34134 29.47 9.50209C29.3223 9.66283 29.1219 9.75314 28.9129 9.75314H19.3935V10.1011C19.3935 11.1176 20.3544 12.917 21.4943 13.7531C22.7752 14.6926 24.2517 14.6103 24.2517 14.6103V16.896H11.1214V14.7531C11.1214 14.7531 12.675 14.6531 13.8788 13.7531C15.104 12.837 15.9796 11.1103 15.9796 10.022V9.75314H6.4602C6.25126 9.75314 6.05087 9.66283 5.90313 9.50209C5.75539 9.34134 5.67238 9.12332 5.67238 8.896C5.67238 8.66867 5.75539 8.45065 5.90313 8.28991C6.05087 8.12916 6.25126 8.03885 6.4602 8.03885H6.98541V6.15543C3.22569 5.92985 2.42435 4.23214 1.74644 2.03885H13.9313C13.2455 4.25771 12.3819 5.96971 8.56104 6.163V8.03885H15.9862C16.0187 7.68648 16.1704 7.35982 16.4118 7.12225C16.6532 6.88468 16.9671 6.75313 17.2927 6.75314H18.0805C18.406 6.75313 18.7199 6.88468 18.9613 7.12225C19.2027 7.35982 19.3544 7.68648 19.3869 8.03885H26.8121V6.163ZM17.6866 7.896C17.5048 7.896 17.3271 7.95465 17.1759 8.06453C17.0248 8.17441 16.907 8.33059 16.8374 8.51331C16.7678 8.69604 16.7496 8.89711 16.7851 9.09109C16.8206 9.28507 16.9081 9.46325 17.0366 9.6031C17.1652 9.74296 17.329 9.8382 17.5073 9.87678C17.6855 9.91537 17.8703 9.89556 18.0383 9.81988C18.2062 9.74419 18.3498 9.61602 18.4508 9.45157C18.5518 9.28712 18.6057 9.09378 18.6057 8.896C18.6057 8.63078 18.5088 8.37643 18.3365 8.18889C18.1641 8.00135 17.9303 7.896 17.6866 7.896ZM13.9444 1.46742H1.73331C1.66366 1.46742 1.59687 1.43732 1.54762 1.38374C1.49837 1.33016 1.4707 1.25749 1.4707 1.18171C1.4707 1.10593 1.49837 1.03326 1.54762 0.97968C1.59687 0.926098 1.66366 0.895996 1.73331 0.895996H13.9444C14.0141 0.895996 14.0809 0.926098 14.1301 0.97968C14.1794 1.03326 14.207 1.10593 14.207 1.18171C14.207 1.25749 14.1794 1.33016 14.1301 1.38374C14.0809 1.43732 14.0141 1.46742 13.9444 1.46742Z"
                                    fill={LightYellow}
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect width="36" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">8</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">9</button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M23.0355 2.48396C22.6125 2.06089 21.9265 2.06089 21.5035 2.48396L20.5584 3.42901C19.3504 2.85191 17.8596 3.06367 16.859 4.06427L5.36853 15.5548L11.4968 21.683L22.9873 10.1925C23.9879 9.19193 24.1996 7.70119 23.6225 6.49314L24.5676 5.54809C24.9907 5.12502 24.9907 4.43909 24.5676 4.01602L23.0355 2.48396ZM18.4119 11.7038L11.4968 18.6189L8.43266 15.5548L15.3477 8.63968L18.4119 11.7038ZM20.3817 9.73401L21.4552 8.66047C21.8783 8.2374 21.8783 7.55147 21.4552 7.1284L19.9231 5.59634C19.5001 5.17327 18.8141 5.17327 18.3911 5.59634L17.3175 6.66988L20.3817 9.73401Z"
                                  fill={LightYellow}
                                />
                                <path
                                  d="M2.16675 24.8627L4.46527 16.4359L10.5931 22.5646L2.16675 24.8627Z"
                                  fill={LightYellow}
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="nav">
                            <button className="navbutton">
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0)">
                                  <path
                                    d="M27.4166 8.16664C27.1517 8.16664 26.8971 8.13984 26.6567 8.09144C26.7678 7.58898 26.8333 7.03133 26.8333 6.41664C26.8333 5.45163 26.0483 4.66664 25.0833 4.66664C24.1183 4.66664 23.3333 5.45163 23.3333 6.41664C23.3333 7.37537 24.1006 8.28001 25.2012 8.82059C25.0327 9.21205 24.8322 9.54028 24.6251 9.8222C22.7922 6.78709 18.7241 4.66664 14 4.66664C11.2753 4.66664 8.65484 5.37873 6.56589 6.67985C5.85441 6.13128 4.98848 5.83334 4.0833 5.83334C3.76086 5.83334 3.49995 6.09426 3.49995 6.4167C3.49995 7.22164 3.74659 8.00947 4.20175 8.68223C3.41961 9.59541 2.86705 10.6123 2.57994 11.6667H2.3333C1.04645 11.6666 0 12.7131 0 14C0 15.2983 0.657945 16.4831 1.75968 17.1707L5.83335 19.7085V22.75C5.83335 23.0724 6.09427 23.3333 6.4167 23.3333H8.75C8.97105 23.3333 9.17268 23.2086 9.27183 23.0109L9.96226 21.63C12.5439 22.3421 15.4561 22.3421 18.0378 21.63L18.7282 23.0109C18.8274 23.2086 19.029 23.3333 19.2501 23.3333H21.5834C21.9058 23.3333 22.1668 23.0724 22.1668 22.75V19.6613C24.3953 18.0218 25.6668 15.7608 25.6668 13.4166C25.6668 12.5667 25.4964 11.7472 25.1937 10.9696C25.5889 10.5289 25.9952 9.9547 26.3053 9.20855C26.6631 9.28943 27.0368 9.33329 27.4168 9.33329C27.7392 9.33329 28.0001 9.07237 28.0001 8.74994C28.0001 8.4275 27.7391 8.16664 27.4166 8.16664ZM5.83335 12.8333C5.19023 12.8333 4.6667 12.3098 4.6667 11.6667C4.6667 11.0236 5.19023 10.5 5.83335 10.5C6.47648 10.5 7 11.0236 7 11.6667C7 12.3098 6.47648 12.8333 5.83335 12.8333ZM18.6376 8.34837C18.5567 8.59446 18.3288 8.74999 18.0834 8.74999C18.023 8.74999 17.962 8.74086 17.9016 8.72095C15.6913 7.99519 12.3087 7.99519 10.0984 8.72095C9.79305 8.82349 9.46318 8.65544 9.36239 8.34837C9.26215 8.04245 9.42845 7.71262 9.73498 7.61238C12.1766 6.81143 15.8235 6.81143 18.2651 7.61238C18.5715 7.71262 18.7379 8.04245 18.6376 8.34837ZM25.5487 7.68304C24.9005 7.31445 24.5 6.80574 24.5 6.41664C24.5 6.09481 24.7615 5.83329 25.0834 5.83329C25.4052 5.83329 25.6667 6.09475 25.6667 6.41664C25.6666 6.87749 25.6234 7.29908 25.5487 7.68304Z"
                                    fill={LightYellow}
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect width="28" height="28" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="navcontent">
                        <div className="navcontent-wrapper">
                          <h2 className="dashboard-heading">Welcome</h2>
                          <h6 className="dash-time m-b-30">1 minute</h6>
                          <p className="dash-text">Hello Shailja!</p>
                          <p className="dash-text">
                            Welcom to Be a Mom! This program aims to promote
                            your emotional well-being and psychological health,
                            while also helping to prevent depression in the
                            postpartum period.
                          </p>
                          <div className="dash-icon text-center">
                            <img className="nav-hover" src={user} />
                          </div>
                          <p className="dash-text">
                            The Be a Mom was developed by clinical psychologists
                            and reserchers in cooperation between the university
                            of Coimbra abd Maternity Daniel de Matos (Chuc).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-footer-nav">
                    <div className="footer-nav-inner">
                      <div className="footer-nav-left">
                        <div className="f-nav-link">
                          <h3>What is Be a Mom?</h3>
                          <h6>1 minute</h6>
                        </div>
                      </div>
                      <div className="footer-nav-right">
                        <div className="f-nav-link">
                          <h3>What is Be a Mom?</h3>
                          <h6>1 minute</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="dashboard-footer">
              <div className="container">
                <div className="footer-links">
                  <div className="footer-link-item">
                    <a href="#">Presentation</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">Terms</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">Operation</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">About</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">Team</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">Contacts</a>
                  </div>
                  <div className="footer-link-item">
                    <a href="#">Help</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
