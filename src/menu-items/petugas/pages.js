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
  title: 'Menu Action',
  caption: 'Menu Action Aplikasi',
  type: 'group',
  children: [
    {
      id: 'data-nasabah',
      title: 'Page Data Nasabah',
      type: 'item',
      url: '/master/nasabah',
      icon: icons.IconBuildingBank // Represents customer data (Nasabah) in a banking or financial context
    }, 
    {
      id: 'ajuan-kredit',
      title: 'Ajuan Kredit',
      type: 'item',
      url: '/utils/ajuan-kredit',
      icon: icons.IconListCheck // Represents documents or forms
    },
  ]
};

export default pages;
