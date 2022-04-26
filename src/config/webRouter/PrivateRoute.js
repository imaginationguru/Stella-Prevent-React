import { Route, Redirect } from 'react-router-dom';
import { getItem } from '../../utils/AsyncUtils';

const isLogin = () => (getItem('token') ? true : false);
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
