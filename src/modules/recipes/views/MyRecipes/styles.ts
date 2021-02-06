import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 800px;
  margin-top: 100px;
  a {
    text-align: right;
    text-decoration: none;

    button {
      display: inline;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 550px) {
      flex-direction: column;
    }

    form {
      @media (max-width: 550px) {
        margin-bottom: 20px;
      }
      input {
        border-width: 0px;
        background: white;
        color: black;
        padding: 13px 10px 7px 10px;
      }

      button {
        border-width: 0;
        background: rgb(29, 161, 242);
        padding: 7px 10px;
        transition: 0.2s background;
        svg {
          font-size: 20px;
        }

        &:hover {
          background: rgb(56, 68, 77);
        }
      }
    }
  }
`;

export const Table = styled.table`
  margin-top: 25px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid white;
  tr:first-child {
    background: white;
    th {
      //border: 3px solid white;
      padding: 10px 10px;
      background: rgb(29, 161, 242);
      text-align: left;
    }
  }

  #error {
    width: 100%;
    height: 200px;
    font-weight: 600;
    text-align: center;
    background: white;
  }

  tr + tr {
    td {
      font-weight: 500;
      padding: 10px;
      color: black;
      background: #e0e0e0;
    }
  }

  tr + tr:nth-child(2n) {
    td {
      padding: 10px;
      color: black;
      background: white;
    }
  }

  .acoes {
    width: 15%;
    text-align: center;
    button {
      border-width: 0;
      background: transparent;
    }
    svg {
      color: black;
      font-size: 20px;
      margin: 0 4px;
    }
  }
`;
