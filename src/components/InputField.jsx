import React from 'react';

const InputField = ({ label, name, value, onChange, error }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputField;
