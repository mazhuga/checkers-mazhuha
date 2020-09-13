import React from 'react';

import BoardWrapper from './components/board-wrapper';
import ActiveBoard from './components/active-board';
import Statistics from './components/game-statistics';
import { useGameState } from './hooks';

const Checkers = () => {
  const {
    gameState,
    setGameState,
    revertLastMove,
    canRevert,
    startNewGame,
  } = useGameState();

  return (
    <>
      <BoardWrapper>
        <ActiveBoard gameState={gameState} setGameState={setGameState} />
      </BoardWrapper>
      <Statistics
        revertLastMove={revertLastMove}
        canRevert={canRevert}
        startNewGame={startNewGame}
        turn={gameState.turn}
      />
    </>
  );
};

export default Checkers;
