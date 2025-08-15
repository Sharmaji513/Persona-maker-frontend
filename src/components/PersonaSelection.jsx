import React from 'react'
import { Sun, Moon, Code, Palette, Sparkles, Laptop, Terminal, Mouse } from 'lucide-react'

export default function PersonaSelection({ personas, onSelect, darkMode, setDarkMode }) {
  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800'
          : 'bg-gradient-to-br from-indigo-100 via-white to-cyan-100'
      } flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 p-3 rounded-full ${
          darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-white'
        } hover:scale-110 transition-all duration-300 shadow-lg z-10`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
   

<div className="text-center mb-16">
  <div className="flex items-center justify-center mb-6">
    
    {/* Code Icon */}
    <div
      className={`w-20 h-20 ${darkMode ? 'bg-white' : 'bg-gray-800'}
        rounded-2xl flex items-center justify-center mr-4 shadow-2xl animate-pulse`}
    >
      <Code className={`w-10 h-10 ${darkMode ? 'text-gray-800' : 'text-white'}`} />
    </div>

    {/* Laptop Icon */}
    <div
      className={`w-16 h-16 ${darkMode ? 'bg-purple-600' : 'bg-blue-500'}
        rounded-xl flex items-center justify-center mr-4 shadow-2xl animate-bounce`}
    >
      <Laptop className="w-8 h-8 text-white" />
    </div>

    {/* Terminal Icon */}
    <div
      className={`w-20 h-20 ${darkMode ? 'bg-pink-600' : 'bg-green-500'}
        rounded-full flex items-center justify-center shadow-2xl animate-pulse`}
    >
      <Mouse className="w-9 h-9 text-white" />
    </div>

  </div>

  {/* Title */}
  <h1
    className={`text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}
      mb-6 animate-fade-in-up`}
  >
    Developer AI Assistant
  </h1>

  {/* Subtitle */}
  <div
    className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}
      mb-4 font-semibold`}
  >
    Javascript • React.js • Tailwind CSS • AI 
  </div>

  {/* Description */}
  <p
    className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}
      mb-8`}
  >
    Choose your coding mentor and start building amazing projects
  </p>
</div>


        {/* Persona Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Object.entries(personas).map(([key, persona]) => (
            <div
              key={key}
              onClick={() => onSelect(key)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-500 animate-fade-in-up"
            >
              <div
                className={`${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-800 border-gray-700'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                } rounded-3xl shadow-2xl hover:shadow-3xl p-8 text-center transition-all duration-500 border-2 hover:border-opacity-30 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 opacity-5 text-6xl flex items-center justify-center">
                  {persona.bgPattern.repeat(20)}
                </div> */}

                {/* Bigger, Clearer Image */}
                <div
                  className={`w-32 h-32 bg-gradient-to-r rounded-2xl mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-xl relative overflow-hidden`}
                >
                  <img
                    src={persona.image}
                    alt={persona.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className={`absolute inset-0  rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Name */}
                <h3
                  className={`text-3xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  } mb-3`}
                >
                  {persona.name}
                </h3>

                {/* Subtitle */}
                <p
                  className={`${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  } text-lg font-semibold mb-4`}
                >
                  {persona.subtitle}
                </p>

                {/* Description */}
                <p
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } mb-6`}
                >
                  {persona.description}
                </p>

                {/* Progress Bar */}
                <div
                  className={`w-full h-3 bg-gradient-to-r ${persona.gradient} rounded-full opacity-70 group-hover:opacity-100 transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
