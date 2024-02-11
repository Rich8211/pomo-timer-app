import React from 'react';
import './FormControl.css';

import Button from '../Buttons/Button';

const FormControl = ({
  children,
  title,
  handleSubmit,
  submitText,
  subtitle,
}) => {
  return (
    <div className="form-container">
      <form className="form-inner">
        <h2 className="title">{title}</h2>
        <p className={'form-subtitle'}>{subtitle}</p>
        <div className="form-inputs">{children}</div>
        <Button type="secondary" onClick={handleSubmit}>
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default FormControl;
