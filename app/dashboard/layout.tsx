import MotionProvider from '@/components/motion-provider';
import StoreSidebar from '@/components/side-bar';
import { Card, CardContent } from '@/components/ui/card';

interface LayoutProps {
  params: { store_identifier: string };
  children: React.ReactNode;
}

const layout = ({ children, params }: LayoutProps) => {
  return (
    <section>
      <div className='min-h-screen  p-4 flex gap-4 bg-[#0c0a09]'>
        {/* Sidebar */}
        <StoreSidebar />
        {/* Main Content */}
        <Card className='flex-1 h-[calc(100vh-2rem)] bg-black overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-[0.1px]'>
          <CardContent className='p-0 h-full flex flex-col'>
            {/* <Header /> */}
            <MotionProvider>{children}</MotionProvider>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default layout;
