import React from 'react';
import ReactLoading, { LoadingProps } from 'react-loading';

import { Container } from './styles';

const Loading: React.FC<LoadingProps> = ({ type, color }) => (
  <Container>
    <ReactLoading
      type={type || 'bubbles'}
      color={color}
      height={100}
      width={100}
    />
  </Container>
);

export default Loading;
