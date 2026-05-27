import React from 'react';
import Button from '../Button';

export default {
  title: 'UI/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Primary</Button>;
export const Ghost = () => <Button variant="ghost">Ghost</Button>;
export const Danger = () => <Button variant="danger">Delete</Button>;
