import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Expense {
  id: string;
  category: string;
  date: string;
  amount: number;
}

interface ExpenseState {
  list: Expense[];
}

const initialState: ExpenseState = {
  list: [],
};


const saveExpensesToStorage = async (expenses: Expense[]) => {
  try {
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to AsyncStorage:', error);
  }
};

const loadExpensesFromStorage = async (): Promise<Expense[]> => {
  try {
    const storedExpenses = await AsyncStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  } catch (error) {
    console.error('Failed to load expenses from AsyncStorage:', error);
    return [];
  }
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.list = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.list.push(action.payload);
      saveExpensesToStorage(state.list);
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.list.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveExpensesToStorage(state.list);
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      saveExpensesToStorage(state.list);
    },
  },
});

export const { setExpenses, addExpense, editExpense, deleteExpense } = expenseSlice.actions;

export const loadExpenses = () => async (dispatch: any) => {
  const expenses = await loadExpensesFromStorage();
  dispatch(setExpenses(expenses));
};

export default expenseSlice.reducer;



























