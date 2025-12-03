import { APPItem } from '../../types/app.types';

export const MONTHS = [
  { name: 'Jan', key: 'jan' },
  { name: 'Feb', key: 'feb' },
  { name: 'Mar', key: 'mar' },
  { name: 'Apr', key: 'apr' },
  { name: 'May', key: 'may' },
  { name: 'Jun', key: 'jun' },
  { name: 'Jul', key: 'jul' },
  { name: 'Aug', key: 'aug' },
  { name: 'Sep', key: 'sep' },
  { name: 'Oct', key: 'oct' },
  { name: 'Nov', key: 'nov' },
  { name: 'Dec', key: 'dec' }
];

export const INITIAL_APP_ITEM: Omit<APPItem, 'id' | 'itemNo'> = {
  description: '',
  unitCost: '',
  quantity: '',
  totalCost: '',
  configurer: '',
  jan: '',
  feb: '',
  mar: '',
  apr: '',
  may: '',
  jun: '',
  jul: '',
  aug: '',
  sep: '',
  oct: '',
  nov: '',
  dec: '',
};
