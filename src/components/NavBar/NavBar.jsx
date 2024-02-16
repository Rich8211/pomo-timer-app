import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ handleModalOpen }) => {
  const navigate = useNavigate();

  const { user, signOut } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">pomodoro</div>
      <ul className="navbar-items">
        {user ? (
          <>
            <li>
              <button className="navbar-button" onClick={() => navigate('/')}>
                Home
              </button>
            </li>
            <li>
              <button
                className="navbar-button"
                onClick={() => navigate('/projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button className="navbar-button" onClick={handleModalOpen}>
                Add Task
              </button>
            </li>
            <li>
              <button
                className="navbar-button"
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              className="navbar-button"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
