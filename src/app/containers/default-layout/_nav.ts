import { INavData } from '@coreui/angular';
import { Role } from '../../services/role';
export const navItems: any = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-speedometer',
    // role: [Role.admin, Role.superAdmin, Role.installer, Role.resellers, Role.scanner, Role.scannerAndInstaller,Role.manager]
  },
  //{
  //  name: 'Users',
  //  url: '/user',
  //  icon: 'cil-user',
    // role: [],
  //  children: [
  //    {
  //      name: 'Users',
  //     url: '/user',
  //    },
  //    {
  //      name: 'User Groups',
  //      url: '/user/group',
  //    }
  //  ]
  //},

  {
    name: 'Users',
    url: '/user',
    icon: 'cil-user',
    // role: []
  },

  {
    name: 'Locations',
    url: '/locations',
    icon: 'cil-list',
    // role: []
  },
  {
    name: 'Devices',
    url: '/device',
    icon: 'cil-devices',
    // role: []
  },
  //{
  //  name: 'Devices',
  //  url: '/device',
  //  icon: 'cil-devices',
    // role: []
  //  children: [
  //    {
  //      name: 'Devices',
  //      url: '/device',
  //    },
  //    {
  //      name: 'Device Groups',
  //      url: '/device/group',
  //    }
  //  ]
  //},
  {
    name: 'Account',
    url: '/organization',
    icon: 'cil-sitemap',
    // role: []
  },
  {
    name: 'Alerts',
    url: '/approval-request',
    icon: 'cil-bullhorn',
    is_alert: true
    // role: []
  },
  // {
  //   name: 'Groups',
  //   url: '/group',
  //   icon: 'cil-chart-line',
  //   // role: [],
  //   children: [
  //     {
  //       name: 'User Group',
  //       url: '/group/user',
  //     },
  //     {
  //       name: 'Device Group',
  //       url: '/group/device',
  //     },
  //     {
  //       name: 'Assigned Group',
  //       url: '/group/assinged',
  //     }
  //   ],
  // },
  {
    name: 'Reports',
    url: '/report',
    icon: 'cil-chart-line',
    // role: [],
    children: [
      {
        name: 'Check-In',
        url: '/report/check-in',
      },
      {
        name: 'Log-In',
        url: '/report/log-in',
      },
    ],
  },
  {
    name: 'Settings',
    url: '/setting',
    icon: 'cil-settings',
    // role: [],
    children: [
      // {
      //   name: 'Organization',
      //   url: '/setting/organization',
      // },
      {
        name: 'Custom Parameters',
        url: '/setting/custom',
      },
      // {
      //   name: 'System Parametre',
      //   url: '/setting/system',
      // },
      {
        name: 'Mail Templates',
        url: '/setting/template',
      },
    ],
  },
  {
    name: 'Permissions',
    url: '/permission',
    icon: 'cil-devices',
    // role: []
  },
  {
    name: 'Logs',
    url: '/logs',
    icon: 'cil-list-rich',
    // role: []
  },
  
  // {
  //   name: 'Role Permission',
  //   url: '/role-permission',
  //   icon: 'cil-https',
  //   // role: []
  // },
  {
    name: 'App Info',
    url: '/info',
    icon: 'cil-info',
    // role: []
  },
];
