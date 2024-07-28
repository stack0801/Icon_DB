import { useEffect, useState } from 'react';
import axios from 'axios';

const GET_AUTH_URL = '/get_auth';
const GET_PROFILE_URL = '/get_profile';

const INITIAL_PROFILE_DATA = {
  profileName: 'admin.png',
  nickName: 'admin',
};

export function useAuth() {
  const [authData, setAuthData] = useState(null);
  const [profiledata, setProfileData] = useState(INITIAL_PROFILE_DATA);

  useEffect(() => {
    const initializeAuth = async () => {
      const userData = await fetchAuthData();
      if (userData) {
        await fetchUserProfile(userData);
      }
    };

    initializeAuth();
  }, []);

  const fetchAuthData = async () => {
    try {
      const authResponse = await axios.post(GET_AUTH_URL);
      const userData = authResponse.data;
      setAuthData(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching auth data:', error);
      return null;
    }
  };

  const fetchUserProfile = async (user) => {
    try {
      const profileResponse = await axios.post(GET_PROFILE_URL, { user });
      setProfileData(profileResponse.data[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return { authData, profiledata };
}
