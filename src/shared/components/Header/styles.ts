import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  //padding-left: 20px;

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
  }
`;
