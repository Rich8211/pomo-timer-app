import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import FormControl from '../../components/FormControl/FormControl';
import FormInput from '../../components/FormInput/FormInput';
import { FormContext } from '../../providers/FormProvider';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import './Auth.css';

export const SignInNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const [failedLogin, setFailedLogin] = useState(false);

  const {
    form,
    setForm,
    updateField,
    missingFields,
    setMissingFields,
    subtitle,
    setSubtitle,
  } = useContext(FormContext);

  useEffect(() => {
    setForm({
      email: '',
      password: '',
    });
  }, [setForm]);

  useEffect(() => {
    if (missingFields) setSubtitle('Please fill out all required fields');
  }, [missingFields, setSubtitle]);

  const { email, password } = form;

  const handleLogin = async (e) => {
    e.preventDefault();
    setFailedLogin(false);
    setMissingFields(false);

    if (!email.trim() || !password.trim()) {
      setMissingFields(true);
      return;
    }

    try {
      setLoading(true);
      if (!email.trim() || !password.trim()) {
        setMissingFields(true);
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(email, password);
      if (error) setSubtitle(error.message);
      if (user && session) navigate('/');
    } catch (error) {
      setSubtitle('Email or Password Incorrect');
    }
    setLoading(false);
  };

  const Inputs = [
    {
      htmlFor: 'email',
      upperLabel: 'Email*',
      name: 'email',
      handleChange: updateField,
      type: 'email',
      inputType: 'input',
    },
    {
      htmlFor: 'password',
      upperLabel: 'Password*',
      name: 'password',
      handleChange: updateField,
      type: 'password',
      inputType: 'input',
    },
  ];

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div
          className="auth-bg"
          style={{ backgroundImage: `url("/loginImage.jpg")` }}
        />
        <div className="auth">
          <FormControl
            title={'Login to your Account'}
            submitText={'Login'}
            handleSubmit={handleLogin}
            subtitle={subtitle}
          >
            <GoogleSignIn />
            {Inputs.map((input, i) => (
              <FormInput key={i} {...input} />
            ))}
            <Link to="/sign-up">
              Don't have an account? Click here to register.
            </Link>
            <Link to="/password-reset">Forgot your password? Click here.</Link>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SignInNew;
