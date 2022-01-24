import history from '../helpers/history';
export const navigatorPush = (props) => {
  const {componentId, screenName, passProps} = props;
  history.push(`/${screenName}`, passProps, componentId);
};
export const navigatorPop = () => {
console.log(history,"hi");
history.goBack();

};

export const navigatortoStart = () => {
  console.log(history,"hi",history.length);
  //history.deleteAll();
 // history.goBack(0);
  //history.goBack();
  //history.location.replace('SignIn');=
  history.replace({ pathname: '/', state: {} })
  };
  