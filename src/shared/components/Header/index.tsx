import React from 'react';
import { BsXCircleFill } from 'react-icons/bs';

import logoImg from '../../../assets/logo.png';
// import { useAuth } from '../../../hooks/auth';

import { Container, HeaderContainer } from './styles';

const Header: React.FC = () => {
  // const { user } = useAuth();
  return (
    <Container>
      <HeaderContainer>
        <img src={logoImg} alt="Desafio RG" />
        <p> Juan Victor </p>
        <div>
          <BsXCircleFill color="#fff" size={20} />
          <p>Salir </p>
        </div>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
