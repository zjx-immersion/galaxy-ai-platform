import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, App } from 'antd';
import antdTheme from '@/theme/antd-theme';
import { AIAssistantProvider } from '@/contexts/AIAssistantContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy AI Platform",
  description: "AI工具平台 - MCP、Agent、上下文管理、提示词、多任务、知识库等工具集成平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider theme={antdTheme}>
          <App>
            <AIAssistantProvider>
              {children}
            </AIAssistantProvider>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
