import React, { useRef, TextareaHTMLAttributes } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  error?: string;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  defaultValue,
  error,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Container>
      <textarea name={name} value={defaultValue} ref={inputRef} {...rest} />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#d00000" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
