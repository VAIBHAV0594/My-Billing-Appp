// src/services/authService.js
export const login = (username, password, role) => {
  // Dummy authentication for now
  if (username === "admin" && password === "admin123" && role === "ADMIN") {
    localStorage.setItem("token", "dummy-admin-token");
    localStorage.setItem("role", "ADMIN");
    return true;
  }
  if (username === "accountant" && password === "acc123" && role === "ACCOUNTANT") {
    localStorage.setItem("token", "dummy-acc-token");
    localStorage.setItem("role", "ACCOUNTANT");
    return true;
  }
  if (username === "customer" && password === "cust123" && role === "CUSTOMER") {
    localStorage.setItem("token", "dummy-cust-token");
    localStorage.setItem("role", "CUSTOMER");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
