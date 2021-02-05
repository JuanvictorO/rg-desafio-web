import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: rgb(29, 161, 242);
  border-radius: 5px;
  border: 0;
  padding: 10px 20px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${shade(0.2, 'rgb(56, 68, 77)')};
  }

  &:disabled {
    cursor: wait;
    background-color: ${shade(0.7, 'rgb(56, 68, 77)')};
  }
`;
