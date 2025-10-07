// src/components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  timestamp: string; // might be same as submittedAt
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          'https://4jmee64yk0.execute-api.ap-south-1.amazonaws.com/submissions'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const subs = Array.isArray(data.submissions) ? data.submissions : [];
        setSubmissions(subs);
        setFilteredSubmissions(subs); // Initially show all
      } catch (err) {
        setError('Error loading submissions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Apply filters whenever date inputs change
  useEffect(() => {
    let filtered = [...submissions];

    if (fromDate || toDate) {
      filtered = filtered.filter((sub) => {
        const submittedDate = new Date(sub.submittedAt).getTime();
        const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
        const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

        if (from && submittedDate < from) return false;
        if (to && submittedDate > to) return false;
        return true;
      });
    }

    setFilteredSubmissions(filtered);
    setFilterApplied(!!fromDate || !!toDate);
  }, [fromDate, toDate, submissions]);

  // Quick filter functions
  const applyQuickFilter = (days: number) => {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate() - days);
    from.setHours(0, 0, 0, 0);

    setFromDate(from.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
  };

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
    setFilterApplied(false);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Submitted At'];
    const rows = filteredSubmissions.map((sub) => [
      sub.id,
      sub.name,
      sub.email,
      sub.phone,
      sub.message.replace(/[\r\n]+/g, ' '), // Clean newlines
      new Date(sub.submittedAt).toLocaleString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent([headers, ...rows].map((e) => e.join(',')).join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Submissions</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={exportToCSV}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 11.586V9a1 1 0 112 0v2.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
          <span className="text-sm">Total: {filteredSubmissions.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex items-center gap-2">
          <label className="text-sm">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => applyQuickFilter(0)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm rounded"
          >
            Today
          </button>
          <button
            onClick={() => applyQuickFilter(7)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm rounded"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => applyQuickFilter(30)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm rounded"
          >
            Last 1 Month
          </button>
          <button
            onClick={() => applyQuickFilter(365)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm rounded"
          >
            Last 1 Year
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 text-sm rounded"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="py-3 px-4 truncate max-w-xs">{sub.id}</td>
                  <td className="py-3 px-4">{sub.name}</td>
                  <td className="py-3 px-4">{sub.email}</td>
                  <td className="py-3 px-4">{sub.phone}</td>
                  <td className="py-3 px-4 max-w-xs break-words">{sub.message}</td>
                  <td className="py-3 px-4">{new Date(sub.submittedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400">
                  {filterApplied ? 'No matching submissions' : 'No submissions found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;