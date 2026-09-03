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
  const seam = inverted ? '#111B3A' : '#F8F1DF';
  const leftPetal = inverted ? '#C77A8B' : '#7A2738';
  const rightPetal = inverted ? '#F8F1DF' : '#111B3A';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className={cn('shrink-0', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={inverted ? '#D7A1AD' : '#A95768'} strokeLinecap="round" strokeWidth="1.5">
        <path d="M40 4v10" />
        <path d="m25.5 7.9 4.2 9.1" />
        <path d="m14.1 17 7.7 6.4" />
        <path d="M8 30.1l9.9 1.3" />
        <path d="m54.5 7.9-4.2 9.1" />
        <path d="m65.9 17-7.7 6.4" />
        <path d="M72 30.1l-9.9 1.3" />
      </g>
      <path
        d="M39.9 18.1c-7.2 0-12.4 5.4-12.4 12.7 0 4.5 1.9 7.4 5.5 10.8-3.6 10.1-10.5 18.7-21 25.4 14.5.8 25-4.3 30.1-14.7 4.8-9.9 4.1-22.4-2.2-34.2Z"
        fill={leftPetal}
      />
      <path
        d="M40.1 18.1c7.2 0 12.4 5.4 12.4 12.7 0 4.5-1.9 7.4-5.5 10.8 3.6 10.1 10.5 18.7 21 25.4-14.5.8-25-4.3-30.1-14.7-4.8-9.9-4.1-22.4 2.2-34.2Z"
        fill={rightPetal}
      />
      <path
        d="M40 19.2c-5.4 3.8-7.8 9.2-7.1 16.2.4 4.5 2.2 8.4 5.1 11.8"
        stroke={seam}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M40 19.2c5.4 3.8 7.8 9.2 7.1 16.2-.4 4.5-2.2 8.4-5.1 11.8"
        stroke={seam}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
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
    <div className={cn('flex items-center gap-3', className)}>
      <LacoraMark
        inverted={inverted}
        className={cn(compact ? 'h-9 w-9' : 'h-12 w-12', markClassName)}
      />
      {!compact && (
        <div className="min-w-0">
          <span
            className={cn(
              'brand-wordmark block text-[2rem] leading-[0.9] tracking-[-0.045em]',
              inverted ? 'text-[#F8F1DF]' : 'text-[#111B3A]'
            )}
          >
            Laçora
          </span>
          <span
            className={cn(
              'mt-1.5 block text-[9px] font-medium tracking-[0.12em]',
              inverted ? 'text-[#D7A1AD]' : 'text-[#7A2738]'
            )}
          >
            DO PRIMEIRO PLANO AO GRANDE DIA
          </span>
        </div>
      )}
    </div>
  );
}
