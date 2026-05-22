import React, { useEffect } from 'react';
import MessageInput from '../../MessageInput';
import { useChatStore } from '../../../store/useChatStore';
import { useAuthStore } from '../../../store/useAuthStore';

export default {
  title: 'UI/MessageInput',
  component: MessageInput,
};

const Template = () => {
  useEffect(() => {
    useChatStore.setState({
      selectedUser: { _id: 'user-2', fullName: 'Alice', profilePic: '/avatar.png' },
      drafts: {},
    });
    useAuthStore.setState({ authUser: { _id: 'user-1', fullName: 'Me', email: 'me@example.com' } });
  }, []);

  return <MessageInput />;
};

export const Default = Template.bind({});
