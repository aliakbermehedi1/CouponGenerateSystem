// useLocalStorage.js
import { useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key) || initialValue;

  useEffect(() => {
    localStorage.setItem(key, window.location.pathname);
  }, [key]);

  return storedValue;
};

export default useLocalStorage;
