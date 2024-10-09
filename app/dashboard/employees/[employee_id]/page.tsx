import { ScrollArea } from '@/components/ui/scroll-area';
import { getEmployeeById } from '../../_actions/get-employee-by-id';
import { DeleteEmployee } from '../delete-employee';
import EmployeeAttendanceInsights from './employee-insight';

interface EmployeeInfoPageProps {
  params: {
    employee_id: string;
  };
}

const EmployeeInfoPage = async ({
  params: { employee_id },
}: EmployeeInfoPageProps) => {
  const { employee, success, message } = await getEmployeeById(employee_id);

  return (
    <div>
      <ScrollArea className='h-[95vh]'>
        <EmployeeAttendanceInsights />
      </ScrollArea>
    </div>
  );
};

export default EmployeeInfoPage;
