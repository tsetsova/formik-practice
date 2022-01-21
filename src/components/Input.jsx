import React from "react";
import { Field, ErrorMessage } from "formik";
import { capitalizeFirstCharacter } from "../utilities/helpers";

function Input({ type, label, name, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      {type === "text" && <TextInput name={name} {...rest} />}
      {type === "select" && <Select name={name} {...rest} />}

      <ErrorMessage
        name={name}
        component="div"
        className="error"
        data-testid={`${name}-error`}
      />
    </div>
  );
}

function TextInput({ name, placeholder }) {
  return (
    <Field
      type="text"
      name={name}
      className="input"
      data-testid={`${name}-input`}
      placeholder={placeholder}
    ></Field>
  );
}

function Select({ name, placeholder, options }) {
  return (
    <Field
      as="select"
      name={name}
      className="input"
      data-testid={`${name}-input`}
      placeholder={placeholder}
    >
      <option value="" label={placeholder} />
      {options.map((option) => (
        <option value={option.toLowerCase()} key={option}>
          {capitalizeFirstCharacter(option)}
        </option>
      ))}
    </Field>
  );
}

export default Input;
