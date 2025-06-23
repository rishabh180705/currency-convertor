

import React, { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaMoneyBillAlt,
  FaGlobe,
  FaWallet,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Codes from "../assets/countryCode";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [CountryCodes,setCountryCode] = useState(Codes);
  // const [FromCurrency, setFromCurrency] = useState("USD");
  // const [ToCurrency, setToCurrency] = useState("IND");
  const [amount, setAmount] = useState("");
  const [FromCountryFlag, setFromCountryFlag] = useState("US");
  const [ToCountryFlag, setToCountryFlag] = useState("IN");
const [convertedAmount,setConvertedAmount]=useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const html = document.documentElement;
  //   darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  // }, [darkMode]);


useEffect(() => {
  const fetchAmount = async () => {
  try {
    const from = Codes.find(c => c.alphaCode === FromCountryFlag)?.currencyCode;
    const to = Codes.find(c => c.alphaCode === ToCountryFlag)?.currencyCode;

    if (!from || !to || !amount) {
      alert("Please select valid currencies and enter an amount.");
      return;
    }
    if( amount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;  }

      if(to===from){
      alert("currencies cannot be the same.");
      return;
    }
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}`);

    if (!response.ok) {
      alert("Failed to fetch exchange rates");
      return;
    }

    const data = await response.json();

    const rate = data.rates[to];
    if (!rate) {
      alert("Conversion rate not available");
      return;
    }

    const converted = (amount * rate).toFixed(3);
    setConvertedAmount(`${converted} ${to}`);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert("Something went wrong while converting.");
  }
}


fetchAmount();

},[setFromCountryFlag, setToCountryFlag,FromCountryFlag, ToCountryFlag]);




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-blue-600 dark:text-yellow-400">
            <FaMoneyBillAlt className="text-3xl" />
            <h1 className="text-2xl font-bold dark:text-white">Currency Converter</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-500 dark:text-yellow-300 hover:text-blue-500 dark:hover:text-white transition"
            title="Toggle Theme"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Currency Selectors */}
        <div className="grid grid-cols-2 gap-4">
          {/* From */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              From
              <img
                src={`https://flagsapi.com/${FromCountryFlag}/flat/64.png`}
                alt="From Flag"
                className="w-6 h-4"
              />
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={FromCountryFlag}
              onChange={(e) => {setFromCountryFlag(e.target.value)}}
            >
              {CountryCodes.map((country) => (
                <option key={country.alphaCode} value={country.alphaCode}>
                 {country.country} ({country.currencyCode})
                </option>
              ))}
            </select>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              To
              <img
                src={`https://flagsapi.com/${ToCountryFlag}/flat/64.png`}
                alt="To Flag"
                className="w-6 h-4"
              />
            </label>
            <select
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={ToCountryFlag}
              onChange={(e) => setToCountryFlag(e.target.value)}
            >
              {CountryCodes.map((country) => (
                <option key={country.alphaCode} value={country.alphaCode}>
                  {country.country} ({country.currencyCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          onClick={()=>fetchAmount()}
        >
          <FaExchangeAlt />
          <span>Convert</span>
        </button>

        {/* Converted Result */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-3">
          <FaWallet className="text-xl text-green-500" />
         <div>
  <p className="text-sm text-gray-600 dark:text-gray-400">Converted Amount</p>
  <p className="text-lg font-bold text-gray-800 dark:text-white">
    {convertedAmount || "--"}
  </p>
</div>

        </div>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/historical")}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 rounded-xl transition"
          >
            <FaGlobe />
            <span>View Historical Data</span>
          </button>
          <button
            onClick={() => navigate("/about")}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 rounded-xl transition"
          >
            <FaGlobe />
            <span>About</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2 flex items-center justify-center gap-2">
          <FaGlobe />
          <p>Exchange rates updated hourly</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
