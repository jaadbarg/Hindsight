// src/context/EdgesContext.tsx
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EdgesContextType {
  edges: string[];
  setEdges: React.Dispatch<React.SetStateAction<string[]>>;
}

interface EdgesProviderProps {
  children: React.ReactNode;
}

export const EdgesContext = createContext<EdgesContextType>({
  edges: [],
  setEdges: () => {},
});

export const EdgesProvider = ({children}: EdgesProviderProps) => {
  const [edges, setEdges] = useState<string[]>([]);

  useEffect(() => {
    const loadEdges = async () => {
      const storedEdges = await AsyncStorage.getItem('edges');
      if (storedEdges) setEdges(JSON.parse(storedEdges));
    };
    loadEdges();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('edges', JSON.stringify(edges));
  }, [edges]);

  return (
    <EdgesContext.Provider value={{edges, setEdges}}>
      {children}
    </EdgesContext.Provider>
  );
};
