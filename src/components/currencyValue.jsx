import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import currencies_codes from "../assets/countryCode";

const HistoricalRates = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState(currencies_codes);

  useEffect(() => {
    const fetchRates = async () => {
      if (!selectedDate || selectedCurrencies.length === 0) return;

      try {
        const symbols = selectedCurrencies.join(",");
        const res = await axios.get(
          `https://api.frankfurter.dev/${selectedDate}?from=USD&to=${symbols}`
        );
        setRates(res.data.rates);
        setError("");
      } catch (err) {
        console.error("Error fetching historical rates:", err);
        setRates({});
        setError("Could not fetch data. Please check the date and try again.");
      }
    };

    fetchRates();
  }, [selectedDate, selectedCurrencies]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-6 max-w-5xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3 text-blue-600 dark:text-yellow-400">
          <FaMoneyBillWave className="text-2xl" />
          <h2 className="text-2xl font-bold dark:text-white">
            Historical Currency Rates
          </h2>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Select Date
          </label>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-300" />
            <input
              type="date"
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Currency Selector */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Compare USD With
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currencies.map((cur) => (
              <button
                key={cur.currencyCode}
                className={`flex items-center justify-start gap-2 py-2 px-3 border rounded-lg transition text-sm font-medium ${
                  selectedCurrencies.includes(cur.currencyCode)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() =>
                  setSelectedCurrencies((prev) =>
                    prev.includes(cur.currencyCode)
                      ? prev.filter((c) => c !== cur.currencyCode)
                      : [...prev, cur.currencyCode]
                  )
                }
              >
                <img
                  src={`https://flagsapi.com/${cur.alphaCode}/flat/64.png`}
                  alt={cur.country}
                  className="w-6 h-4 rounded-sm border"
                />
                {cur.currencyCode} ({cur.country})
              </button>
            ))}
          </div>
        </div>

        {/* Rates Output */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl shadow-inner">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Exchange rates from <strong>USD</strong> on{" "}
            <strong>{selectedDate || "..."}</strong>
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <ul className="mt-4 space-y-2">
            {selectedCurrencies.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Select currencies to see rates.
              </p>
            ) : (
              selectedCurrencies.map((cur) => (
                <li
                  key={cur}
                  className="flex justify-between text-gray-800 dark:text-white font-medium"
                >
                  <span>{cur}</span>
                  <span>{rates[cur] ? rates[cur].toFixed(4) : "--"}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default HistoricalRates;

