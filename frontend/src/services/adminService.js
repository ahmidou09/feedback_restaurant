import { getCurrentUser } from './authService';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/admin` : '/api/admin';

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`, {
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getAnalytics = async () => {
  const response = await fetch(`${API_URL}/analytics`, {
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getTables = async () => {
  const response = await fetch(`${API_URL}/tables`, {
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const createTable = async (tableData) => {
  const response = await fetch(`${API_URL}/tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(tableData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getFeedback = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/feedback?${queryParams}`, {
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
