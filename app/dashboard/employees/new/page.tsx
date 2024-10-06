import { ScrollArea } from '@/components/ui/scroll-area';
import EmployeeRegistrationForm from './registration-form';
import { Card, CardContent } from '@/components/ui/card';

const NewEmployee = () => {
  return (
    <div className='p-8'>
      <div className='mb-6 space-y-2'>
        <h1 className='text-3xl font-bold'>Créer un nouvel employé</h1>
        <p className='text-sm text-muted-foreground'>
          Veuillez remplir le formulaire ci-dessous pour inscrire un nouvel
          employé.
        </p>
      </div>
      <Card className='shadow-none border-[0.1px] bg-gradient-to-br from-[#0c0a09] to-[#0a0a0a]'>
        <CardContent className='pt-4'>
          <ScrollArea className='h-[70vh]'>
            <EmployeeRegistrationForm />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEmployee;
