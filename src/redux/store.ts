import { configureStore } from '@reduxjs/toolkit';
import expenseReducer, { loadExpenses } from './slices/expenseSlice';
import incomeReducer, { loadIncome } from './slices/incomeSlice';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    income: incomeReducer,
  },
});


store.dispatch(loadExpenses());
store.dispatch(loadIncome());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;





