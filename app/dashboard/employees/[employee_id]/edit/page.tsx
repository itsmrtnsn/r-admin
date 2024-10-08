import { getEmployeeById } from '@/app/dashboard/_actions/get-employee-by-id';
import { EditEmployeeFormData } from '@/app/dashboard/_types/edit-employee-form-data';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToastContainer } from 'react-toastify';
import BackButton from '../../new/back-button';
import EditEmployeeForm from './edit-employee-form';
interface EmployeeInfoPageProps {
  params: {
    employee_id: string;
  };
}

const EditEmployee = async ({
  params: { employee_id },
}: EmployeeInfoPageProps) => {
  const { employee, success } = await getEmployeeById(employee_id);
  if (!success) {
    return <div>Error</div>;
  }
  return (
    <div className='p-8'>
      <div className='mb-4 space-y-2.5'>
        <div className='flex  gap-2'>
          <BackButton />
          <div className=''>
            <h1 className='text-3xl font-medium'>Mortensen Ulysse</h1>
            <p className='text-sm text-muted-foreground'>
              Veuillez modifier les informations de l'employé ci-dessous.
              {employee_id}
            </p>
          </div>
        </div>
      </div>
      <Card className='shadow-none border-[0.1px] bg-[#0a0a0a] '>
        <CardContent className='pt-4'>
          <ScrollArea className='h-[67vh]'>
            <EditEmployeeForm
              employeeId={employee_id}
              initialData={employee as unknown as EditEmployeeFormData}
            />
          </ScrollArea>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default EditEmployee;
