import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FaChartLine, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HistoricalChart = () => {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [rangeInDays, setRangeInDays] = useState("30");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - rangeInDays * 86400000)
      .toISOString()
      .split("T")[0];

    const fetchHistoricalRates = async () => {
      if (baseCurrency === targetCurrency) {
        setData([]);
        return;
      }

      setLoading(true);
      setError("");

      console.log({ startDate, endDate, baseCurrency, targetCurrency }); // debug

      try {
        const response = await axios.get(
          `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${targetCurrency}`
        );

        const formattedData = Object.entries(response.data.rates)
          .filter(([_, rate]) => rate[targetCurrency] !== undefined)
          .map(([date, rate]) => ({
            date,
            rate: Number(rate[targetCurrency].toFixed(4))
          }));

        setData(formattedData);
      } catch (error) {
        setError("Failed to fetch historical data. Please try again.");
        console.error("Error fetching historical data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency, rangeInDays]);

  return (
    <div className="bg-black dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaChartLine className="text-blue-600 dark:text-yellow-400 text-2xl" />
          <h2 className="text-xl font-bold dark:text-white">
            Historical Currency Trend
          </h2>
        </div>

        {/* Controls */}
        <div className="flex space-x-4">
          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
          </select>

          <span className="text-gray-600 dark:text-gray-300">to</span>

          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>

          <select
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            value={rangeInDays}
            onChange={(e) => setRangeInDays(e.target.value)}
          >
            <option value="7">1 Week</option>
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-300 dark:text-gray-300">
          Loading chart data...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis domain={["auto", "auto"]} stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#1e40af"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">
          {baseCurrency === targetCurrency
            ? "Base and target currencies cannot be the same."
            : "No data available."}
        </p>
      )}

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/historical-rates")}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 rounded-xl transition duration-200"
      >
        <FaGlobe />
        <span>View Historical Value on Specific Date</span>
      </button>
    </div>
  );
};

export default HistoricalChart;
