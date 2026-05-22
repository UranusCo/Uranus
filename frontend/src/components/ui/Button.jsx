import React from 'react';
import tokens from '../../styles/tokens';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50';
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  const variants = {
    primary: `${tokens.colors.primary} text-white hover:${tokens.colors.primaryDark}`,
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200',
    danger: `${tokens.colors.danger} text-white hover:bg-red-700`
  };

  return (
    <button className={[base, sizes[size], variants[variant], className].join(' ')} {...props}>
      {children}
    </button>
  );
};

export default Button;
