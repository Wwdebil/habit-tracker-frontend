const BASE_URL = 'http://localhost:8080/api';

export const registerRequest = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const loginRequest = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};