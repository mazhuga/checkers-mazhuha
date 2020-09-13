import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div<{ isDark?: boolean; isDraggingOver?: boolean }>`
  box-sizing: border-box;
  width: 80px;
  height: 80px;

  border: ${({ isDraggingOver }) =>
    isDraggingOver ? '5px solid #68e1ff' : 'none'};
  background-color: ${({ isDark }) => (isDark ? '#232621' : '#d5c892')};
`;
