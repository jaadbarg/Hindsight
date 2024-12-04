// src/screens/HomeScreen.tsx
import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {RulesContext} from '../context/RulesContext';
import NotificationService from '../services/NotificationService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {rules} = useContext(RulesContext);

  useEffect(() => {
    const scheduleDailyRulesReminder = () => {
      const reminderTime = new Date();
      reminderTime.setHours(9, 15, 0, 0);

      if (reminderTime < new Date()) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      NotificationService.scheduleReminder(
        `Remember your trading rules:\n${rules.join('\n')}`,
        reminderTime,
        'dailyRulesReminder',
      );
    };

    scheduleDailyRulesReminder();
  }, [rules]);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Rules')}
        style={styles.button}>
        My Rules
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Edges')}
        style={styles.button}>
        My Edges
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TradeEntry')}
        style={styles.button}>
        New Trade Entry
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default HomeScreen;
