import { GiMoneyStack } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { SiGooglemarketingplatform, SiSimpleanalytics } from 'react-icons/si';

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
    icon: MdDashboardCustomize,
    name: 'Dashboard',
    subitems: [
      {
        name: 'Make a Sale',
        icon: MdDashboardCustomize,
        path: '/dashboard/sales',
      },
      {
        name: 'Overview',
        icon: MdDashboardCustomize,
        path: '/overview',
      },
      {
        name: 'Analytics',
        icon: MdDashboardCustomize,
        path: '/analytics',
      },
      {
        name: 'Reports',
        icon: MdDashboardCustomize,
        path: '/reports',
      },
    ],
  },
  {
    icon: SiGooglemarketingplatform,
    name: 'Management',
    subitems: [
      {
        name: 'Employees',
        icon: MdDashboardCustomize,
        path: '/dashboard/employees',
      },
      {
        name: 'Attendance',
        icon: MdDashboardCustomize,
        path: '/dashboard/attendance',
      },
      {
        name: 'Attendance Report',
        icon: MdDashboardCustomize,
        path: '/dashboard/attendance-report',
      },
    ],
  },

  {
    icon: SiSimpleanalytics,
    name: 'Analytics',
    subitems: [
      {
        name: 'Sales Report',
        icon: MdDashboardCustomize,
        path: 'sales-report',
      },
      {
        name: 'Customer Insights',
        icon: MdDashboardCustomize,
        path: '/analytics/customer-insights',
      },
      {
        name: 'Product Performance',
        icon: MdDashboardCustomize,
        path: '/product-performance',
      },
    ],
  },
  {
    icon: GiMoneyStack,
    name: 'Finances',
    subitems: [
      {
        name: 'Income',
        icon: MdDashboardCustomize,
        path: '/finances/income',
      },
      {
        name: 'Expenses',
        icon: MdDashboardCustomize,
        path: '/finances/expenses',
      },
    ],
  },
  {
    icon: IoSettings,
    name: 'Settings',
    subitems: [
      {
        name: 'Account',
        icon: MdDashboardCustomize,
        path: '/settings/account',
      },
      {
        name: 'API',
        icon: MdDashboardCustomize,
        path: '/settings/api',
      },
      {
        name: 'Notifications',
        icon: MdDashboardCustomize,
        path: '/settings/notifications',
      },
      {
        name: 'Integrations',
        icon: MdDashboardCustomize,
        path: '/settings/integrations',
      },

      {
        name: 'Organization',
        icon: MdDashboardCustomize,
        path: '/settings/organization',
      },
      {
        name: 'Preferences',
        icon: MdDashboardCustomize,
        path: '/settings/preferences',
      },
    ],
  },
];

export default sidebarItems;
