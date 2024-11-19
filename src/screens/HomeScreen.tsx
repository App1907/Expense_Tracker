import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Expense Tracker</Text>
      <Button title="View Expenses" onPress={() => navigation.navigate('Expenses')} />
      <Button title="View Income" onPress={() => navigation.navigate('Income')} />
      <Button title="View Summary" onPress={() => navigation.navigate('Summary')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9EDF9C'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;





