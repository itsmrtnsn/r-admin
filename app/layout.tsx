import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { geistSans, inter } from './fonts';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'antialiased bg-gray-100 max-h-screen',
          geistSans.className
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute='class' defaultTheme='light'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
