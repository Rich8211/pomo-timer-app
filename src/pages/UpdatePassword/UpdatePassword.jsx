import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FormContext } from '../../providers/FormProvider';
import FormControl from '../../components/FormControl/FormControl';
import FormInput from '../../components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const navigate = useNavigate();

  const { updatePassword } = useContext(AuthContext);
  const {
    form,
    setForm,
    updateField,
    missingFields,
    setMissingFields,
    subtitle,
    setSubtitle,
  } = useContext(FormContext);

  const [passWordNotMatch, setPasswordNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      password: '',
      passwordCheck: '',
    });
  }, [setForm]);

  useEffect(() => {
    if (passWordNotMatch) setSubtitle('Passwords do not match');
    if (missingFields) setSubtitle('Please fill out all required fields');
  }, [passWordNotMatch, missingFields, setSubtitle]);

  const { password, passwordCheck } = form;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (missingFields) setMissingFields(false);
    if (passWordNotMatch) setPasswordNotMatch(false);
    if (!password.trim() || !passwordCheck.trim()) {
      setMissingFields(true);
      return;
    }
    if (password !== passwordCheck) {
      setPasswordNotMatch(true);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await updatePassword(password);
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      setSubtitle('Error in Updating Password. Please try again');
    }
    setLoading(false);
  };

  const Inputs = [
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
  ];

  return (
    <FormControl
      title={'Update Password'}
      submitText={'Update'}
      handleSubmit={handleSignUp}
      subtitle={subtitle}
    >
      {Inputs.map((input, i) => (
        <FormInput key={i} {...input} />
      ))}
    </FormControl>
  );
};

export default UpdatePassword;
