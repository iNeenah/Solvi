import { useState, useEffect } from 'react';
import { designTokens } from './designTokens.js';

// Hook for responsive screen size detection
export function useResponsive() {
  const [screenSize, setScreenSize] = useState('mobile');
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 640) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return screenSize;
}

// Utility function to combine responsive styles
export function getResponsiveStyle(baseStyle, tabletStyle, desktopStyle, screenSize) {
  let combinedStyle = { ...baseStyle };
  
  if (screenSize === 'tablet' && tabletStyle) {
    combinedStyle = { ...combinedStyle, ...tabletStyle };
  } else if (screenSize === 'desktop' && desktopStyle) {
    combinedStyle = { ...combinedStyle, ...desktopStyle };
  }
  
  return combinedStyle;
}

// Grid system utilities
export const gridSystem = {
  container: {
    mobile: {
      maxWidth: '100%',
      paddingLeft: designTokens.spacing[2],
      paddingRight: designTokens.spacing[2],
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    tablet: {
      maxWidth: '768px',
      paddingLeft: designTokens.spacing[4],
      paddingRight: designTokens.spacing[4]
    },
    desktop: {
      maxWidth: '1400px',
      paddingLeft: designTokens.spacing[6],
      paddingRight: designTokens.spacing[6]
    }
  },
  
  grid: {
    display: 'grid',
    gap: designTokens.spacing[2],
    mobile: {
      gridTemplateColumns: '1fr'
    },
    tablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: designTokens.spacing[3]
    },
    desktop: {
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: designTokens.spacing[4]
    }
  }
};

// Responsive typography utilities
export const responsiveTypography = {
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: designTokens.typography.fontWeight.bold,
    lineHeight: designTokens.typography.lineHeight.tight,
    letterSpacing: designTokens.typography.letterSpacing.tight
  },
  
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.lineHeight.tight
  },
  
  bodyText: {
    fontSize: designTokens.typography.fontSize.base,
    lineHeight: designTokens.typography.lineHeight.relaxed,
    fontWeight: designTokens.typography.fontWeight.normal
  },
  
  supportingText: {
    fontSize: designTokens.typography.fontSize.sm,
    lineHeight: designTokens.typography.lineHeight.normal,
    fontWeight: designTokens.typography.fontWeight.normal
  }
};

// Glassmorphism utility function
export function createGlassmorphism(intensity = 'medium') {
  const effects = {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }
  };
  
  return effects[intensity] || effects.medium;
}

// Animation utilities
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, transform: 'translateY(30px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: 'all 0.6s ease'
  },
  
  slideIn: {
    initial: { opacity: 0, transform: 'translateX(-30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
    transition: 'all 0.5s ease'
  },
  
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: 'all 0.4s ease'
  },
  
  hover: {
    transform: 'translateY(-5px)',
    transition: designTokens.transitions.normal
  }
};

// Media query utilities
export const mediaQueries = {
  mobile: `@media (max-width: ${designTokens.breakpoints.tablet})`,
  tablet: `@media (min-width: ${designTokens.breakpoints.tablet}) and (max-width: ${designTokens.breakpoints.desktop})`,
  desktop: `@media (min-width: ${designTokens.breakpoints.desktop})`,
  wide: `@media (min-width: ${designTokens.breakpoints.wide})`
};

export default {
  useResponsive,
  getResponsiveStyle,
  gridSystem,
  responsiveTypography,
  createGlassmorphism,
  animations,
  mediaQueries
};