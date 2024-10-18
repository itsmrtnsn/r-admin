import MotionProvider from '@/components/motion-provider';
import StoreSidebar from '@/components/side-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  params: { store_identifier: string };
  children: React.ReactNode;
}

const layout = ({ children, params }: LayoutProps) => {
  return (
    <section>
      <div className='min-h-screen  p-4 flex gap-4'>
        {/* Sidebar */}
        <StoreSidebar />
        {/* Main Content */}
        <Card className='flex-1 h-[calc(100vh-2rem) overflow-hidden border-[0.1px]'>
          <CardContent className='p-0 h-full flex flex-col bg-zinc-900'>
            <MotionProvider>{children}</MotionProvider>
          </CardContent>
          <Toaster position='top-right' richColors />
        </Card>
      </div>
    </section>
  );
};

export default layout;
