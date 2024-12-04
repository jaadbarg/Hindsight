// src/context/RulesContext.tsx
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RulesContextType {
  rules: string[];
  setRules: React.Dispatch<React.SetStateAction<string[]>>;
}

interface RulesProviderProps {
  children: React.ReactNode;
}

export const RulesContext = createContext<RulesContextType>({
  rules: [],
  setRules: () => {},
});

export const RulesProvider = ({children}: RulesProviderProps) => {
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    const loadRules = async () => {
      const storedRules = await AsyncStorage.getItem('rules');
      if (storedRules) setRules(JSON.parse(storedRules));
    };
    loadRules();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('rules', JSON.stringify(rules));
  }, [rules]);

  return (
    <RulesContext.Provider value={{rules, setRules}}>
      {children}
    </RulesContext.Provider>
  );
};
