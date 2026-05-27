export const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-16'
  };
  return (
    <img 
      src={src || '/avatar.png'} 
      alt={alt || 'Avatar'} 
      className={`rounded-full object-cover border border-border dark:border-border-dark transition-all duration-200 ${sizeClasses[size]} ${className}`} 
    />
  );
};

export const Badge = ({ count, className = '', max = 99 }) => {
  if (!count) return null;
  const displayCount = count > max ? `${max}+` : count;
  return (
    <span 
      className={`px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary text-white min-w-[1.25rem] text-center ${className}`}
      aria-label={`${count} unread messages`}
    >
      {displayCount}
    </span>
  );
};

export const Button = ({ children, variant = 'primary', className = '', size = 'md', ...props }) => {
  const baseClasses = 'font-semibold transition-all active:scale-[0.98] shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-5 py-2.5 text-base rounded-xl'
  };
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  };
  return <button className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};
