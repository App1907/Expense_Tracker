import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addExpense, editExpense } from '../redux/slices/expenseSlice';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = ({ onClose, editingExpense }: { onClose: () => void; editingExpense: any }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(editingExpense?.category || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [date, setDate] = useState(editingExpense?.date || '');

  const handleSaveExpense = () => {
    if (category && amount && date) {
      if (editingExpense) {

        dispatch(
          editExpense({
            id: editingExpense.id,
            category,
            amount: parseFloat(amount),
            date,
          })
        );
        Alert.alert('Success', 'Expense updated successfully!');
      } else {

        dispatch(
          addExpense({
            id: uuidv4(),
            category,
            amount: parseFloat(amount),
            date,
          })
        );
        Alert.alert('Success', 'Expense added successfully!');
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
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Transport" value="Transport" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Education" value="Education" />
      </Picker>
      <TextInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
      <Button title={editingExpense ? 'Update Expense' : 'Add Expense'} onPress={handleSaveExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#8EA3A6',
    marginTop: 20,
  },
});

export default AddExpenseForm;



















