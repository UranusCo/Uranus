import React from 'react';
import { useEffect } from 'react';
import MessageItem from '../../MessageItem';
import { useAuthStore } from '../../../store/useAuthStore';

export default {
  title: 'UI/MessageItem',
  component: MessageItem,
};

const Template = (args) => {
  useEffect(() => {
    useAuthStore.setState({ authUser: { _id: 'user-1', fullName: 'Me' } });
  }, []);

  return <MessageItem {...args} />;
};

const message = {
  _id: 'msg-1',
  senderId: 'user-2',
  text: 'Here is a quick update. Check the link: https://example.com',
  createdAt: new Date().toISOString(),
  reactions: { '❤️': ['user-1'] },
  isRead: true,
  isPinned: false,
};

export const Default = Template.bind({});
Default.args = {
  message,
  index: 0,
  messagesLength: 1,
  messages: [message],
  messageEndRef: { current: null },
  selectedUser: { _id: 'user-2', fullName: 'Alice', profilePic: '/avatar.png' },
  activeMessageMenu: null,
  openMessageMenu: () => {},
  closeMessageMenu: () => {},
  addReaction: () => {},
  removeReaction: () => {},
  markViewOnceOpened: () => {},
};
