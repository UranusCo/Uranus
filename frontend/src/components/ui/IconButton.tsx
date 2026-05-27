import React from 'react';
import tokens from '../../styles/tokens';

const IconButton = ({ children, variant = 'ghost', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  
  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const variants = {
    ghost: `text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60`,
    active: `${tokens.colors.primary} text-white shadow-sm`,
    subtle: `bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`,
  };
  return (
    <button className={[base, sizes[size], variants[variant], className].join(' ')} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const iconSizes = { sm: 16, md: 20, lg: 24 };
          return React.cloneElement(child, { size: child.props.size || iconSizes[size] });
        }
        return child;
      })}
    </button>
  );
};

export default IconButton;
