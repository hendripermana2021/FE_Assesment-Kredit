// assets
import { IconKey, IconUser, IconUsers, IconBuildingBank, IconListCheck } from '@tabler/icons-react'; // Adjusted icons

// constant
const icons = {
  IconKey,
  IconUser,
  IconUsers,
  IconBuildingBank,
  IconListCheck
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Data Master',
  caption: 'Data Master Aplikasi',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey, // IconKey still represents security or authentication

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'role-users',
      title: 'Page Role Users',
      type: 'item',
      url: '/master/role-users',
      icon: icons.IconUser // Represents user roles or individual users
    },
    {
      id: 'data-nasabah',
      title: 'Data Nasabah',
      type: 'item',
      url: '/master/nasabah',
      icon: icons.IconBuildingBank // Represents customer data (Nasabah) in a banking or financial context
    },
    {
      id: 'data-users',
      title: 'Data Users',
      type: 'item',
      url: '/master/users',
      icon: icons.IconUsers // Represents multiple users (user management)
    },
    {
      id: 'kriteria-sub',
      title: 'Kriteria dan Sub-Kriteria',
      type: 'item',
      url: '/master/kriteria-sub',
      icon: icons.IconListCheck // Represents criteria, checklists, or evaluation
    }
  ]
};

export default pages;