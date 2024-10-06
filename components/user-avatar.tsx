import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface Props {
  fallback: string;
}

const UserAvatar = ({ fallback }: Props) => {
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage src='https://github.com/shadcn.pg' />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
