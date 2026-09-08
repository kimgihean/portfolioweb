import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! 포트폴리오 안내 챗봇입니다. 프로젝트나 기술 스택에 대해 궁금한 점이 있으신가요?'
    }
  ]);
  const [myInput, setMyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!myInput || !myInput.trim() || isLoading) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', content: myInput };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setMyInput('');
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    
    // Add empty assistant message to UI immediately
    setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Keep the last partial line in the buffer
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ') && trimmedLine !== 'data: [DONE]') {
              try {
                const dataStr = trimmedLine.replace('data: ', '');
                if (!dataStr) continue;
                
                const data = JSON.parse(dataStr);
                
                if (data.type === 'text-delta' && data.delta) {
                  setIsLoading(false); // 스트리밍이 시작되면 로딩 바 숨김
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantMessageId 
                        ? { ...msg, content: msg.content + data.delta }
                        : msg
                    )
                  );
                }
              } catch (err) {
                console.error('Error parsing stream data', err, trimmedLine);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWheel = (e) => {
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  return (
    <div className={`ai-chatbot-container ${isOpen ? 'open' : ''}`}>
      {/* Chat Window */}
      <div 
        className={`chat-window ${isOpen ? 'active' : ''}`}
        onWheel={handleWheel}
      >
        <div className="chat-header">
          <div className="header-info">
            <Bot size={24} className="bot-icon" />
            <div>
              <h3>챗봇까지 눌렀으면 제가 좀 궁금하신가봐요</h3>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => {
            const textContent = msg.content || msg.text || (msg.parts && msg.parts[0]?.text) || '';
            // 내용이 없는 AI 말풍선은 렌더링하지 않음
            if (msg.role === 'assistant' && !textContent) return null;
            
            return (
              <div key={msg.id} className={`message-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`message-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {textContent}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="message-wrapper ai">
              <div className="message-bubble ai loading-bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleCustomSubmit}>
          <input
            type="text"
            value={myInput}
            onChange={(e) => setMyInput(e.target.value)}
            placeholder="궁금한 내용을 입력해보세요..."
            className="chat-input"
          />
          <button 
            type="submit" 
            className="send-btn" 
            disabled={!myInput || myInput.trim() === '' || isLoading}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button className="floating-btn" onClick={toggleChat}>
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default AIChatbot;
