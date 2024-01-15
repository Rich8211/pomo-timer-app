import React, { useContext } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './NavBar.css';

const NavBar = ({ handleModalOpen }) => {
  const navigate = useNavigate();

  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-items">
        {user ? (
          <>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/projects')}>Projects</button>
            <button onClick={handleModalOpen}>Add Task</button>
            <button onClick={signOut}>
              <LogoutIcon /> Logout
            </button>
          </>
        ) : (
          <button className="btn-signin" onClick={() => navigate('/login')}>
            <LoginIcon /> Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
