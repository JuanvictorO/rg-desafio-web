import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => (
  <Container type="button" disabled={loading} {...rest}>
    {loading ? <p>Cargando...</p> : children}
  </Container>
);

export default Button;
