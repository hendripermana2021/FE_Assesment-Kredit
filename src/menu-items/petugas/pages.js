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
      id: 'data-nasabah',
      title: 'Page Data Nasabah',
      type: 'item',
      url: '/master/nasabah',
      icon: icons.IconBuildingBank // Represents customer data (Nasabah) in a banking or financial context
    }
  ]
};

export default pages;
