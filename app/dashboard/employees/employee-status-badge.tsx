import { Badge } from '@/components/ui/badge';
import { EmployeeStatus } from '@prisma/client';

interface Props {
  status: EmployeeStatus;
}

const EmployeeStatusBadge = ({ status }: Props) => {
  const getStatusDetails = (status: EmployeeStatus) => {
    switch (status) {
      case 'en_attente':
        return {
          label: 'En attente',
          className: 'bg-slate-700/20 text-slate-500 border-slate-600/30',
        };
      case 'actif':
        return {
          label: 'Actif',
          className: 'bg-green-700/20 text-green-500 border-green-600/30',
        };
      case 'inactif':
        return {
          label: 'Inactif',
          className: 'bg-yellow-300/20 text-yellow-600 border-yellow-400/30',
        };
      case 'en_vacances':
        return {
          label: 'En vacances',
          className: 'bg-yellow-700/20 text-yellow-500 border-yellow-600/30',
        };
      case 'licencie':
        return {
          label: 'Licencié',
          className: 'bg-red-800/20 text-red-700 border-red-900/30',
        };
      case 'retraite':
        return {
          label: 'Retraité',
          className: 'bg-blue-700/20 text-blue-500 border-blue-600/30',
        };
      case 'demissionne':
        return {
          label: 'Démissionné',
          className: 'bg-orange-700/20 text-orange-500 border-orange-600/30',
        };
      default:
        return {
          label: 'Inconnu',
          className: 'bg-gray-700/20 text-gray-500 border-gray-600/30',
        };
    }
  };

  const { label, className } = getStatusDetails(status);

  return (
    <Badge
      variant='outline'
      className={`px-2 py-1 text-xs font-medium ${className}`}
    >
      {label}
    </Badge>
  );
};

export default EmployeeStatusBadge;
