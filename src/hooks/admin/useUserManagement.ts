import { useState } from 'react';
import { User } from '../../types/admin.types';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', designation: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', designation: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', designation: 'User', status: 'Inactive' },
  ]);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: users.length + 1 };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: number, userData: Partial<User>) => {
    setUsers(users.map(user => user.id === id ? { ...user, ...userData } : user));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filterUsers = (searchTerm: string) => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { users, addUser, updateUser, deleteUser, filterUsers };
};