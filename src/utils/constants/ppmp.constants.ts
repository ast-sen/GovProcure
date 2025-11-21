import { Month, PPMPItem } from '../../types/ppmp.types';

export const MONTHS: Month[] = [
  { name: 'JAN', key: 'jan' },
  { name: 'FEB', key: 'feb' },
  { name: 'MAR', key: 'mar' },
  { name: 'APR', key: 'apr' },
  { name: 'MAY', key: 'may' },
  { name: 'JUN', key: 'jun' },
  { name: 'JUL', key: 'jul' },
  { name: 'AUG', key: 'aug' },
  { name: 'SEP', key: 'sep' },
  { name: 'OCT', key: 'oct' },
  { name: 'NOV', key: 'nov' },
  { name: 'DEC', key: 'dec' }
];

export const INITIAL_PPMP_ITEM: Omit<PPMPItem, 'id'> = {
  generalDescription: '',
  unit: '',
  qtySize: '',
  estimatedBudget: '',
  jan_qty: '', jan_amt: '',
  feb_qty: '', feb_amt: '',
  mar_qty: '', mar_amt: '',
  apr_qty: '', apr_amt: '',
  may_qty: '', may_amt: '',
  jun_qty: '', jun_amt: '',
  jul_qty: '', jul_amt: '',
  aug_qty: '', aug_amt: '',
  sep_qty: '', sep_amt: '',
  oct_qty: '', oct_amt: '',
  nov_qty: '', nov_amt: '',
  dec_qty: '', dec_amt: '',
};