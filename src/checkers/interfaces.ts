export enum Colors {
  red = 'red',
  white = 'white',
}

export type Cell = {
  value: number;
};

export type CheckerType = {
  value: number;
  color: Colors;
};

export type CheckerMap = {
  [key: number]: CheckerType | null;
};

export interface GameState {
  red: CheckerMap;
  white: CheckerMap;
  forceChecker: {
    [key: number]: boolean;
  };
  availableSteps: {
    [key: number]: boolean;
  };
  turn: Colors;
}
