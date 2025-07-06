// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page
  };

  return handleLogout;
}
