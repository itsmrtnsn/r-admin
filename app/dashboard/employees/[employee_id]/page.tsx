import { getEmployeeById } from '../../_actions/get-employee-by-id';

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
      <h1>
        {employee?.firstName} {employee?.lastName}
      </h1>
    </div>
  );
};

export default EmployeeInfoPage;
