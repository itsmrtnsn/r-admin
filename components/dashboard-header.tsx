import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { UserProfileTrigger } from './profile-trigger';

const Header = () => {
  return (
    <Card className='bg-white  sticky top-0 backdrop-blur-0 m-4  shadow-none border-[0.1px] border-gray-200'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center space-x-4 flex-1'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
            <Input
              type='search'
              placeholder='Search...'
              className='pl-8 bg-muted/50 border-[0.1px]  rounded-full shadow-none bg-slate-50 border-slate-200'
            />
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <Button
            variant='outline'
            size='icon'
            className='relative rounded-full'
          >
            <Bell className='h-4 w-4' />
            <span className='absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full'></span>
          </Button>
          <UserProfileTrigger />
        </div>
      </div>
    </Card>
  );
};

export default Header;
