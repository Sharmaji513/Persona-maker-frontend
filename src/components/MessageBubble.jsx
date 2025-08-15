import React from 'react'
import { Code } from 'lucide-react'

export default function MessageBubble({ message, persona, darkMode }) {
  const isUser = message?.sender === 'user'
  const text = message?.text || ''

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start`}>
      {/* Show persona image for non-user messages */}
      {!isUser && persona?.image && (
        <img
          src={persona.image}
          alt={persona.name}
          className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-300 shadow-sm"
        />
      )}

      <div className={`max-w-2xl ${isUser ? 'ml-12' : 'mr-12'}`}>
        <div
          className={`px-6 py-4 rounded-3xl shadow-lg ${
            isUser
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : `bg-gradient-to-r ${persona?.gradient || ''} text-white text-lg font-semibold`
          } relative group hover:shadow-xl transition-all duration-300`}
        >
          {!isUser && persona?.icon && (
            <div className="flex items-center space-x-2 mb-3 opacity-90">
              <persona.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{persona.name}</span>
            </div>
          )}

          <div className="whitespace-pre-line text-sm leading-relaxed">
            {text.includes('```') ? (
              <div>
                {text.split('```').map((part, i) =>
                  i % 2 === 0 ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <div
                      key={i}
                      className="bg-black bg-opacity-30 rounded-xl p-4 my-3 font-mono text-xs overflow-x-auto border border-white border-opacity-20"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs opacity-75">JSX Code</span>
                        <Code className="w-3 h-3 opacity-75" />
                      </div>
                      <pre className="text-green-300">{part.trim()}</pre>
                    </div>
                  )
                )}
              </div>
            ) : (
              text
            )}
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-xs opacity-75">
              {message?.timestamp
                ? new Date(message.timestamp).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
