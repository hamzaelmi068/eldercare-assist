import brain from 'brain';

export async function login(username: string, password: string) {
  try {
    const response = await brain.login({ username, password });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

export async function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const response = await brain.verify_token(token);
    const isValid = await response.json();
    return isValid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}