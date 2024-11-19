import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Income {
  id: string;
  category: string;
  date: string;
  amount: number;
}

interface IncomeState {
  list: Income[];
}

const initialState: IncomeState = {
  list: [],
};


const saveIncomeToStorage = async (income: Income[]) => {
  try {
    await AsyncStorage.setItem('income', JSON.stringify(income));
  } catch (error) {
    console.error('Failed to save income to AsyncStorage:', error);
  }
};

const loadIncomeFromStorage = async (): Promise<Income[]> => {
  try {
    const storedIncome = await AsyncStorage.getItem('income');
    return storedIncome ? JSON.parse(storedIncome) : [];
  } catch (error) {
    console.error('Failed to load income from AsyncStorage:', error);
    return [];
  }
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncome: (state, action: PayloadAction<Income[]>) => {
      state.list = action.payload;
    },
    addIncome: (state, action: PayloadAction<Income>) => {
      state.list.push(action.payload);
      saveIncomeToStorage(state.list);
    },
    editIncome: (state, action: PayloadAction<Income>) => {
      const index = state.list.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveIncomeToStorage(state.list);
      }
    },
    deleteIncome: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      saveIncomeToStorage(state.list);
    },
  },
});

export const { setIncome, addIncome, editIncome, deleteIncome } = incomeSlice.actions;

export const loadIncome = () => async (dispatch: any) => {
  const income = await loadIncomeFromStorage();
  dispatch(setIncome(income));
};

export default incomeSlice.reducer;



























