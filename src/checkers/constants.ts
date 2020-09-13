import { Cell, CheckerMap, Colors, GameState } from './interfaces';

export const LOCAL_STORE_KEY = 'checkers';
export const ALPHABET_START = 97;
export const BOARD_SIZE = 8;
export const ACTIVE_CHECKERS = BOARD_SIZE * 1.5;
export const BOTTOM_LEFT = BOARD_SIZE - 1;
export const BOTTOM_RIGHT = BOARD_SIZE + 1;
export const TOP_LEFT = -BOARD_SIZE - 1;
export const TOP_RIGHT = -BOARD_SIZE + 1;

export const DIRECTIONS = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];

const BOARD_ROW_ODD = Array(BOARD_SIZE)
  .fill(null)
  .map((_, index) => index % 2);
const BOARD_ROW_EVEN = [...BOARD_ROW_ODD].reverse();

export const BOARD_TABLE: (Cell | null)[][] = Array(BOARD_SIZE)
  .fill(null)
  .map((_, rowIndex) => {
    const row = rowIndex % 2 ? BOARD_ROW_EVEN : BOARD_ROW_ODD;
    return row.map((value, cellIndex) =>
      value
        ? {
            value: BOARD_SIZE * rowIndex + cellIndex + 1,
          }
        : null,
    );
  });

export const ACTIVE_CELLS: Cell[] = BOARD_TABLE.flat().filter(
  (cell) => !!cell,
) as Cell[];
export const ACTIVE_CELLS_MAP: CheckerMap = ACTIVE_CELLS.reduce(
  (acc, cell) => ({ ...acc, [cell.value]: cell }),
  {},
);

export const INITIAL_GAME_STATE: GameState = {
  red: ACTIVE_CELLS.slice(0, ACTIVE_CHECKERS).reduce(
    (acc, element) => ({
      ...acc,
      [element.value]: {
        ...element,
        color: Colors.red,
      },
    }),
    {},
  ),
  white: ACTIVE_CELLS.slice(
    ACTIVE_CELLS.length - ACTIVE_CHECKERS,
    ACTIVE_CELLS.length,
  ).reduce(
    (acc, element) => ({
      ...acc,
      [element.value]: {
        ...element,
        color: Colors.white,
      },
    }),
    {},
  ),
  turn: Colors.white,
  forceChecker: {},
  availableSteps: {},
};
