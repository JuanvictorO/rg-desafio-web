import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #757575;

  & + div {
    margin-top: 45px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #d00000;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #5264ae;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      border-color: #5264ae;
    `}


  input {
    background: transparent;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #c8c8c8;
    }

    &:focus ~ label,
    &:invalid ~ label {
      top: -20px;
      font-size: 14px;
      color: #5264ae;
    }

    &:focus ~ label:first-child {
      -webkit-animation: inputHighlighter 0.3s ease;
      -moz-animation: inputHighlighter 0.3s ease;
      animation: inputHighlighter 0.3s ease;
    }
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    ${(props) =>
      props.isFilled &&
      css`
        top: -20px;
        font-size: 14px;
        color: #5264ae;
      `}
  }

  @-webkit-keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }

  @-moz-keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @keyframes inputHighlighter {
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
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
