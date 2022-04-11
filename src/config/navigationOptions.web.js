import history from '@helpers/history';
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
};
