import React from 'react';
import tokens from '../../styles/tokens';

const Badge = ({ count = 0, className = '' }) => {
  if (!count || count <= 0) return null;
  const display = count > 99 ? '99+' : String(count);
  return (
    <span className={[
      'inline-flex items-center justify-center min-w-[20px] px-2 py-0.5 rounded-full text-xs font-bold',
      tokens.colors.success,
      'text-white',
      className
    ].join(' ')} aria-label={`${display} unread`}>{display}</span>
  );
};

export default Badge;
