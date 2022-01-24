export function validateIsEmpty(text) {
  var result = false;
  if (text === '' || text === undefined) {
    result = true;
  }
  return result;
}

export function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateName(text) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(text);
}

export function validatePassword(password) {
  var re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*?&])[a-zA-Z\d$@$!%*?&]{8,}$/;
  return re.test(password);
}

export function validateNumber(text) {
  var re = /^[0-9]*$/;
  return re.test(text);
}

export function validatePhoneNumber(text) {
  var re = /^[0-9]*$/;
  console.log(
    're.test(text) && re.length>0 && re.length<11 :>> ',
    re.test(text),
    text.length,
  );
  return re.test(text) && text.length > 0 && text.length == 10;
}

export function validateContact(text) {
 // var re = /^[1-9][0-9]*$/;
  var re = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  console.log(
    're.test(text) && re.length>0 && re.length<11 :>> ',
    re.test(text),
    text.length,
  );
  return re.test(text) && text.length > 0 && text.length <= 10;
}

export function validateContactCode(text) {
  var re = /^\+(?:[0-9] ?){6,15}[0-9]$/;
  //console.log('re.test(text) && re.length>0 && re.length<19 :>> ',re.test(text),text.length);
  return re.test(text);
}

export function validateAddress(text) {
  var re = /^[a-zA-Z0-9\s,’-]*$/;
  return re.test(text);
}

export function validateZipcode(text) {
  var re = /^[a-zA-Z0-9]*$/;
  return re.test(text);
}
export function validatePhoneWithSpecialSymbol(text) {
  var re = /^[0-9*#+'-]+$/;
  console.log(
    're.test(text) && re.length>0 && re.length<11 :>> ',
    re.test(text),
    text.length,
  );
  return re.test(text) && text.length > 0 ;
}
export function validateANZipcode(text) {
 // var re = /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/;
  var re = /^[a-zA-Z0-9][a-zA-Z0-9\- ]{0,10}[a-zA-Z0-9]$/;
  return re.test(text);
}