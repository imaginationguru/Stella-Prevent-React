
import dashboardHeader from '../assets/images/dashboardHeader/dashboardHeader.png';
import GLOBALS from '../constants';

import profile from '../assets/images/profile.png';
import { getItem } from '../utils/AsyncUtils';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../actions';
import { navigatorPush } from '../config/navigationOptions.web';

const { COLORS } = GLOBALS;
const { DARK_GREEN, WHITE } = COLORS;

const Header = () => {
  let firstName = getItem('firstName');
  let lastName = getItem('lastName');
  const dispatch = useDispatch();
  return (
    <div style={{ width: '100%', height: '15vw' }}>
      <img src={dashboardHeader} style={{ width: '100%', height: '100%' }} />
      <div style={styles.profileWrapper}>
        <div className="row">
          <div className="col-md-5 col-sm-5 col-6">
            <div
              style={{
                display: 'flex',
                paddingTop: '2%',
                paddingBottom: '2%',
              }}>
              <div
                style={{
                  width: '35%',
                  height: '35%',
                  marginLeft: 15,
                }}>
                <img
                  src={profile}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: 20,
                }}>
                <p className="username">
                  {firstName} {lastName}
                </p>
                <button
                  className="btn-light-gray"
                  onClick={() => {
                    navigatorPush({
                      screenName: 'Profile',
                    });
                  }}>
                  Profile
                </button>
                <button
                  className="btn-gray"
                  onClick={() => {
                    dispatch(AppActions.logout());
                    dispatch(AppActions.dashboardModalAction(false));
                  }}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-7 col-6"></div>
        </div>
      </div>
    </div>
  );
};
export default Header;

const styles = {
  profileWrapper: {
    border: `2px solid ${DARK_GREEN}`,
    width: '80%',
    position: 'absolute',
    top: 30,
    left: '10%',
    backgroundColor: '#ffffff',
    opacity: 0.8,
    borderRadius: 20,
    borderShadow: ' 0px 18.965px 54.1858px rgba(0, 111, 89, 0.38)',
  },
};
