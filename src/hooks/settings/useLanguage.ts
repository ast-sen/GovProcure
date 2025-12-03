import { useState } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState('english');

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'filipino', label: 'Filipino' },
    { value: 'spanish', label: 'Spanish' },
  ];

  return {
    language,
    setLanguage,
    languageOptions,
  };
};