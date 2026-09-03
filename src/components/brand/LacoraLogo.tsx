import React from 'react';
import { cn } from '@/lib/utils';

type LacoraLogoProps = {
  compact?: boolean;
  inverted?: boolean;
  className?: string;
  markClassName?: string;
};

export function LacoraMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 118"
      className={cn('shrink-0', className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="45"
        y="66"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Iowan Old Style, Baskerville, Times New Roman, serif"
        fontSize="76"
        fontWeight="500"
        fill={inverted ? '#F8F1DF' : '#111B3A'}
      >
        M
      </text>
      <text
        x="54"
        y="112"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Iowan Old Style, Baskerville, Times New Roman, serif"
        fontSize="70"
        fontWeight="400"
        fill={inverted ? '#F8F1DF' : '#111B3A'}
      >
        V
      </text>
    </svg>
  );
}

export function LacoraLogo({
  compact = false,
  inverted = false,
  className,
  markClassName,
}: LacoraLogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <LacoraMark
        inverted={inverted}
        className={cn(compact ? 'h-10 w-9' : 'h-14 w-12', markClassName)}
      />
    </div>
  );
}
