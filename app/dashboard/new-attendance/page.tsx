import CurrentPath from '@/components/curren-path';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AttendanceForm from './attendance-form';
import CurrentTime from './current-time';
import { endOfDay, startOfDay } from 'date-fns';

export default function EmployeeAttendance() {
  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <CurrentPath />
        <CurrentTime />
      </div>
      <div className='h-[80vh] flex items-center justify-center'>
        <Card className='w-full h-[20rem] max-w-lg bg-slate-50/50 border-[0.1px] shadow-none'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              Présence des employés
            </CardTitle>
            <CardDescription>
              Enregistrer la présence à l'aide de l'identifiant de l'employé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
