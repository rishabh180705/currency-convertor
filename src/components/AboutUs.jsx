import React from "react";
import { FaMoneyBillWave, FaGlobe, FaGithub, FaReact } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl max-w-3xl p-8 w-full space-y-6"
      >
        {/* Title */}
        <div className="flex items-center gap-3 text-blue-600 dark:text-yellow-400">
          <FaMoneyBillWave className="text-3xl" />
          <h1 className="text-2xl font-bold dark:text-white">About Us</h1>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
          Welcome to our Currency Converter App! This project was built to help users quickly convert currency values across multiple countries, track historical exchange rates, and understand financial changes globally in real time.
        </p>

        {/* Tech Stack */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Tech Stack</h2>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li><FaReact className="inline-block mr-2 text-cyan-500" />ReactJS (Frontend)</li>
            <li><FaGlobe className="inline-block mr-2 text-green-500" />Frankfurter Exchange Rate API</li>
            <li><FaGithub className="inline-block mr-2 text-black dark:text-white" />Open Source Friendly</li>
            <li>TailwindCSS for responsive styling</li>
            <li>Dark mode support with toggle</li>
          </ul>
        </div>

        {/* Author Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Meet the Developer</h2>
          <p className="text-gray-700 dark:text-gray-300">
            👋 Hi, I’m <strong>Rishabh Singh</strong> — a B.Tech CSE student passionate about building clean, responsive, and user-friendly full-stack apps. This app is part of my journey toward mastering real-world projects and becoming an SDE at a top tech company.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Connect with me on <a href="https://github.com/rishabh180705" className="text-blue-600 dark:text-yellow-400 underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-4">
          © {new Date().getFullYear()} Currency Converter App — Built with 💙
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
