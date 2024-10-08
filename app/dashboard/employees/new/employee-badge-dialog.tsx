import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmployeeBadge } from '../employee-cards';

interface EmployeeBadgeDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  employeeId: string;
  avatarUrl: string;
  companyLogo: string;
}

const EmployeeBadgeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  firstName,
  lastName,
  position,
  department,
  employeeId,
  avatarUrl,
  companyLogo,
}: EmployeeBadgeDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='w-[22rem] h-[28rem]  flex flex-col items-center justify-center border-[0.1px]'>
        <div className=''>
          <EmployeeBadge
            name={`${firstName} ${lastName}`}
            position={position}
            department={department}
            employeeId={employeeId}
            avatarUrl={avatarUrl}
            companyLogo={companyLogo}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeBadgeDialog;
