import React from 'react';
import { HeadingStyled } from './index.style';
import { HeadingProps, HeadingVariant } from './types';

const Heading = ({ children, variant = HeadingVariant.h1, className }: HeadingProps) => {
  return (
    <HeadingStyled className={className} as={variant} variant={variant}>
      {children}
    </HeadingStyled>
  );
};

export default Heading;