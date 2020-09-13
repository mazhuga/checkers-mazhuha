import React, { FC, memo } from 'react';
import styled from 'styled-components';

import SideBorder from './side-border';
import CenterBorder from './center-border';

const BoardWrapper: FC = ({ children }) => (
  <Wrapper>
    <SideBorder />
    <CenteredContainer>
      <CenterBorder />
      {children}
      <CenterBorder />
    </CenteredContainer>
    <SideBorder />
  </Wrapper>
);

export default memo<FC>(BoardWrapper);

const Wrapper = styled.div`
  display: flex;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
