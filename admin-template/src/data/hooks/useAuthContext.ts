import { AuthContext } from './../contexts/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => useContext(AuthContext);