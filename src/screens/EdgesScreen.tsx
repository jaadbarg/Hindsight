// src/screens/EdgesScreen.tsx
import React, {useContext, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TextInput, Button, List} from 'react-native-paper';
import {EdgesContext} from '../context/EdgesContext';

const EdgesScreen: React.FC = () => {
  const {edges, setEdges} = useContext(EdgesContext);
  const [newEdge, setNewEdge] = useState<string>('');

  const addEdge = () => {
    if (newEdge.trim()) {
      setEdges([...edges, newEdge.trim()]);
      setNewEdge('');
    }
  };

  const removeEdge = (index: number) => {
    const updatedEdges = edges.filter((_, i) => i !== index);
    setEdges(updatedEdges);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={edges}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <List.Item
            title={item}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <Button onPress={() => removeEdge(index)}>Delete</Button>
            )}
          />
        )}
      />
      <TextInput
        label="Add a new edge"
        value={newEdge}
        onChangeText={setNewEdge}
        style={styles.input}
      />
      <Button mode="contained" onPress={addEdge}>
        Add Edge
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

export default EdgesScreen;
