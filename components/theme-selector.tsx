'use client';

import * as React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = [
  { name: 'default', icon: Palette },
  { name: 'forest', icon: Palette },
  { name: 'ocean', icon: Palette },
  { name: 'sunset', icon: Palette },
];

export function ThemeSelector() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const toggleDarkMode = () => {
    const currentTheme = theme.split('-')[0];
    const newTheme =
      resolvedTheme === 'dark' ? currentTheme : `${currentTheme}-dark`;
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {themes.map((t) => (
          <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)}>
            <t.icon className='mr-2 h-4 w-4' />
            <span className='capitalize'>{t.name}</span>
            {theme.startsWith(t.name) && <span className='ml-auto'>✓</span>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleDarkMode}>
          {resolvedTheme === 'dark' ? (
            <>
              <Sun className='mr-2 h-4 w-4' />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className='mr-2 h-4 w-4' />
              <span>Dark Mode</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
