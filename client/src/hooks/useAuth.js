import { useEffect, useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [sign, setSign] = useState(null);
  const [profiledata, setProfileData] = useState({
    profilename: 'admin.png',
    nickname: 'admin',
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const userData = await fetchAuth();
      if (userData) {
        await fetchProfile(userData);
      }
    };

    initializeAuth();
  }, []);

  const fetchAuth = async () => {
    try {
      const response = await axios.post('/get_auth');
      const userData = response.data;
      setSign(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching auth data:', error);
      return null;
    }
  };

  const fetchProfile = async (user) => {
    try {
      const response = await axios.post('/get_profile', { user });
      setProfileData(response.data[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return { sign, profiledata };
}
