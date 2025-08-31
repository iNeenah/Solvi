import { useState } from 'react';
import { designTokens, gradients } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function CTAButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  icon = null,
  className = ''
}) {
  const screenSize = useResponsive();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyles = {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: designTokens.spacing[1],
      border: 'none',
      borderRadius: designTokens.borderRadius.md,
      fontFamily: designTokens.typography.fontFamily.primary.join(', '),
      fontWeight: designTokens.typography.fontWeight.semibold,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      outline: 'none',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    },
    
    // Size variants
    small: {
      padding: `${designTokens.spacing[1]} ${designTokens.spacing[3]}`,
      fontSize: designTokens.typography.fontSize.sm,
      minHeight: '36px'
    },
    
    medium: {
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.base,
      minHeight: '48px'
    },
    
    mediumDesktop: {
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      fontSize: designTokens.typography.fontSize.lg,
      minHeight: '52px'
    },
    
    large: {
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      fontSize: designTokens.typography.fontSize.lg,
      minHeight: '56px'
    },
    
    largeDesktop: {
      padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
      fontSize: designTokens.typography.fontSize.xl,
      minHeight: '64px'
    },
    
    // Color variants
    primary: {
      background: gradients.accent,
      color: designTokens.colors.white,
      boxShadow: designTokens.shadows.md
    },
    
    primaryHover: {
      transform: 'translateY(-2px)',
      boxShadow: designTokens.shadows.lg,
      filter: 'brightness(1.1)'
    },
    
    primaryPressed: {
      transform: 'translateY(0)',
      boxShadow: designTokens.shadows.sm
    },
    
    secondary: {
      background: designTokens.colors.white,
      color: designTokens.colors.primary[600],
      border: `2px solid ${designTokens.colors.primary[200]}`,
      boxShadow: designTokens.shadows.sm
    },
    
    secondaryHover: {
      backgroundColor: designTokens.colors.primary[50],
      borderColor: designTokens.colors.primary[300],
      transform: 'translateY(-1px)'
    },
    
    outline: {
      background: 'transparent',
      color: designTokens.colors.primary[600],
      border: `2px solid ${designTokens.colors.primary[600]}`
    },
    
    outlineHover: {
      backgroundColor: designTokens.colors.primary[600],
      color: designTokens.colors.white,
      transform: 'translateY(-1px)'
    },
    
    ghost: {
      background: 'transparent',
      color: designTokens.colors.neutral[700]
    },
    
    ghostHover: {
      backgroundColor: designTokens.colors.neutral[100]
    },
    
    disabled: {
      background: designTokens.colors.neutral[200],
      color: designTokens.colors.neutral[400],
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    
    // Ripple effect
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.6)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      pointerEvents: 'none'
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    const sizeMap = {
      small: buttonStyles.small,
      medium: getResponsiveStyle(
        buttonStyles.medium,
        null,
        buttonStyles.mediumDesktop,
        screenSize
      ),
      large: getResponsiveStyle(
        buttonStyles.large,
        null,
        buttonStyles.largeDesktop,
        screenSize
      )
    };
    return sizeMap[size] || sizeMap.medium;
  };

  // Get variant styles
  const getVariantStyles = () => {
    if (disabled) return buttonStyles.disabled;
    
    const variantMap = {
      primary: {
        ...buttonStyles.primary,
        ...(isHovered && !isPressed ? buttonStyles.primaryHover : {}),
        ...(isPressed ? buttonStyles.primaryPressed : {})
      },
      secondary: {
        ...buttonStyles.secondary,
        ...(isHovered && !isPressed ? buttonStyles.secondaryHover : {})
      },
      outline: {
        ...buttonStyles.outline,
        ...(isHovered && !isPressed ? buttonStyles.outlineHover : {})
      },
      ghost: {
        ...buttonStyles.ghost,
        ...(isHovered && !isPressed ? buttonStyles.ghostHover : {})
      }
    };
    
    return variantMap[variant] || variantMap.primary;
  };

  const combinedStyles = {
    ...buttonStyles.base,
    ...getSizeStyles(),
    ...getVariantStyles()
  };

  const handleClick = (e) => {
    if (disabled) return;
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    if (onClick) onClick(e);
  };

  return (
    <button
      style={combinedStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      className={className}
      aria-disabled={disabled}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}

// Add ripple animation to global styles
const rippleAnimation = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = rippleAnimation;
  document.head.appendChild(style);
}

export default CTAButton;