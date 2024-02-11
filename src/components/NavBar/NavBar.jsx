import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ handleModalOpen }) => {
  const navigate = useNavigate();

  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-logo">pomodoro</div>
      <div className="navbar-items">
        {user ? (
          <>
            <button className="navbar-button" onClick={() => navigate('/')}>
              Home
            </button>
            <button
              className="navbar-button"
              onClick={() => navigate('/projects')}
            >
              Projects
            </button>
            <button className="navbar-button" onClick={handleModalOpen}>
              Add Task
            </button>
            <button
              className="navbar-button"
              onClick={() => {
                signOut();
                navigate('/');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button className="navbar-button" onClick={() => navigate('/login')}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
