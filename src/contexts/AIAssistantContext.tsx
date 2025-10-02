'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// AI助手消息类型
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// AI助手上下文类型
interface AIAssistantContextType {
  // 聊天状态
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  
  // 聊天消息
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  
  // 输入状态
  inputMessage: string;
  setInputMessage: (message: string) => void;
  
  // 加载状态
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // AI助手功能
  sendToGemini: (message: string) => Promise<void>;
  handleSendMessage: () => void;
}

// 创建Context
const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

// Provider组件
export const AIAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // AI助手状态管理
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // AI助手聊天功能
  const sendToGemini = async (message: string) => {
    setIsLoading(true);
    try {
      console.log('发送消息到AI:', message);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API密钥未配置，请检查环境变量设置。');
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `你是Galaxy AI Platform的智能助手，专门帮助用户使用平台功能、分析需求、优化流程。请用中文回答用户的问题：${message}`
            }]
          }]
        })
      });

      console.log('API响应状态:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API错误响应:', errorData);
        throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
      }

      const data = await response.json();
      console.log('API响应数据:', data);

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '抱歉，我无法处理您的请求。';

      setChatMessages(prev => [...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      let errorMessage = '抱歉，连接AI服务时出现错误，请稍后重试。';

      if (error instanceof Error) {
        if (error.message.includes('403')) {
          errorMessage = 'API密钥无效或已过期，请检查配置。';
        } else if (error.message.includes('429')) {
          errorMessage = 'API请求频率过高，请稍后重试。';
        } else if (error.message.includes('网络')) {
          errorMessage = '网络连接失败，请检查网络设置。';
        }
      }

      setChatMessages(prev => [...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendToGemini(inputMessage);
    setInputMessage('');
  };

  const value: AIAssistantContextType = {
    chatOpen,
    setChatOpen,
    chatMessages,
    setChatMessages,
    inputMessage,
    setInputMessage,
    isLoading,
    setIsLoading,
    sendToGemini,
    handleSendMessage,
  };

  return (
    <AIAssistantContext.Provider value={value}>
      {children}
    </AIAssistantContext.Provider>
  );
};

// Hook for using the context
export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};
