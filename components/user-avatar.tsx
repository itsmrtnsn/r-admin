import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const UserAvatar = () => {
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
