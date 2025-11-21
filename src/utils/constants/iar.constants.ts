import { IARItem } from '../../types/iar.types';

export const INITIAL_IAR_ITEM: Omit<IARItem, 'id' | 'itemNo'> = {
  unit: '',
  quantity: '',
  description: '',
};

// Sample items - in real app, these would come from Purchase Order
export const SAMPLE_IAR_ITEMS: IARItem[] = [
  {
    id: '1',
    itemNo: 1,
    unit: 'pcs',
    quantity: '10',
    description: 'Bond Paper, A4 size, 80gsm',
  },
  {
    id: '2',
    itemNo: 2,
    unit: 'box',
    quantity: '5',
    description: 'Ballpen, black ink',
  },
  {
    id: '3',
    itemNo: 3,
    unit: 'pcs',
    quantity: '3',
    description: 'Stapler, heavy duty',
  },
];