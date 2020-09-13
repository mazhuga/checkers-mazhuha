import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import { CheckerType, Colors } from '../interfaces';
import { BOARD_SIZE } from '../constants';

interface Props {
  checker: CheckerType;
  disabled: boolean;
  isGoForce: boolean;
  isForceMode: boolean;
}

const DraggableChecker: FC<Props> = (props) => {
  const { checker, disabled, isGoForce, isForceMode } = props;
  const isDragDisabled = isForceMode ? !isGoForce : disabled;

  return (
    <Draggable
      index={checker.value}
      key={`${checker.value}`}
      draggableId={`${checker.value}`}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Checker
          color={checker.color}
          isGoForce={isGoForce}
          ref={provided.innerRef}
          disabled={disabled || isDragDisabled}
          style={provided.draggableProps.style}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};

export default memo(DraggableChecker);

export const Checker = styled.div<{
  color?: Colors;
  disabled?: boolean;
  isGoForce?: boolean;
}>`
  width: 80px;
  height: 80px;
  opacity: 0.8;
  border-radius: 50%;
  user-select: none;
  box-sizing: border-box;
  padding: ${BOARD_SIZE * 2}px;
  background-color: ${({ color }) => color};
  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
  border: 10px solid ${({ isGoForce }) => (isGoForce ? '#35bf3e' : '#9a9a9a')};
`;
