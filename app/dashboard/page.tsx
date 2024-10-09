import { SonnerDemo } from '@/components/toast-button';
import { Card, CardContent } from '@/components/ui/card';

const DashboardPage = () => {
  return (
    <div className='h-[80vh] flex items-center justify-center w-full'>
      <div className=''>
        <Card>
          <CardContent>
            <SonnerDemo />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
