import styled from 'styled-components';
import { darken } from 'polished';

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 250px;
  max-height: 250px;
  border-radius: 4px;
  border: solid 1px #0cc8cc;
  background-color: #cef4f5;
  justify-content: center;
  align-items: center;
  padding: 3%;
  margin: 3%;
  &:hover {
    background: ${darken(0.03, '#cef4f5')};
  }
`;
