import React, { useState } from 'react';
import { View, FlatList, Text, Button, Modal, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import AddExpenseForm from '../components/AddExpenseForm';
import { deleteExpense, editExpense } from '../redux/slices/expenseSlice';

const ExpenseDetailsScreen = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleDelete = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => dispatch(deleteExpense(id)) },
    ]);
  };

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.date}</Text>
            <Text style={styles.text}>
              {item.category}: ${item.amount.toFixed(2)}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No expenses added yet!</Text>}
      />
      <Button title="Add Expense" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <AddExpenseForm
          onClose={() => {
            setModalVisible(false);
            setEditingExpense(null);
          }}
          editingExpense={editingExpense}
        />
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    color: 'blue',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default ExpenseDetailsScreen;



