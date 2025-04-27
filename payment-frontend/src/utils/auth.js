// This is a simplified auth utility for demonstration purposes
// In a real app, this would likely use JWT tokens or a more sophisticated auth mechanism

// Get auth token from localStorage
export const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'demo-token';
  };
  
  // Set auth token in localStorage
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Remove auth token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };
  
  // Check if user is authenticated
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  // Mock login function
  export const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Mock API call
      setTimeout(() => {
        if (email && password) {
          const token = 'demo-token-' + Math.random().toString(36).substring(2);
          setAuthToken(token);
          resolve({ success: true, token });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  // Mock logout function
  export const logout = () => {
    removeAuthToken();
  };
  