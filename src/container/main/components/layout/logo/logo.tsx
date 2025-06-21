import React from 'react';
import styled from '@emotion/styled';
import logoPng from './logo_NFT.png';

const LogoStyled = styled.img`
  width: 233px;
  height: 57px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  left: -2%;
  transform: translateX(0%);
`;

const Logo = () => {
  return <LogoStyled src={logoPng} alt={'logo'} />;
};

export default Logo;