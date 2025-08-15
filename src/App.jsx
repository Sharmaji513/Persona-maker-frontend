import React, { useState } from 'react'
import PersonaSelection from './components/PersonaSelection'
import ChatWindow from './components/ChatWindow'
import personas from './constants/personas'

export default function App(){
  const [selectedPersona, setSelectedPersona] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const handleSelect = (key) => {
    setSelectedPersona(key)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-all duration-500">
        {!selectedPersona ? (
          <PersonaSelection
            personas={personas}
            onSelect={handleSelect}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : (
          <ChatWindow
            personaKey={selectedPersona}
            persona={personas[selectedPersona]}
            onBack={() => setSelectedPersona(null)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
      </div>
    </div>
  )
}
