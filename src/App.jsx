import { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Projects from './pages/Projects/Projects';
import NavBar from './components/NavBar/NavBar';
import TasksModal from './components/TasksModal/TasksModal';
import AuthProvider from './providers/AuthProvider';
import FormProvider from './providers/FormProvider';
import PomoProvider from './providers/PomoProvider';
import TaskProvider from './providers/TaskProvider';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import Project from './pages/Project/Project';
import './App.css';


function App() {


  const [taskModalActive, setTaskModalActive] = useState(false);

  const setModalActive = () => {
    setTaskModalActive(true);
  };

  const setModalInactive = () => {
    setTaskModalActive(false);
  };

  return (
    <PomoProvider>
      <AuthProvider>
        <TaskProvider>
          <FormProvider>
            <BrowserRouter>
              <NavBar handleModalOpen={setModalActive} />
              {taskModalActive && <TasksModal handleClose={setModalInactive} />}
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="update-password" element={<UpdatePassword />} />
              </Routes>
            </BrowserRouter>
          </FormProvider>
        </TaskProvider>
      </AuthProvider>
    </PomoProvider>
  );
}

export default App;
