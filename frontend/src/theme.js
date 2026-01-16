export const theme = {
  colors: {
    primary: '#4F46E5', // Indigo 600
    primaryDark: '#4338CA', // Indigo 700
    primaryLight: '#818CF8', // Indigo 400
    secondary: '#6B7280', // Gray 500
    secondaryDark: '#4B5563', // Gray 600
    success: '#10B981', // Emerald 500
    warning: '#F59E0B', // Amber 500
    danger: '#EF4444', // Red 500
    dangerDark: '#DC2626', // Red 600
    background: '#F3F4F6', // Gray 100
    paper: '#FFFFFF', // White
    text: '#1F2937', // Gray 800
    textLight: '#6B7280', // Gray 500
    border: '#E5E7EB', // Gray 200
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h1: {
      size: '2.25rem', // 36px
      weight: '700',
      lineHeight: '1.2',
    },
    h2: {
      size: '1.875rem', // 30px
      weight: '600',
      lineHeight: '1.3',
    },
    h3: {
      size: '1.5rem', // 24px
      weight: '600',
      lineHeight: '1.4',
    },
    body: {
      size: '1rem', // 16px
      weight: '400',
      lineHeight: '1.5',
    },
    small: {
      size: '0.875rem', // 14px
      weight: '400',
      lineHeight: '1.5',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    2: '0.5rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }
};
