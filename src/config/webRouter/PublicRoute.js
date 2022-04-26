import { Route, Redirect } from 'react-router-dom';
import { getItem } from '../../utils/AsyncUtils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isLogin = getItem('token') ? true : false;
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to="/Dashboard" />
        ) : isLogin && restricted ? (
          //<Redirect to="/DailyLearningWeeks" />
          <Component {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
