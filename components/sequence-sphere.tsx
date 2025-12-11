"use client";

import { formatSequence } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface SequenceSphereProps {
  sequence: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'w-24 h-24 text-xs',
    text: 'text-[10px]',
  },
  md: {
    container: 'w-32 h-32 text-sm',
    text: 'text-xs',
  },
  lg: {
    container: 'w-40 h-40 text-base',
    text: 'text-sm',
  },
  xl: {
    container: 'w-48 h-48 md:w-56 md:h-56 text-lg',
    text: 'text-base',
  },
};

export function SequenceSphere({ sequence, size = 'md', className }: SequenceSphereProps) {
  const formattedSequence = formatSequence(sequence);
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400',
        'dark:from-gray-600 dark:via-gray-700 dark:to-gray-800',
        'shadow-[inset_-5px_-5px_15px_rgba(255,255,255,0.8),inset_5px_5px_15px_rgba(0,0,0,0.3)]',
        'dark:shadow-[inset_-5px_-5px_15px_rgba(255,255,255,0.2),inset_5px_5px_15px_rgba(0,0,0,0.5)]',
        'border-2 border-gray-300 dark:border-gray-600',
        'transition-all duration-300 hover:scale-105',
        'cursor-default select-none',
        sizes.container,
        className
      )}
      style={{
        boxShadow: `
          inset -8px -8px 20px rgba(255, 255, 255, 0.9),
          inset 8px 8px 20px rgba(0, 0, 0, 0.25),
          0 10px 25px rgba(0, 0, 0, 0.2),
          0 5px 10px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* Brillo superior (highlight) */}
      <div
        className="absolute top-[15%] left-[25%] w-[30%] h-[30%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Número en 3D */}
      <span
        className={cn(
          'relative z-10 font-bold text-center px-2',
          'text-gray-800 dark:text-gray-200',
          'tracking-wide',
          sizes.text
        )}
        style={{
          textShadow: `
            1px 1px 2px rgba(0, 0, 0, 0.3),
            -1px -1px 2px rgba(255, 255, 255, 0.5),
            2px 2px 4px rgba(0, 0, 0, 0.2)
          `,
          transform: 'translateZ(10px)',
          letterSpacing: '0.05em',
        }}
      >
        {formattedSequence}
      </span>

      {/* Reflejo inferior */}
      <div
        className="absolute bottom-[10%] w-[60%] h-[20%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
}
