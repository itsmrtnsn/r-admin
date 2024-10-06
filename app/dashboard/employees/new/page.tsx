import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import BackButton from './back-button';
import EmployeeRegistrationForm from './registration-form';

const NewEmployee = () => {
  return (
    <div className='p-8'>
      <div className='mb-6 space-y-2.5'>
        <div className='flex items-center gap-2'>
          <BackButton />
          <h1 className='text-4xl font-medium'>Créer un nouvel employé</h1>
        </div>
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
