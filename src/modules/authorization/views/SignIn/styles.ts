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
  align-items: center;
  justify-content: center;

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
    text-align: center;

    @media (max-width: 450px) {
      width: 300px;
    }

    h1 {
      margin-bottom: 24px;
      color: #fff;
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
      margin-top: 2px;
    }

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
