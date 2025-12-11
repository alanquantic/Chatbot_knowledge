"use client";

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante visible */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Abrir Asistente Grabovoi"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6 animate-pulse" />
        )}
        <span className="absolute bottom-16 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Asistente Grabovoi
        </span>
      </button>

      {/* Modal del chatbot */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-white" />
                <div>
                  <h3 className="text-white font-semibold">Asistente Grabovoi</h3>
                  <p className="text-purple-100 text-xs">Experto en enseñanzas</p>
                </div>
              </div>
              <button
                onClick={toggleChatbot}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Iframe del chatbot */}
            <iframe
              src="https://apps.abacus.ai/chatllm/?appId=11578f0026&hideTopBar=2"
              className="flex-1 w-full border-0"
              title="Chatbot Grabovoi"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </div>
      )}
    </>
  );
}
