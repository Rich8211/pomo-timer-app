import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FormContext } from '../../providers/FormProvider';
import FormControl from '../../components/FormControl/FormControl';
import FormInput from '../../components/FormInput/FormInput';

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const { passwordReset } = useContext(AuthContext);
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
    });
  }, [setForm]);

  useEffect(() => {
    if (missingFields) setSubtitle('Please fill out all required fields');
  }, [missingFields, setSubtitle]);

  const { email } = form;

  const Input = {
    htmlFor: 'email',
    upperLabel: 'Email*',
    name: 'email',
    handleChange: updateField,
    type: 'email',
    inputType: 'input',
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (missingFields) setMissingFields(false);
    if (!email.trim()) {
      setMissingFields(true);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await passwordReset(email);
      console.log(error);
      console.log(data);
      setSubtitle('Password reset has been sent to your email');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <FormControl
      title={'Password Reset'}
      submitText={'Send reset link'}
      handleSubmit={handleReset}
      subtitle={subtitle}
    >
      <FormInput {...Input} />
    </FormControl>
  );
};

export default PasswordReset;
