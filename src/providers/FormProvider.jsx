import { createContext, useState } from 'react';

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [subtitle, setSubtitle] = useState('* Indicates Required Fields');
  const [missingFields, setMissingFields] = useState(false);
  const [form, setForm] = useState({});

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        missingFields,
        setMissingFields,
        updateField,
        subtitle,
        setSubtitle,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
