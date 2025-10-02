import React from 'react';
import { Layout, Button, Typography, Avatar, Input } from 'antd';
import {
  SettingOutlined,
  BellOutlined,
  CloseOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useAIAssistant } from '@/contexts/AIAssistantContext';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header: React.FC = () => {
  // 使用全局AI助手状态
  const {
    chatOpen,
    setChatOpen,
    chatMessages,
    inputMessage,
    setInputMessage,
    isLoading,
    handleSendMessage,
  } = useAIAssistant();

  return (
    <>
    <AntHeader className="bg-white shadow-sm border-b border-gray-200" style={{ height: '64px', lineHeight: 'normal' }}>
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center min-w-0 flex-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <div className="relative">
              <span className="text-white font-extrabold text-lg tracking-tight">AI</span>
              <div
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
                  boxShadow: '0 0 8px rgba(0, 245, 255, 0.6)'
                }}
              />
            </div>
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <div className="text-gray-900 font-semibold text-lg leading-tight truncate">
              Galaxy AI Platform
            </div>
            <div className="text-gray-500 text-sm leading-tight truncate">
              智能化研发场景解决方案
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="text-gray-600 hover:text-blue-500 transition-colors"
            style={{ padding: '4px 8px', height: '32px' }}
          />
          <Button
            type="text"
            icon={<SettingOutlined />}
            className="text-gray-600 hover:text-blue-500 transition-colors"
            style={{ padding: '4px 8px', height: '32px' }}
          />

          {/* AI助手按钮 */}
          <button
            className="relative group px-4 py-2 rounded-xl font-medium flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ml-2"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
            }}
            onClick={() => setChatOpen(true)}
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{
                   background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                 }}
            />
            <div className="relative flex items-center">
              <div className="mr-2 p-1 rounded-lg bg-white/20 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-md flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
                     }}>
                  <div className="w-1 h-1 bg-white rounded-sm animate-pulse" />
                </div>
              </div>
              <span className="text-white text-sm font-medium tracking-wide hidden sm:inline">AI助手</span>
              <div className="ml-1 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </button>

          <div className="flex items-center ml-2">
            <Avatar
              size={28}
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
              alt="用户头像"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Galaxy001</span>
          </div>
        </div>
      </div>
    </AntHeader>

    {/* AI助手聊天框 - 全局可用 */}
    {chatOpen && (
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div style={{
              width: '24px',
              height: '24px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                background: 'white',
                borderRadius: '0px'
              }} />
            </div>
            <Typography.Text strong style={{ fontSize: '16px' }}>Galaxy AI Chat</Typography.Text>
          </div>
          <Button type="text" icon={<CloseOutlined />} onClick={() => setChatOpen(false)} />
        </div>

        {/* Chat Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {chatMessages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: '60px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'white',
                  borderRadius: '0px'
                }} />
              </div>
              <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>开始与AI助手对话</p>
              <p style={{ fontSize: '14px', color: '#999' }}>我可以帮助您分析需求、优化流程、解答平台使用问题</p>
            </div>
          ) : (
            <div>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '0px',
                    backgroundColor: msg.role === 'user' ? '#667eea' : '#f8f9fa',
                    color: msg.role === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '0px',
                    backgroundColor: '#f8f9fa',
                    color: '#333',
                    fontSize: '14px'
                  }}>
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent"></div>
                      <span>AI正在思考...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #f0f0f0',
          background: 'white'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="输入您的问题..."
              onPressEnter={handleSendMessage}
              disabled={isLoading}
              style={{
                borderRadius: '0px',
                fontSize: '14px'
              }}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              loading={isLoading}
              disabled={!inputMessage.trim()}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '0px',
                height: '32px'
              }}
            >
              <SendOutlined />
            </Button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Header;
