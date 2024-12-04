// src/context/TradesContext.tsx
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../services/NotificationService';

export interface Trade {
  id: number;
  type: string;
  assetType: string;
  quantity: number;
  expiryDate: string;
  price: number;
  notes: string;
  entryDate: Date;
}

interface TradesContextType {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

interface TradesProviderProps {
  children: React.ReactNode;
}

export const TradesContext = createContext<TradesContextType>({
  trades: [],
  setTrades: () => {},
});

export const TradesProvider = ({children}: TradesProviderProps) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const loadTrades = async () => {
      const storedTrades = await AsyncStorage.getItem('trades');
      if (storedTrades) setTrades(JSON.parse(storedTrades));
    };
    loadTrades();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    trades.forEach(trade => {
      const expiryDate = new Date(trade.expiryDate);
      if (expiryDate > new Date()) {
        NotificationService.scheduleReminder(
          `Trade Reminder:\n${trade.notes}\nDays Remaining: ${Math.ceil(
            (expiryDate.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          )}`,
          new Date(),
          trade.id.toString(),
        );
      }
    });
  }, [trades]);

  return (
    <TradesContext.Provider value={{trades, setTrades}}>
      {children}
    </TradesContext.Provider>
  );
};
