import { useState } from 'react';
import { Item } from '../../types/admin.types';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Office Chair', category: 'Furniture', unit: 'pcs' },
    { id: 2, name: 'Printer Paper', category: 'Supplies', unit: 'reams' },
    { id: 3, name: 'Laptop', category: 'Electronics', unit: 'pcs' },
  ]);

  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem = { ...item, id: items.length + 1 };
    setItems([...items, newItem]);
  };

  const updateItem = (id: number, itemData: Partial<Item>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...itemData } : item));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filterItems = (searchTerm: string) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { items, addItem, updateItem, deleteItem, filterItems };
};