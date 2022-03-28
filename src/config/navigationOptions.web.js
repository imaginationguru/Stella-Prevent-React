import history from '../helpers/history';
export const navigatorPush = (props) => {
  const { componentId, screenName, passProps } = props;
  history.push(`/${screenName}`, passProps, componentId);
};
export const navigatorPop = () => {
  console.log(history, 'hi navigatorPop');
  history.goBack();
};
export const goToPastModule = () => {
  console.log(history, 'hi', history.length);

  history.replace({ pathname: '/PastModule', state: {} });
};

export const navigatortoStart = () => {
  console.log(history, 'hi', history.length);

  history.replace({ pathname: '/', state: {} });
};
