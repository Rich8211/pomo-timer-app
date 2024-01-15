import React from 'react';
import './FormTextArea.css';

const FormInput = (props) => {
  const {
    upperLabel,
    bottomLabel,
    type,
    name,
    handleChange,
    value,
    htmlFor,
    inputType,
  } = props;
  return (
    <div className="input-wrapper" htmlFor={htmlFor}>
      <label className="top">{upperLabel}</label>
      {
        {
          input: (
            <input
              className="input"
              id={htmlFor}
              type={type}
              name={name}
              onChange={handleChange}
              value={value}
            />
          ),
          textArea: (
            <textarea
              id={htmlFor}
              type={type}
              name={name}
              onChange={handleChange}
              value={value}
            />
          ),
        }[inputType]
      }
      {bottomLabel && (
        <label className="bottom" htmlFor={htmlFor}>
          {bottomLabel}
        </label>
      )}
    </div>
  );
};

export default FormInput;
