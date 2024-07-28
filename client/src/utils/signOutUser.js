import axios from 'axios';

const SIGN_OUT_URL = '/sign_out';

export const signOutUser = async () => {
  try {
    const signOutResponse = await axios.post(SIGN_OUT_URL);
    if (signOutResponse.data === 'success') {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error signing out user:', error);
  }
};