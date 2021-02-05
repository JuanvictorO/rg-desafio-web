import React from 'react';
import { BsXCircleFill } from 'react-icons/bs';
// import { FiChevronDown } from 'react-icons/fi';

import logoImg from '../../../assets/logo.png';
import { useAuth } from '../../../hooks/auth';

import { Container, HeaderContainer } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <HeaderContainer>
        <img src={logoImg} alt="Desafio RG" />
        <div>
          <p> {user.nome} </p>

          <div>
            <BsXCircleFill color="#fff" size={20} />
            <p>Salir </p>
          </div>
        </div>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
