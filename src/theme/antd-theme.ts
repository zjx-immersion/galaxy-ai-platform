import { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Primary colors - changed to blue theme
    colorPrimary: '#2563eb',

    // Success, Warning, Error colors
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Border radius - no rounded corners across the app
    borderRadius: 0,
    borderRadiusLG: 0,
    borderRadiusSM: 0,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: '#000000',
      headerHeight: 64,
    },
  },
};

export default antdTheme;
