import React from 'react';
import Input from '../Input';

export default {
  title: 'UI/Input',
  component: Input,
};

export const Default = () => <Input placeholder="Type here" />;
export const Error = () => <Input placeholder="Error" error />;
