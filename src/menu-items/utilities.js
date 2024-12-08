// assets
import { IconFileText, IconCalculator, IconReport, IconHistory } from '@tabler/icons-react'; // Adjusted icons

// constant
const icons = {
  IconFileText,
  IconCalculator,
  IconReport,
  IconHistory
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Ajuan',
  caption: 'Generated dan Perhitungan Metode',
  type: 'group',
  children: [
    {
      id: 'ajuan-kredit',
      title: 'Ajuan Kredit',
      type: 'item',
      url: '/utils/ajuan-kredit',
      icon: icons.IconFileText // Represents documents or forms
    },
    {
      id: 'hitung-metode',
      title: 'Hitung CPI dan ROC',
      type: 'item',
      url: '/utils/hitung',
      icon: icons.IconCalculator // Represents calculations or math
    },
    {
      id: 'generated',
      title: 'Generated Report',
      type: 'item',
      url: '/utils/generated',
      icon: icons.IconReport // Represents reports
    },
    {
      id: 'history',
      title: 'History Acceptable',
      type: 'item',
      url: '/utils/history',
      icon: icons.IconHistory // Represents historical data or logs
    }
  ]
};

export default utilities;
