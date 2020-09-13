import { useCallback, useEffect, useRef, useState } from 'react';

import { INITIAL_GAME_STATE, LOCAL_STORE_KEY } from './constants';

export const usePreviousState = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  const dropPreviousState = useCallback(() => {
    ref.current = undefined;
  }, []);

  return { previousState: ref.current, dropPreviousState };
};

const useStorageState = <T>(initialState: T) => {
  const [storageValue, setStorage] = useState(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORE_KEY);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storageValue) : value;
      setStorage(valueToStore);
      window.localStorage.setItem(
        LOCAL_STORE_KEY,
        JSON.stringify(valueToStore),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storageValue, setValue];
};

export const useGameState = () => {
  const [gameState, setGameState] = useStorageState(INITIAL_GAME_STATE);
  const { previousState, dropPreviousState } = usePreviousState(gameState);

  const revertLastMove = useCallback(() => {
    if (previousState) {
      setGameState(previousState);
      dropPreviousState();
    }
  }, [setGameState, previousState, dropPreviousState]);

  const startNewGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    dropPreviousState();
  }, [setGameState, dropPreviousState]);

  return {
    gameState,
    setGameState,
    startNewGame,
    revertLastMove,
    canRevert: !!previousState,
  };
};
