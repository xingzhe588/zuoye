import styled from '@emotion/styled';
import { HeadingVariant } from './types';
import { css } from '@emotion/react';

export const HeadingStyled = styled.h1<{ variant?: HeadingVariant }>`
  font-size: 32px;
  font-weight: bold;
  color: blue;
  width: 100%;
  @media (min-width: 768px) {
    font-size: 38px;
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 100%;
  }

  ${({ variant }) => {
    switch (variant) {
      case HeadingVariant.h2:
        return css`
          font-size: 24px;
        `;
      case HeadingVariant.h3:
        return css`
          font-size: 18px;
        `;
      case HeadingVariant.h4:
        return css`
          font-size: 14px;
        `;
    }
    return css``;
  }}
`;