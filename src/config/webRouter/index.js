import React from 'react';
import { Router, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import history from '../../helpers/history';
import SignIn from '../../containers/auth/signIn/index.web';
import DailyLearningWeeks from '../../containers/dailyLearningWeeks';
import SignUp from '../../containers/auth/signUp';
import RecoverPassword from '../../containers/auth/recoverPassword';
import ModuleSecond from '../../containers/moduleSecond';
import ModuleThird from '../../containers/moduleThird';
import EmailCheck from '../../containers/auth/emailCheck';
import ActivityTracker from '../../containers/activityTracker';
import MoodTracker from '../../containers/moodTracker';
import AddActivityTracker from '../../containers/activityTracker/addActivityTracker';
import SleepTracker from '../../containers/sleepTracker';
import Exercises from '../../containers/exercises';
import Dashboard from '../../containers/dashboard';
import VerifyUserOTP from '../../containers/verifyUserOTP';
import Subscription from '../../containers/payment/subscription';
import Payment from '../../containers/payment/paymentScreen';
import Profile from '../../containers/profile';
const WebRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute restricted={true} component={SignIn} path="/" exact />
        <PublicRoute
          restricted={true}
          component={SignUp}
          path="/SignUp"
          exact
        />
        <PublicRoute
          restricted={false}
          component={VerifyUserOTP}
          path="/VerifyUserOTP"
          exact
        />
        <PublicRoute
          restricted={true}
          component={EmailCheck}
          path="/EmailCheck"
          exact
        />
        <PublicRoute
          restricted={true}
          component={RecoverPassword}
          path="/RecoverPassword/:id/:resetToken"
          exact
        />

        <PrivateRoute
          component={DailyLearningWeeks}
          path="/DailyLearningWeeks"
        />
        <PrivateRoute component={ModuleSecond} path="/ModuleSecond" />
        <PrivateRoute component={ModuleThird} path="/ModuleThird" />
        <PrivateRoute component={ActivityTracker} path="/ActivityTracker" />
        <PrivateRoute component={MoodTracker} path="/MoodTracker" />
        <PrivateRoute component={SleepTracker} path="/SleepTracker" />
        <PrivateRoute
          component={AddActivityTracker}
          path="/AddActivityTracker"
        />
        <PrivateRoute component={Exercises} path="/Exercises" />
        <PrivateRoute component={Dashboard} path="/Dashboard" />
        <PrivateRoute component={Profile} path="/Profile" />
        <PrivateRoute component={Subscription} path="/Subscription" />
        <PrivateRoute component={Payment} path="/Payment" />

      </Switch>
    </Router>
  );
};

export default WebRouter;
