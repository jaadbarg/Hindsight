// src/screens/TradeEntryScreen.tsx
import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {TradesContext} from '../context/TradesContext';
import {Trade} from '../context/TradesContext';

const TradeEntryScreen: React.FC = () => {
  const {trades, setTrades} = useContext(TradesContext);
  const [trade, setTrade] = useState<Partial<Trade>>({
    type: '',
    assetType: '',
    quantity: 0,
    expiryDate: '',
    price: 0,
    notes: '',
  });

  const submitTrade = () => {
    if (trade.type && trade.assetType && trade.quantity && trade.price) {
      const newTrade: Trade = {
        ...trade,
        id: Date.now(),
        entryDate: new Date(),
      } as Trade;

      setTrades([...trades, newTrade]);

      setTrade({
        type: '',
        assetType: '',
        quantity: 0,
        expiryDate: '',
        price: 0,
        notes: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Type (Buy/Sell)"
        value={trade.type}
        onChangeText={text => setTrade({...trade, type: text})}
        style={styles.input}
      />
      <TextInput
        label="Asset Type (Stock/Option)"
        value={trade.assetType}
        onChangeText={text => setTrade({...trade, assetType: text})}
        style={styles.input}
      />
      <TextInput
        label="Quantity"
        value={trade.quantity ? trade.quantity.toString() : ''}
        onChangeText={text => setTrade({...trade, quantity: parseInt(text)})}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Expiry Date (for Options)"
        value={trade.expiryDate}
        onChangeText={text => setTrade({...trade, expiryDate: text})}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={trade.price ? trade.price.toString() : ''}
        onChangeText={text => setTrade({...trade, price: parseFloat(text)})}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Notes"
        value={trade.notes}
        onChangeText={text => setTrade({...trade, notes: text})}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={submitTrade}>
        Submit Trade
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

export default TradeEntryScreen;
