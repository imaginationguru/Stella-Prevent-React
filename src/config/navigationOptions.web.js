import history from '@helpers/history';
import {translate as ts, changeLanguage} from '@i18n/translate';

export const navigatorPush = (props) => {
  const {componentId, screenName, passProps} = props;
  history.push(`/${screenName}`, passProps, componentId);
};
export const navigatorPop = () => {
  history.goBack();
};
export const goToPastModule = () => {
  history.replace({pathname: '/PastModule', state: {}});
};

export const navigatortoStart = () => {
  history.replace({pathname: '/', state: {}});
  //changeLanguage("es")
};
