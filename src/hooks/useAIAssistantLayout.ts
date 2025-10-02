import { useAIAssistant } from '@/contexts/AIAssistantContext';

/**
 * Hook for managing layout adjustments when AI assistant is open
 * Returns styles that should be applied to main content areas
 */
export const useAIAssistantLayout = () => {
  const { chatOpen } = useAIAssistant();

  // Standard layout adjustments for AI assistant
  const getContentStyle = (additionalStyle: React.CSSProperties = {}) => ({
    marginRight: chatOpen ? '400px' : '0',
    transition: 'margin-right 0.3s ease',
    ...additionalStyle,
  });

  // For pages with sidebar (like homepage)
  const getContentWithSidebarStyle = (collapsed: boolean, additionalStyle: React.CSSProperties = {}) => ({
    marginLeft: collapsed ? '80px' : '288px',
    marginRight: chatOpen ? '400px' : '0',
    transition: 'margin-left 0.3s ease, margin-right 0.3s ease',
    ...additionalStyle,
  });

  // For modal content that needs to adjust when AI assistant is open
  const getModalContentStyle = (additionalStyle: React.CSSProperties = {}) => ({
    marginRight: chatOpen ? '400px' : '0',
    transition: 'margin-right 0.3s ease',
    ...additionalStyle,
  });

  // For full-width containers
  const getContainerStyle = (additionalStyle: React.CSSProperties = {}) => ({
    maxWidth: chatOpen ? 'calc(100vw - 400px)' : '100vw',
    transition: 'max-width 0.3s ease',
    ...additionalStyle,
  });

  return {
    chatOpen,
    getContentStyle,
    getContentWithSidebarStyle,
    getModalContentStyle,
    getContainerStyle,
  };
};
