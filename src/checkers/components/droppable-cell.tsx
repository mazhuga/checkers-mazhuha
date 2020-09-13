import React, { FC, memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { CheckerType } from '../interfaces';

import { Cell } from './styled-components';
import DraggableChecker from './dragable-checker';

interface Props {
  checker: CheckerType | null;
  value: number;
  disabled: boolean;
  isDropDisabled: boolean;
  isGoForce: boolean;
  isForceMode: boolean;
}

const DroppableCell: FC<Props> = (props) => {
  const {
    checker,
    value,
    isDropDisabled,
    disabled,
    isGoForce,
    isForceMode,
  } = props;

  return (
    <Droppable isDropDisabled={isDropDisabled} droppableId={`${value}`}>
      {(provided, snapshot) => (
        <Cell
          isDark
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {checker ? (
            <DraggableChecker
              checker={checker}
              disabled={disabled}
              isGoForce={isGoForce}
              isForceMode={isForceMode}
            />
          ) : null}
        </Cell>
      )}
    </Droppable>
  );
};

export default memo(DroppableCell);
