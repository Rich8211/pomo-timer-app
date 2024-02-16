import { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignInNew from './pages/Auth/SignInNew';
import SignUpNew from './pages/Auth/SignUpNew';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Projects from './pages/Projects/Projects';

import AuthProvider from './providers/AuthProvider';
import FormProvider from './providers/FormProvider';
import PomoProvider from './providers/PomoProvider';
import TaskProvider from './providers/TaskProvider';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import Project from './pages/Project/Project';
import './App.css';

function App() {
  return (
    <PomoProvider>
      <AuthProvider>
        <TaskProvider>
          <FormProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/sign-up" element={<SignUpNew />} />
                <Route path="/login" element={<SignInNew />} />
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
