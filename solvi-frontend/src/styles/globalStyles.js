import { designTokens, gradients, glassmorphism } from './designTokens.js';

// Global CSS injection function
export function injectGlobalStyles() {
  const globalCSS = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: ${designTokens.typography.fontFamily.primary.join(', ')};
      font-size: ${designTokens.typography.fontSize.base};
      line-height: ${designTokens.typography.lineHeight.relaxed};
      color: ${designTokens.colors.neutral[900]};
      background: ${designTokens.colors.neutral[50]};
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Animations */
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    /* Utility classes */
    .fade-in-up {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .slide-in-left {
      animation: slideInLeft 0.5s ease forwards;
    }
    
    .scale-in {
      animation: scaleIn 0.4s ease forwards;
    }
    
    .float {
      animation: float 3s ease-in-out infinite;
    }
    
    /* Focus styles for accessibility */
    *:focus {
      outline: 2px solid ${designTokens.colors.primary[500]};
      outline-offset: 2px;
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      body {
        background: ${designTokens.colors.white};
        color: ${designTokens.colors.black};
      }
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = globalCSS;
  document.head.appendChild(styleSheet);
}

// Button style generator
export function createButtonStyles(variant = 'primary', size = 'medium') {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: designTokens.spacing[1],
    border: 'none',
    borderRadius: designTokens.borderRadius.md,
    fontFamily: designTokens.typography.fontFamily.primary.join(', '),
    fontWeight: designTokens.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: designTokens.transitions.normal,
    textDecoration: 'none',
    outline: 'none'
  };
  
  const variants = {
    primary: {
      background: gradients.accent,
      color: designTokens.colors.white,
      boxShadow: designTokens.shadows.md,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: designTokens.shadows.lg
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: designTokens.shadows.sm
      }
    },
    secondary: {
      background: designTokens.colors.white,
      color: designTokens.colors.primary[600],
      border: `2px solid ${designTokens.colors.primary[200]}`,
      '&:hover': {
        backgroundColor: designTokens.colors.primary[50],
        borderColor: designTokens.colors.primary[300]
      }
    },
    outline: {
      background: 'transparent',
      color: designTokens.colors.primary[600],
      border: `2px solid ${designTokens.colors.primary[600]}`,
      '&:hover': {
        backgroundColor: designTokens.colors.primary[600],
        color: designTokens.colors.white
      }
    },
    ghost: {
      background: 'transparent',
      color: designTokens.colors.neutral[700],
      '&:hover': {
        backgroundColor: designTokens.colors.neutral[100]
      }
    }
  };
  
  const sizes = {
    small: {
      padding: `${designTokens.spacing[1]} ${designTokens.spacing[2]}`,
      fontSize: designTokens.typography.fontSize.sm,
      minHeight: '36px'
    },
    medium: {
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.base,
      minHeight: '44px'
    },
    large: {
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      fontSize: designTokens.typography.fontSize.lg,
      minHeight: '52px'
    }
  };
  
  return {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size]
  };
}

// Card style generator
export function createCardStyles(variant = 'default', elevation = 'medium') {
  const baseStyles = {
    borderRadius: designTokens.borderRadius.md,
    transition: designTokens.transitions.normal,
    overflow: 'hidden'
  };
  
  const variants = {
    default: {
      backgroundColor: designTokens.colors.white,
      border: `1px solid ${designTokens.colors.neutral[200]}`
    },
    glass: {
      ...glassmorphism.medium,
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    elevated: {
      backgroundColor: designTokens.colors.white,
      border: 'none'
    }
  };
  
  const elevations = {
    none: {
      boxShadow: 'none'
    },
    small: {
      boxShadow: designTokens.shadows.sm
    },
    medium: {
      boxShadow: designTokens.shadows.md
    },
    large: {
      boxShadow: designTokens.shadows.lg
    }
  };
  
  return {
    ...baseStyles,
    ...variants[variant],
    ...elevations[elevation]
  };
}

// Container style generator
export function createContainerStyles(maxWidth = 'desktop') {
  const maxWidths = {
    mobile: '100%',
    tablet: '768px',
    desktop: '1200px',
    wide: '1400px'
  };
  
  return {
    width: '100%',
    maxWidth: maxWidths[maxWidth],
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: designTokens.spacing[2],
    paddingRight: designTokens.spacing[2],
    '@media (min-width: 640px)': {
      paddingLeft: designTokens.spacing[4],
      paddingRight: designTokens.spacing[4]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: designTokens.spacing[6],
      paddingRight: designTokens.spacing[6]
    }
  };
}

// Header style generator
export function createHeaderStyles() {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: designTokens.zIndex.fixed,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${designTokens.spacing[2]}`,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
    boxShadow: designTokens.shadows.sm,
    transition: designTokens.transitions.normal,
    '@media (min-width: 1024px)': {
      padding: `0 ${designTokens.spacing[6]}`,
      maxWidth: '1400px',
      margin: '0 auto',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  };
}

export default {
  injectGlobalStyles,
  createButtonStyles,
  createCardStyles,
  createContainerStyles,
  createHeaderStyles
};