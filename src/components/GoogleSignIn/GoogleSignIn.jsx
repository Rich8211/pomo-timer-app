import React, { useContext } from 'react';
import googleLogo from '../../Images/googleLogo.jpg';
import { useMediaQuery } from '@mui/material';
import { AuthContext } from '../../providers/AuthProvider';

import './GoogleSignIn.css';

const GoogleSignIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const smallMatches = useMediaQuery('(max-width:720px)');

  return (
    <div className="googleContainer" onClick={signInWithGoogle}>
      <img src={googleLogo} alt="Google Logo" />
      <span className={smallMatches ? 'mobile' : ''}>Sign In with Google</span>
    </div>
  );
};

export default GoogleSignIn;
