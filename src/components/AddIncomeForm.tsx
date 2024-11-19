import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addIncome, editIncome } from '../redux/slices/incomeSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddIncomeForm = ({ onClose, editingIncome }: { onClose: () => void; editingIncome: any }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(editingIncome?.category || '');
  const [amount, setAmount] = useState(editingIncome?.amount?.toString() || '');
  const [date, setDate] = useState(editingIncome?.date || '');

  const handleSaveIncome = () => {
    if (category && amount && date) {
      if (editingIncome) {

        dispatch(
          editIncome({
            id: editingIncome.id,
            category,
            amount: parseFloat(amount),
            date,
          })
        );
        Alert.alert('Success', 'Income updated successfully!');
      } else {

        dispatch(
          addIncome({
            id: uuidv4(),
            category,
            amount: parseFloat(amount),
            date,
          })
        );
        Alert.alert('Success', 'Income added successfully!');
      }
      setCategory('');
      setAmount('');
      setDate('');
      onClose();
    } else {
      Alert.alert('Error', 'Please fill all the fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.input}>
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Salary" value="Salary" />
        <Picker.Item label="Investment" value="Investment" />
        <Picker.Item label="Part-Time" value="Part-Time" />
        <Picker.Item label="Bonus" value="Bonus" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      <TextInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <Button title={editingIncome ? 'Update Income' : 'Add Income'} onPress={handleSaveIncome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default AddIncomeForm;














