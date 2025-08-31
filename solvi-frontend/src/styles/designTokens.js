// Design Tokens for Solvi Landing Page Redesign
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#2563eb', // Main trustworthy blue
      600: '#1d4ed8',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#1e3a8a'
    },
    accent: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Vibrant green for CTAs
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
    neutral: {
      50: '#f8fafc', // Light gray background
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b', // Secondary text
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a' // Primary text
    },
    white: '#ffffff',
    black: '#000000'
  },
  
  typography: {
    fontFamily: {
      primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      mono: ['Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    fontSize: {
      xs: '14px',
      sm: '16px',
      base: '18px', // Enhanced readability
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '48px',
      '4xl': '64px',
      '5xl': '80px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em'
    }
  },
  
  spacing: {
    0: '0',
    1: '8px',   // Base unit
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    8: '64px',
    10: '80px',
    12: '96px',
    16: '128px',
    20: '160px',
    24: '192px'
  },
  
  borderRadius: {
    none: '0',
    sm: '8px',
    md: '12px', // Standard for cards
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
  },
  
  breakpoints: {
    mobile: '0px',
    tablet: '640px',
    desktop: '1024px',
    wide: '1400px'
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
};

// Gradient definitions
export const gradients = {
  primary: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  accent: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  hero: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
  overlay: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)'
};

// Glassmorphism effects
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.25)'
  },
  strong: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }
};

export default designTokens;