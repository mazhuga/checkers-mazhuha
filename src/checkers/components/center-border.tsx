import React, { memo } from 'react';

import styled from 'styled-components';

import { ALPHABET_START, BOARD_SIZE } from '../constants';

const row = Array(BOARD_SIZE).fill(null);

const CenterBorder = () => (
  <Wrapper>
    {row.map((_: null, index: number) => (
      <CenterBlock key={index}>
        {String.fromCharCode(index + ALPHABET_START)}
      </CenterBlock>
    ))}
  </Wrapper>
);

export default memo(CenterBorder);

const Wrapper = styled.div`
  display: flex;
  color: white;
  font-weight: bold;
  background-color: #855827;
`;

const CenterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 80px;
  height: 40px;
`;
