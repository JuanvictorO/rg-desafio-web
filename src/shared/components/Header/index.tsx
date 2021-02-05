import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsCollectionPlayFill, BsXCircleFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

import logoImg from '../../../assets/logo.png';
import { useAuth } from '../../../hooks/auth';

import { Container, HeaderContainer, DropdownIcon } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <HeaderContainer>
        <img src={logoImg} alt="Ponteflix" />
        <div>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <DropdownIcon>
                <p> {user.name} </p>
                <FiChevronDown color="#fff" size={20} />
              </DropdownIcon>
            </Dropdown.Toggle>

            <Dropdown.Menu color="#fff">
              {/* <Dropdown.Item href="#/action-1">
                <FaUserCircle color="#fff" size={20} />
                <p>Meu perfil</p>
  </Dropdown.Item> */}
              <Dropdown.Item href="/dashboard">
                <BsCollectionPlayFill color="#fff" size={20} />
                <p>Mis cursos</p>
              </Dropdown.Item>
              <Dropdown.Item onClick={signOut}>
                <BsXCircleFill color="#fff" size={20} />
                <p>Salir </p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
