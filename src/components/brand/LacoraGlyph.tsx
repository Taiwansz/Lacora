import React from 'react';
import { cn } from '@/lib/utils';

export type LacoraGlyphName =
  | 'planning'
  | 'guests'
  | 'budget'
  | 'timeline'
  | 'vendors'
  | 'website';

type LacoraGlyphProps = {
  name: LacoraGlyphName;
  className?: string;
  title?: string;
};

const glyphs: Record<LacoraGlyphName, React.ReactNode> = {
  planning: (
    <>
      <path d="M7 4.5h8.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
      <path d="M8.5 10.5 10.7 13l4.8-5" />
      <path d="M8.5 16h5" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.8 19c.5-3.2 2.2-4.8 5.2-4.8s4.7 1.6 5.2 4.8" />
      <path d="M15.5 7.2a2.6 2.6 0 0 1 0 5.1M16 14.7c2.5.3 3.8 1.7 4.2 4.3" />
    </>
  ),
  budget: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M14.8 8.7c-.6-.5-1.5-.8-2.6-.8-1.5 0-2.7.8-2.7 2s1 1.7 2.8 2.1c1.7.4 2.7 1 2.7 2.2 0 1.3-1.2 2.1-2.8 2.1-1.2 0-2.2-.4-3-1" />
      <path d="M12.2 6.3v11.4" />
    </>
  ),
  timeline: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 7.5v5l3.5 2" />
      <path d="M8.5 3.5 7.3 2.2M15.5 3.5l1.2-1.3" />
    </>
  ),
  vendors: (
    <>
      <path d="m4.2 11 4.1-4.1a2.2 2.2 0 0 1 3.1 0l1.3 1.3" />
      <path d="m19.8 11-4.1-4.1a2.2 2.2 0 0 0-3.1 0l-2.4 2.4a1.7 1.7 0 0 0 2.4 2.4l1.5-1.5" />
      <path d="m5.4 12.2 5.1 5.1a2.1 2.1 0 0 0 3 0l4.9-5.1" />
      <path d="m8.2 15 1.3-1.3M11 17.2l1.1-1.1" />
    </>
  ),
  website: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 9h16" />
      <path d="M8 7h.01M11 7h.01" />
      <path d="M8 13.5c1.4-1.8 2.8-1.8 4.1 0 1.3-1.8 2.7-1.8 4.1 0" />
    </>
  ),
};

export function LacoraGlyph({ name, className, title }: LacoraGlyphProps) {
  return (
    <span
      className={cn(
        'lacora-glyph inline-flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-current/15 bg-current/[0.06]',
        className
      )}
    >
      <svg
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {title && <title>{title}</title>}
        {glyphs[name]}
      </svg>
    </span>
  );
}
