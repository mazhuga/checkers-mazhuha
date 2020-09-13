import React, { memo } from 'react';
import styled from 'styled-components';

import { BOARD_SIZE } from '../constants';

const column = Array(BOARD_SIZE).fill(null);

const SideBorder = () => (
  <Wrapper>
    {column.map((_: null, index: number) => (
      <SideBlock key={index}>{index + 1}</SideBlock>
    ))}
  </Wrapper>
);

export default memo(SideBorder);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: bold;
  background-color: #855827;
`;

const SideBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 80px;
  width: 40px;

  &:first-of-type {
    padding-top: 40px;
  }
`;
