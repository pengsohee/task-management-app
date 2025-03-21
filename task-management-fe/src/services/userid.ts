import { jwtDecode }from 'jwt-decode';
import { getToken } from './auth'; // adjust the import path as needed

interface JwtPayload {
  id: string; // adjust the property name if your JWT payload uses a different key
}

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.id;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};
