import styled from 'styled-components';

import colors from '../../../styles/colors';

export const Container = styled.div`
  background-color: ${colors.default};
  width: 100%;
  padding-left: 20px;

  @media (max-width: 720px) {
    padding: 0 50px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  max-width: 1060px;
  height: 120px;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1199px) {
    max-width: 980px;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
  }

  img {
    height: 40px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-content: center;

    button {
      background-color: transparent;
      cursor: pointer;
      border: 0;
      svg {
        color: #fff;
      }

      @media (max-width: 998px) {
        margin-right: 20px;
      }
      @media (max-width: 720px) {
        margin-right: 0;
      }
    }

    p {
      margin: 0 10px;
    }

    .dropdown-menu {
      flex-direction: column;
      background-color: #ff7300;
      padding: 10px;
      color: #fff;
      border-radius: 10px;
      position: absolute;
      margin-top: 5px;

      &:before {
        bottom: 100%;
        right: 15%;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #ff7300;
        border-width: 7px;
        margin-left: -7px;
      }
    }
    .dropdown-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      margin: 8px 5px;
      color: #fff;
      text-decoration-line: none;

      p {
        display: flex;
        align-items: left;
      }
    }
  }
`;

export const DropdownIcon = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
`;
