import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  @media (max-width: 720px) {
    padding: 0 20px;
  }
  border-bottom: solid 1px white;
`;

export const HeaderContainer = styled.div`
  display: flex;
  max-width: 800px;
  height: 100px;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1199px) {
    max-width: 980px;
  }

  @media (max-width: 550px) {
    max-width: 320px;
    height: auto;
    padding: 20px 0;
  }

  img {
    height: 40px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
`;

export const DivLogo = styled.div`
  p {
    font-weight: bold;
    margin-top: 13px;
    margin-left: 30px;
  }
`;

export const DivLogout = styled.div`
  cursor: pointer;
  margin-top: 13px;
  font-weight: bold;
  transition: color 0.1s;

  &:hover {
    color: rgb(29, 161, 242);

    svg {
      color: rgb(29, 161, 242) !important;
    }
  }
  p {
    margin-right: 10px;
  }
  svg {
    margin-top: -1px;
  }
`;
