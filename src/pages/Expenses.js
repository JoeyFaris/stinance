import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../store/expensesSlice';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.items);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', date: '' });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(newExpense));
    setNewExpense({ category: '', amount: '', date: '' });
  };

  const handleUpdate = (id, updatedExpense) => {
    dispatch(updateExpense({ id, ...updatedExpense }));
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const expenseData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.category === expense.category);
    if (existingCategory) {
      existingCategory.value += parseFloat(expense.amount);
    } else {
      acc.push({ category: expense.category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">Expense Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-neutral">Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-primary text-white p-2 rounded">Add Expense</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-neutral">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-neutral">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {expenses.map(expense => (
                <tr key={expense.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{expense.category}</td>
                  <td className="py-3 px-6 text-left">${expense.amount}</td>
                  <td className="py-3 px-6 text-left">{expense.date}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleUpdate(expense.id, { ...expense, amount: expense.amount + 10 })} className="text-blue-500 hover:text-blue-700 mr-2">
                      Update
                    </button>
                    <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-neutral">Total Expenses</h2>
        <p className="text-3xl font-bold text-danger">${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Expenses;
