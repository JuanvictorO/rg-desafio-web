import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Field } from 'formik';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  defaultValue?: string | number;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  defaultValue,
  error,
  value,
  label,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      <Field
        onFocus={handleInputFocus}
        name={name}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        value={value}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      {error && (
        <Error title={error}>
          <FiAlertCircle color="red" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
