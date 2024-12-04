// src/screens/RulesScreen.tsx
import React, {useContext, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TextInput, Button, List} from 'react-native-paper';
import {RulesContext} from '../context/RulesContext';

const RulesScreen: React.FC = () => {
  const {rules, setRules} = useContext(RulesContext);
  const [newRule, setNewRule] = useState<string>('');

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };

  const removeRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rules}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <List.Item
            title={item}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Button onPress={() => removeRule(index)}>Delete</Button>
            )}
          />
        )}
      />
      <TextInput
        label="Add a new rule"
        value={newRule}
        onChangeText={setNewRule}
        style={styles.input}
      />
      <Button mode="contained" onPress={addRule}>
        Add Rule
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
});

export default RulesScreen;
