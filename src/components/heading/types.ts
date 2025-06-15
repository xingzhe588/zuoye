import { ReactNode } from 'react';

export enum HeadingVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4'
}

export interface HeadingProps {
  children?: ReactNode;
  variant?: HeadingVariant;
  className?: string;
}