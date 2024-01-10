// utility.ts
export const isValidToken = (): boolean => {
  const token = localStorage.getItem('jwtToken');
  return !!token; // This will return true if the token exists and is not null or empty string
};
