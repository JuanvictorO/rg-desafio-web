import styled from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  textarea {
    margin-bottom: 35px;
    width: 100%;
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
`;

export const Error = styled(Tooltip)`
  height: 20px;
  position: absolute;
  right: 10px;
  svg {
    margin: 0;
  }

  span {
    background: #d00000;
    color: #fff;

    &::before {
      border-color: #d00000 transparent;
    }
  }
`;
