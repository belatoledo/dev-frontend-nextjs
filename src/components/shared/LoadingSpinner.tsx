import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
};

export const LoadingSpinner = ({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) => {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground',
        className
      )}
    >
      <LoaderCircle
        className={cn('animate-spin text-cyan-500', iconSizes[size])}
      />
      {text && <p className={cn(textSizes[size])}>{text}</p>}
    </div>
  );
};
