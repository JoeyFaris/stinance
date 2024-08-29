import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchFinancialData } from '../store/financialSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses, investments, savings, financialHealth } = useSelector(state => state.financial);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1M');

  useEffect(() => {
    dispatch(fetchFinancialData());
  }, [dispatch]);

  const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const chartData = [
    { name: 'Jan', Expenses: 4000, Investments: 2400, Savings: 2400 },
    { name: 'Feb', Expenses: 3000, Investments: 1398, Savings: 2210 },
    { name: 'Mar', Expenses: 2000, Investments: 9800, Savings: 2290 },
    { name: 'Apr', Expenses: 2780, Investments: 3908, Savings: 2000 },
    { name: 'May', Expenses: 1890, Investments: 4800, Savings: 2181 },
    { name: 'Jun', Expenses: 2390, Investments: 3800, Savings: 2500 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-neutral">Expenses</h2>
          <p className="text-3xl font-bold text-danger">${expenses}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-neutral">Investments</h2>
          <p className="text-3xl font-bold text-secondary">${investments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-neutral">Savings</h2>
          <p className="text-3xl font-bold text-primary">${savings}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Financial Health Score</h2>
        <div className="w-full bg-blue-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${financialHealth}%` }}></div>
        </div>
        <p className="text-lg text-blue-700">Your financial health score: <span className="font-bold">{financialHealth}</span></p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Financial Overview</h2>
        <div className="flex justify-end mb-4 space-x-2">
          {timeRanges.map(range => (
            <button
              key={range}
              className={`px-3 py-1 rounded-full ${selectedTimeRange === range ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-700'}`}
              onClick={() => setSelectedTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EBF8FF" />
            <XAxis dataKey="name" stroke="#2B6CB0" />
            <YAxis stroke="#2B6CB0" />
            <Tooltip contentStyle={{ backgroundColor: '#EBF8FF', borderColor: '#63B3ED' }} />
            <Legend />
            <Line type="monotone" dataKey="Expenses" stroke="#EF4444" />
            <Line type="monotone" dataKey="Investments" stroke="#10B981" />
            <Line type="monotone" dataKey="Savings" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
