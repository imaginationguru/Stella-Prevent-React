export const storeItem = (key, item) => {
  let jsonOfItem = window.localStorage.setItem(key, JSON.stringify(item));
  return jsonOfItem;
};

export const getItem = (key) => {
  const retrievedItem = window.localStorage.getItem(key);
  const item = JSON.parse(retrievedItem);
  return item;
};

export const generateUrlParams = (arr = []) => {
  if (arr.length) {
    let after_one = arr.filter((item, index) => index > 0);
    if (after_one.length) {
      let str = '';
      after_one.forEach((item, index) => {
        if (index === 0) {
          str = `?id${index + 2}=${item}`;
        } else {
          str = str + `&id${index + 2}=${item}`;
        }
      });
      return str;
    }
    return '';
  }
};
