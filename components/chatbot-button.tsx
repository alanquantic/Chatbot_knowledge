"use client";

import { useMemo, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { sanitizeChatbotHtml } from '@/lib/sanitize-chatbot-html';

export function ChatbotButton() {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Feature flag (build-time): si en Vercel pones NEXT_PUBLIC_CHATBOT_OUTPUT_FORMAT=text,
  // el UI vuelve a texto plano sin necesidad de revertir código.
  const outputFormat =
    (process.env.NEXT_PUBLIC_CHATBOT_OUTPUT_FORMAT ?? 'html').toLowerCase() === 'text' ? 'text' : 'html';

  type ChatRole = 'user' | 'assistant';
  type ChatMessage = {
    role: ChatRole;
    content: string;
  };

  const initialMessages: ChatMessage[] = useMemo(
    () => [
      {
        role: 'assistant',
        content: t('welcomeMessage'),
      },
    ],
    [t]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsSending(true);
    setInput('');

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];
    setMessages(nextMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const raw = await res.text();
        throw new Error(raw || `HTTP ${res.status}`);
      }

      const data: unknown = await res.json();
      const message = (data as { message?: string }).message;
      if (!message) {
        throw new Error(t('invalidResponse'));
      }

      setMessages([...nextMessages, { role: 'assistant', content: message }]);
      requestAnimationFrame(scrollToBottom);
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('unknownError');
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: `${t('errorMessage')} ${msg}`,
        },
      ]);
    } finally {
      setIsSending(false);
      requestAnimationFrame(scrollToBottom);
    }
  };

  return (
    <>
      {/* Floating button visible */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label={t('openAssistant')}
        >
          <MessageCircle className="h-6 w-6 animate-pulse" />
          <span className="absolute bottom-16 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t('assistantName')}
          </span>
        </button>
      )}

      {/* Modal del chatbot */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-white" />
                <div>
                  <h3 className="text-white font-semibold">{t('assistantName')}</h3>
                  <p className="text-purple-100 text-xs">{t('expertIn')}</p>
                </div>
              </div>
              <button
                onClick={toggleChatbot}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat content */}
            <div className="flex-1 w-full overflow-y-auto p-4 space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={[
                      'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
                      m.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    ].join(' ')}
                  >
                    {outputFormat === 'html' && m.role === 'assistant' ? (
                      <div
                        className="chatbot-html"
                        dangerouslySetInnerHTML={{ __html: sanitizeChatbotHtml(m.content) }}
                      />
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t('thinking')}</span>
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-pulse [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 animate-pulse [animation-delay:300ms]" />
                      </span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-3 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('inputPlaceholder')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    void sendMessage(input);
                  }
                }}
                disabled={isSending}
              />
              <Button
                type="button"
                onClick={() => void sendMessage(input)}
                disabled={isSending || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                title={t('send')}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
