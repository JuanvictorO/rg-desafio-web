import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  img {
    @media (max-width: 450px) {
      width: 200px;
    }
  }

  @media (max-width: 450px) {
    padding: 20px;
  }

  form {
    margin: 40px 0;
    width: 340px;
    @media (max-width: 450px) {
      width: 300px;
    }
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 18px;
    svg {
      margin-right: 10px;
      margin-top: 0px;
    }

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  width: 100%;
`;
