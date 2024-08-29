import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
const fakeAPI = {
  fetchExpenses: () => Promise.resolve([
    { id: 1, category: 'Food', amount: 50, date: '2023-05-01' },
    { id: 2, category: 'Transport', amount: 30, date: '2023-05-02' },
  ]),
  addExpense: (expense) => Promise.resolve({ id: Date.now(), ...expense }),
  updateExpense: (expense) => Promise.resolve(expense),
  deleteExpense: (id) => Promise.resolve(id),
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => await fakeAPI.fetchExpenses()
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense) => await fakeAPI.addExpense(expense)
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async (expense) => await fakeAPI.updateExpense(expense)
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id) => {
    await fakeAPI.deleteExpense(id);
    return id;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;
