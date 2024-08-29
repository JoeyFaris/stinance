import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFinancialData = createAsyncThunk(
  'financial/fetchData',
  async () => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          expenses: 5000,
          investments: 10000,
          savings: 15000,
          financialHealth: 75,
        });
      }, 1000);
    });
  }
);

const financialSlice = createSlice({
  name: 'financial',
  initialState: {
    expenses: 0,
    investments: 0,
    savings: 0,
    financialHealth: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFinancialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload.expenses;
        state.investments = action.payload.investments;
        state.savings = action.payload.savings;
        state.financialHealth = action.payload.financialHealth;
      })
      .addCase(fetchFinancialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default financialSlice.reducer;