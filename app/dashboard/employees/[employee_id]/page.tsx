import { getEmployeeById } from '../../_actions/get-employee-by-id';
import { DeleteEmployee } from '../delete-employee';

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
    <div className='h-[calc(100vh-10rem)] flex items-center justify-center flex-col'>
      <h1>
        {employee?.firstName} {employee?.lastName}
      </h1>

      <DeleteEmployee employeeId={employee_id} />
    </div>
  );
};

export default EmployeeInfoPage;
