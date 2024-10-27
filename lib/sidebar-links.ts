import { GiMoneyStack } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { SiGooglemarketingplatform, SiSimpleanalytics } from 'react-icons/si';
import { FaStoreAlt } from 'react-icons/fa';

const sidebarItems: {
  icon: React.ElementType;
  name: string;
  subitems: {
    name: string;
    icon: React.ElementType;
    path: string;
    subitems?: {
      name: string;
      icon: React.ElementType;
      path: string;
    }[];
  }[];
}[] = [
  {
    icon: FaStoreAlt,
    name: 'Store',
    subitems: [
      {
        name: 'Make a Sale',
        icon: MdDashboardCustomize,
        path: '/dashboard/sales',
      },
      {
        name: 'Articles',
        path: '/dashboard/products',
        icon: MdDashboardCustomize,
      },
      // {
      //   name: 'Aperçu',
      //   icon: MdDashboardCustomize,
      //   path: '/overview',
      // },
      {
        name: 'Clients',
        icon: MdDashboardCustomize,
        path: '/clients',
      },
      {
        name: 'Rapports',
        icon: MdDashboardCustomize,
        path: '/dashboard/reports',
      },
    ],
  },
  {
    icon: SiGooglemarketingplatform,
    name: 'Gestion des employés',
    subitems: [
      {
        name: 'Employés',
        icon: MdDashboardCustomize,
        path: '/dashboard/employees',
      },
      {
        name: 'Présence',
        icon: MdDashboardCustomize,
        path: '/dashboard/attendance',
      },
      {
        name: 'Rapport de présence',
        icon: MdDashboardCustomize,
        path: '/dashboard/attendance-report',
      },
    ],
  },

  {
    icon: GiMoneyStack,
    name: 'Finances',
    subitems: [
      {
        name: 'Revenu',
        icon: MdDashboardCustomize,
        path: '/finances/income',
      },
      {
        name: 'Dépenses',
        icon: MdDashboardCustomize,
        path: '/finances/expenses',
      },
    ],
  },
  {
    icon: IoSettings,
    name: 'Paramètres',
    subitems: [
      {
        name: 'Compte',
        icon: MdDashboardCustomize,
        path: '/settings/account',
      },

      {
        name: 'Notifications',
        icon: MdDashboardCustomize,
        path: '/settings/notifications',
      },

      {
        name: 'Préférences',
        icon: MdDashboardCustomize,
        path: '/settings/preferences',
      },
    ],
  },
];

export default sidebarItems;
