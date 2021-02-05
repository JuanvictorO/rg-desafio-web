// import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: auto;
    @media (max-width: 450px) {
      width: 200px;
    }
  }

  @media (max-width: 450px) {
    padding: 20px;
  }

  form {
    margin: 20px 0;
    width: 320px;
    text-align: center;

    h1 {
      font-size: 36px;
      margin-bottom: 30px;
    }

    input {
      & + input {
        margin-top: 20px;
      }
    }
  }
`;

export const DivBox = styled.div`
  margin-top: 30px !important;
  display: flex;
  justify-content: space-between;

  a {
    margin-top: 12px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;

    &:hover {
      color: rgb(29, 161, 242);
    }

    svg {
      margin-bottom: -7px;
    }
  }
`;
