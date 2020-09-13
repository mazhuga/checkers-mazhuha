import React, { FC, memo, useCallback, useMemo } from 'react';
import { DragDropContext, DragStart } from 'react-beautiful-dnd';

import * as CONST from '../constants';

import { CheckerMap, CheckerType, Colors, GameState } from '../interfaces';

import DroppableCell from './droppable-cell';
import { Cell, Column, Row } from './styled-components';

interface Props {
  gameState: GameState;
  setGameState: (
    value: ((prevState: GameState) => GameState) | GameState,
  ) => void;
}

const ActiveBoard: FC<Props> = (props) => {
  const { gameState, setGameState } = props;
  const { red, white, turn, availableSteps } = gameState;
  const currentCheckers = gameState[turn];

  const getRivals = useCallback(
    (color) => (color === Colors.white ? red : white),
    [red, white],
  );

  // TODO FOR BETTER performance we have to memoize getBeatSteps function
  const getBeatSteps = useCallback(
    (checker, rivals) => {
      const beatSteps = CONST.DIRECTIONS.reduce((beatRivals, direction) => {
        const rivalPosition = checker.value + direction;
        const next = rivalPosition + direction;

        if (
          rivals[rivalPosition] &&
          !red[next] &&
          !white[next] &&
          CONST.ACTIVE_CELLS_MAP[next]
        ) {
          return {
            ...beatRivals,
            [next]: true,
          };
        }
        return beatRivals;
      }, {});

      return Object.keys(beatSteps).length ? beatSteps : null;
    },
    [red, white],
  );

  const checkCellEmpty = useCallback(
    (value: number) => !(red[value] || white[value]),
    [red, white],
  );

  const getDefaultSteps = useCallback(
    (checker) => {
      const { value, color } = checker;
      return color === Colors.white
        ? {
            [value]: true,
            [value + CONST.TOP_LEFT]: checkCellEmpty(value + CONST.TOP_LEFT),
            [value + CONST.TOP_RIGHT]: checkCellEmpty(value + CONST.TOP_RIGHT),
          }
        : {
            [value]: true,
            [value + CONST.BOTTOM_LEFT]: checkCellEmpty(
              value + CONST.BOTTOM_LEFT,
            ),
            [value + CONST.BOTTOM_RIGHT]: checkCellEmpty(
              value + CONST.BOTTOM_RIGHT,
            ),
          };
    },
    [checkCellEmpty],
  );

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return null;

      const {
        source: { index },
        destination: { droppableId },
      } = result;

      const diff =
        index > droppableId ? index - droppableId : droppableId - index;
      const isBeaten =
        diff !== CONST.BOARD_SIZE - 1 && diff !== CONST.BOARD_SIZE + 1;
      const beatenIndex =
        isBeaten && (index > droppableId ? index - diff / 2 : index + diff / 2);

      const checker = (red[index] || white[index]) as CheckerType;

      setGameState((prevState) => {
        const rivalsColor =
          checker.color === Colors.white ? Colors.red : Colors.white;
        const rivals = prevState[rivalsColor];
        const nextRivals = isBeaten
          ? { ...rivals, [beatenIndex]: null }
          : rivals;
        const nextChecker = {
          ...checker,
          value: +droppableId,
        };

        const canHitMore = beatenIndex && getBeatSteps(nextChecker, nextRivals);

        return {
          ...prevState,
          [rivalsColor]: nextRivals,
          [checker.color]: {
            ...prevState[checker.color],
            [index]: null,
            [+droppableId]: nextChecker,
          },
          turn: canHitMore ? checker.color : rivalsColor,
        };
      });
    },
    [getBeatSteps, red, white, setGameState],
  );

  const getAvailableSteps = useCallback(
    (checker: CheckerType) =>
      getBeatSteps(checker, getRivals(checker.color)) ||
      getDefaultSteps(checker),
    [getBeatSteps, getDefaultSteps, getRivals],
  );

  const onBeforeDragStart = useCallback(
    (initial: DragStart) => {
      const {
        source: { index },
      } = initial;
      const checker = (red[index] || white[index]) as CheckerType;

      setGameState((prevState) => ({
        ...prevState,
        availableSteps: getAvailableSteps(checker),
      }));
    },
    [red, white, getBeatSteps, getDefaultSteps, getRivals, setGameState],
  );

  const forceCheckers = useMemo(() => {
    const rivals = getRivals(turn);

    const forceCheckers: CheckerMap = Object.keys(currentCheckers).reduce(
      (acc, checker) => {
        const current = currentCheckers[+checker];
        const beatSteps = current && getBeatSteps(current, rivals);
        return current && beatSteps ? { ...acc, [current.value]: true } : acc;
      },
      {},
    );

    return Object.keys(forceCheckers).length ? forceCheckers : null;
  }, [getRivals, currentCheckers, turn, getBeatSteps]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onBeforeDragStart}>
      <Column>
        {CONST.BOARD_TABLE.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, cellIndex) => {
              if (!cell?.value) return <Cell key={cellIndex} />;

              const checker = red[cell.value] || white[cell.value] || null;
              const isForceMode = Boolean(checker && forceCheckers);
              const isGoForce = Boolean(
                checker && forceCheckers && forceCheckers[checker.value],
              );
              const disabled = Boolean(checker && checker.color !== turn);
              const isDropDisabled = Boolean(
                checker || !availableSteps[cell.value],
              );

              return (
                <DroppableCell
                  key={cellIndex}
                  checker={checker}
                  value={cell.value}
                  disabled={disabled}
                  isGoForce={isGoForce}
                  isForceMode={isForceMode}
                  isDropDisabled={isDropDisabled}
                />
              );
            })}
          </Row>
        ))}
      </Column>
    </DragDropContext>
  );
};

export default memo(ActiveBoard);
