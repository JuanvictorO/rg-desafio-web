// import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FormContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    padding: 20px;
  }

  form {
    margin-bottom: 40px;
    width: 400px;
    text-align: center;

    @media (max-width: 550px) {
      width: 320px;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 30px;

      @media (max-width: 550px) {
        font-size: 24px;
      }
    }

    input {
      & + input {
        margin-top: 20px;
      }
    }

    .divSelect {
      p {
        font-size: 19px;
        text-align: left;
      }
      select {
        font-size: 16px;
        font-weight: 500;
        margin-top: 5px;
        margin-bottom: 40px;
        width: 100%;
        padding: 0.375rem 1.75rem 0.375rem 0.75rem;
        background-color: #fff;
        background-image: url(
          data:image/svg + xml,
          %3csvgxmlns='http://www.w3.org/2000/svg'viewBox='0 0 16 16'%3e%3cpathfill='none'stroke='%23343a40'stroke-linecap='round'stroke-linejoin='round'stroke-width='2'd='M2 5l6 6 6-6'/%3e%3c/svg%3e
        );
        background-position: right 0.75rem center;
        background-size: 16px 12px;
        border: 1px solid #ced4da;

        option {
          font-size: 16px;
          padding: 10px 8px;
        }
      }
    }

    textarea {
      width: 100%;
      margin-top: 40px;
      padding: 10px;
      color: black;
      resize: none;
      height: 100px;

      &::placeholder {
        color: black;
        opacity: 0.6;
        font-weight: 600;
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
