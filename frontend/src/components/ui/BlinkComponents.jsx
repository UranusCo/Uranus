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
      alt={alt} 
      className={`rounded-full object-cover border border-border dark:border-border-dark ${sizeClasses[size]} ${className}`} 
    />
  );
};

export const Badge = ({ count, className = '' }) => {
  if (!count) return null;
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary text-white ${className}`}>
      {count}
    </span>
  );
};

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] shadow-soft';
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
  };
  return <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};
