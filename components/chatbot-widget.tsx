"use client";

import { useEffect } from 'react';

export function ChatbotWidget() {
  useEffect(() => {
    // Asegurar que el script del chatbot se cargue
    const scriptId = 'abacus-chatbot-script';
    
    // Verificar si el script ya existe
    if (document.getElementById(scriptId)) {
      return;
    }

    // Crear y cargar el script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://api.abacus.ai/api/v0/getChatBotWidgetSDKLink?externalApplicationId=ff682cc';
    script.async = true;
    
    script.onload = () => {
      console.log('✅ Chatbot Grabovoi cargado exitosamente');
    };
    
    script.onerror = () => {
      console.error('❌ Error al cargar el chatbot');
    };

    document.body.appendChild(script);

    // Cleanup al desmontar
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // Este componente no renderiza nada visible
}
