import React, { useState, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '../../providers/FormProvider';
import FormControl from '../../components/FormControl/FormControl';
import FormInput from '../../components/FormInput/FormInput';
import { supabase } from '../../client';

const SignUp = () => {
  const handleRegister = (email, password) =>
    supabase.auth.signUp({ email, password });

  const {
    form,
    setForm,
    updateField,
    missingFields,
    setMissingFields,
    subtitle,
    setSubtitle,
  } = useContext(FormContext);

  const { email, password, passwordCheck } = form;

  const [passWordNotMatch, setPasswordNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      email: '',
      password: '',
      passwordCheck: '',
    });
  }, [setForm]);

  useEffect(() => {
    if (passWordNotMatch) setSubtitle('Passwords do not match');
    if (missingFields) setSubtitle('Please fill out all required fields');
  }, [passWordNotMatch, missingFields, setSubtitle]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (missingFields) setMissingFields(false);
    if (passWordNotMatch) setPasswordNotMatch(false);
    if (!email.trim() || !password.trim() || !passwordCheck.trim()) {
      setMissingFields(true);
      return;
    }
    if (password !== passwordCheck) {
      setPasswordNotMatch(true);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await handleRegister(email, password);
      if (!error && data) {
        setSubtitle(
          'Registration Successful. Check your email to confirm your account'
        );
      }
    } catch (error) {
      setSubtitle('Error in Creating Account');
    }
    setLoading(false);
  };

  const inputs = useMemo(
    () => [
      {
        htmlFor: 'email',
        upperLabel: 'Email*',
        bottomLabel: 'Please enter a valid email address',
        name: 'email',
        handleChange: updateField,
        type: 'email',
        inputType: 'input',
      },
      {
        htmlFor: 'password',
        upperLabel: 'Password*',
        bottomLabel: 'Password must be atleast six characters long',
        name: 'password',
        handleChange: updateField,
        type: 'password',
        inputType: 'input',
      },
      {
        htmlFor: 'passwordCheck',
        upperLabel: 'Confirm Password*',
        name: 'passwordCheck',
        handleChange: updateField,
        type: 'password',
        inputType: 'input',
      },
    ],
    [updateField]
  );

  return (
    <FormControl
      title={'Create Your Account'}
      submitText={'Sign Up'}
      handleSubmit={handleSignUp}
      subtitle={subtitle}
    >
      {inputs.map((input, i) => (
        <FormInput key={i} {...input} />
      ))}
    </FormControl>
  );
};

export default SignUp;
