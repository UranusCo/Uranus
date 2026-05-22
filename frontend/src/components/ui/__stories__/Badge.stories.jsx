import React from 'react';
import Badge from '../Badge';

export default {
  title: 'UI/Badge',
  component: Badge,
};

export const Default = () => <Badge count={3} />;
export const Overflow = () => <Badge count={120} />;
export const Hidden = () => <Badge count={0} />;
