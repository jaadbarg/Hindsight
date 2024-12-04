// src/navigation/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RulesScreen from '../screens/RulesScreen';
import EdgesScreen from '../screens/EdgesScreen';
import TradeEntryScreen from '../screens/TradeEntryScreen';

export type RootStackParamList = {
  Home: undefined;
  Rules: undefined;
  Edges: undefined;
  TradeEntry: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="Edges" component={EdgesScreen} />
        <Stack.Screen name="TradeEntry" component={TradeEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
