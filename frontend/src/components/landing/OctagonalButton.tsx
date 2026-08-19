'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface OctagonalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'border' | 'sm';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function OctagonalButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon = true,
  type = 'button',
  disabled = false,
}: OctagonalButtonProps) {
  const variantClass = {
    primary: 'btn-cut',
    border: 'btn-cut-border',
    sm: 'btn-cut-sm',
  }[variant];

  const content = (
    <span className="flex items-center gap-2 relative z-10">
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className={`transition-transform duration-300 group-hover:translate-x-1.5 ${
            variant === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
          }`}
        />
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${variantClass} group ${className}`}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variantClass} group ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
    >
      {content}
    </button>
  );
}
