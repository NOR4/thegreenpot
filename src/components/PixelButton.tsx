import React from 'react';
import { cn } from '../utils/cn'; // We'll need a utility for class merging, or just template literals if simple

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const PixelButton = ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    ...props
}: PixelButtonProps) => {
    const baseStyles = 'font-retro border-4 border-black shadow-hard transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-[#4ade80] text-black hover:bg-[#22c55e]',
        secondary: 'bg-white text-black hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600'
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base'
    };

    // Simple class merging with cn utility
    const classes = cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
    );

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
