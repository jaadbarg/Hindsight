// src/App.tsx
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import {RulesProvider} from './context/RulesContext';
import {EdgesProvider} from './context/EdgesContext';
import {TradesProvider} from './context/TradesContext';
import NotificationService from './services/NotificationService';

const App: React.FC = () => {
  useEffect(() => {
    NotificationService.configure();
  }, []);

  return (
    <PaperProvider>
      <RulesProvider>
        <EdgesProvider>
          <TradesProvider>
            <AppNavigator />
          </TradesProvider>
        </EdgesProvider>
      </RulesProvider>
    </PaperProvider>
  );
};

export default App;
