import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'px-4 py-2 rounded-md font-medium transition-colors duration-200',
        variant === 'primary'
          ? 'bg-[#159A00] text-white hover:bg-[#128000] disabled:bg-[#159A00]/50'
          : variant === 'danger'
          ? 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400'
          : 'border-2 border-[#159A00] text-[#159A00] hover:bg-[#159A00]/10 disabled:border-[#159A00]/50 disabled:text-[#159A00]/50',
        disabled && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  );
} 