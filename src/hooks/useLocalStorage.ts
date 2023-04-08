export const useLocalStorage = () => {
  const readLS = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return localStorage.getItem(key);
    }
  };

  const writeLS = (key, value) => {
    const storage = readLS(key) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = readLS(key);
    const filteredStorage = storage.filter((el) => value !== el.barcode);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  function filtered(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].barcode === key) {
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  }

  const removeOne = (key, value) => {
    const storage = readLS(key);
    const filteredStorage = filtered(storage, value);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  const removeAll = (key) => {
    localStorage.removeItem(key);
  };

  const clearLS = () => {
    localStorage.clear();
  };

  return { readLS, writeLS, removeLS, removeOne, removeAll, clearLS };
};
