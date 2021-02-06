import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import logoImg from '../../../assets/logo.png';
import { useAuth } from '../../../hooks/auth';

import { Container, HeaderContainer, DivLogo, DivLogout } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <HeaderContainer>
        <DivLogo>
          <img src={logoImg} alt="Desafio RG" />
          <p>Olá, {user.nome}!</p>
        </DivLogo>
        <DivLogout onClick={signOut}>
          <p>Sair</p>
          <FiLogOut color="white" size={20} />
        </DivLogout>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
