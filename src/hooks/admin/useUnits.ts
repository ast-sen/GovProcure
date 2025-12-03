import { useState } from 'react';
import { Unit } from '../../types/admin.types';

export const useUnits = () => {
  const [units, setUnits] = useState<Unit[]>([
    { id: 1, name: 'Pieces', abbreviation: 'pcs' },
    { id: 2, name: 'Kilograms', abbreviation: 'kg' },
    { id: 3, name: 'Liters', abbreviation: 'L' },
  ]);

  const addUnit = (unit: Omit<Unit, 'id'>) => {
    const newUnit = { ...unit, id: units.length + 1 };
    setUnits([...units, newUnit]);
  };

  const updateUnit = (id: number, unitData: Partial<Unit>) => {
    setUnits(units.map(unit => unit.id === id ? { ...unit, ...unitData } : unit));
  };

  const deleteUnit = (id: number) => {
    setUnits(units.filter(unit => unit.id !== id));
  };

  const filterUnits = (searchTerm: string) => {
    return units.filter(unit =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { units, addUnit, updateUnit, deleteUnit, filterUnits };
};