import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
const fakeAPI = {
  fetchInvestments: () => Promise.resolve([
    { id: 1, name: 'Stocks', amount: 5000, date: '2023-05-01' },
    { id: 2, name: 'Bonds', amount: 3000, date: '2023-05-02' },
  ]),
  addInvestment: (investment) => Promise.resolve({ id: Date.now(), ...investment }),
  updateInvestment: (investment) => Promise.resolve(investment),
  deleteInvestment: (id) => Promise.resolve(id),
};

export const fetchInvestments = createAsyncThunk(
  'investments/fetchInvestments',
  async () => await fakeAPI.fetchInvestments()
);

export const addInvestment = createAsyncThunk(
  'investments/addInvestment',
  async (investment) => await fakeAPI.addInvestment(investment)
);

export const updateInvestment = createAsyncThunk(
  'investments/updateInvestment',
  async (investment) => await fakeAPI.updateInvestment(investment)
);

export const deleteInvestment = createAsyncThunk(
  'investments/deleteInvestment',
  async (id) => {
    await fakeAPI.deleteInvestment(id);
    return id;
  }
);

const investmentsSlice = createSlice({
  name: 'investments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addInvestment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default investmentsSlice.reducer;
