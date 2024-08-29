import { configureStore } from '@reduxjs/toolkit';
import financialReducer from './financialSlice';
import expensesReducer from './expensesSlice';
import investmentsReducer from './investmentsSlice';

export const store = configureStore({
  reducer: {
    financial: financialReducer,
    expenses: expensesReducer,
    investments: investmentsReducer,
  },
});