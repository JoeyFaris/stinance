import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvestments, addInvestment, updateInvestment, deleteInvestment } from '../store/investmentsSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Investments = () => {
  const dispatch = useDispatch();
  const investments = useSelector(state => state.investments.items);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '', date: '' });

  useEffect(() => {
    dispatch(fetchInvestments());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInvestment(newInvestment));
    setNewInvestment({ name: '', amount: '', date: '' });
  };

  const handleUpdate = (id, updatedInvestment) => {
    dispatch(updateInvestment({ id, ...updatedInvestment }));
  };

  const handleDelete = (id) => {
    dispatch(deleteInvestment(id));
  };

  const totalInvestments = investments.reduce((sum, investment) => sum + parseFloat(investment.amount), 0);

  const chartData = investments.map(investment => ({
    name: investment.name,
    amount: parseFloat(investment.amount),
    date: investment.date
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">Investment Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-neutral">Add New Investment</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newInvestment.name}
              onChange={handleInputChange}
              placeholder="Investment Name"
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="number"
              name="amount"
              value={newInvestment.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={newInvestment.date}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-primary text-white p-2 rounded">Add Investment</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-neutral">Investment Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-neutral">Investment List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {investments.map(investment => (
                <tr key={investment.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{investment.name}</td>
                  <td className="py-3 px-6 text-left">${investment.amount}</td>
                  <td className="py-3 px-6 text-left">{investment.date}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleUpdate(investment.id, { ...investment, amount: parseFloat(investment.amount) + 100 })} className="text-blue-500 hover:text-blue-700 mr-2">
                      Update
                    </button>
                    <button onClick={() => handleDelete(investment.id)} className="text-red-500 hover:text-red-700">
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
        <h2 className="text-xl font-semibold mb-2 text-neutral">Total Investments</h2>
        <p className="text-3xl font-bold text-secondary">${totalInvestments.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Investments;
