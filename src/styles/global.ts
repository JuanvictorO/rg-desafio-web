import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline:0;
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

  body{
    background: gray;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button, textarea {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer
  }
`;
