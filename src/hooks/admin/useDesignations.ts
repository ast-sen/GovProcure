import { useState } from 'react';
import { Designation } from '../../types/admin.types';

export const useDesignations = () => {
  const [designations, setDesignations] = useState<Designation[]>([
    { id: 1, name: 'Manager', count: 15 },
    { id: 2, name: 'Supervisor', count: 32 },
    { id: 3, name: 'Staff', count: 89 },
  ]);

  const addDesignation = (name: string) => {
    const newDesignation: Designation = {
      id: designations.length + 1,
      name,
      count: 0,
    };
    setDesignations([...designations, newDesignation]);
  };

  const updateDesignation = (id: number, name: string) => {
    setDesignations(designations.map(d => d.id === id ? { ...d, name } : d));
  };

  const deleteDesignation = (id: number) => {
    setDesignations(designations.filter(d => d.id !== id));
  };

  const filterDesignations = (searchTerm: string) => {
    return designations.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { designations, addDesignation, updateDesignation, deleteDesignation, filterDesignations };
};
