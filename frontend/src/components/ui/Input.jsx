import React from 'react';
import tokens from '../../styles/tokens';

const Input = React.forwardRef(({ className = '', error = false, ...props }, ref) => {
  const base = 'w-full px-3 py-2 rounded-2xl border transition focus:outline-none';
  const state = error ? 'border-red-400 bg-red-50' : `${tokens.colors.border} ${tokens.colors.surface}`;
  return (
    <input
      ref={ref}
      className={[base, state, className].join(' ')}
      aria-invalid={error}
      {...props}
    />
  );
});

export default Input;
