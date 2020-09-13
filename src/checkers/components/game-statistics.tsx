import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { Colors } from '../interfaces';

interface Props {
  turn: Colors;
  canRevert: boolean;
  revertLastMove: () => void;
  startNewGame: () => void;
}

const Actions: FC<Props> = (props) => {
  const { revertLastMove, canRevert, startNewGame, turn } = props;

  return (
    <Wrapper>
      <Button type="button" onClick={revertLastMove} disabled={!canRevert}>
        Reverting last move
      </Button>
      <Button type="button" onClick={startNewGame}>
        Start new game
      </Button>
      <Text>Turn: {turn}</Text>
    </Wrapper>
  );
};

export default memo(Actions);

const Wrapper = styled.div`
  display: flex;
  align-items: start;
`;

const Button = styled.button`
  border: none;
  background-color: #c2c2c2;
  color: #000000;
  cursor: pointer;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;

  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }
`;

const Text = styled.span`
  margin: 10px;
  padding: 15px 32px;
`;
