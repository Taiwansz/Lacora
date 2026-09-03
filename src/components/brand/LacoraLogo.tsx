import React from 'react';
import Image from 'next/image';
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
    <Image
      src="/identity/mv-monogram.webp"
      alt=""
      width={761}
      height={1152}
      sizes="(max-width: 640px) 9rem, 12rem"
      className={cn(
        'shrink-0 object-contain',
        inverted && 'rounded-[42%] bg-[#F8F1DF] p-1',
        className
      )}
    />
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
