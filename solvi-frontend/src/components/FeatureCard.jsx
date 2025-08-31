import { useState } from 'react';
import { designTokens, glassmorphism } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function FeatureCard({ icon, title, description, delay = 0 }) {
  const screenSize = useResponsive();
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    card: {
      padding: `${designTokens.spacing[4]} ${designTokens.spacing[3]}`,
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: designTokens.shadows.sm,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      animation: `fadeInUp 0.6s ease ${delay}s both`
    },
    
    cardDesktop: {
      padding: `${designTokens.spacing[6]} ${designTokens.spacing[4]}`,
      minHeight: '280px'
    },
    
    cardHover: {
      borderColor: designTokens.colors.primary[300],
      boxShadow: designTokens.shadows.lg,
      background: 'rgba(255, 255, 255, 0.95)'
    },
    
    iconContainer: {
      fontSize: '40px',
      marginBottom: designTokens.spacing[2],
      display: 'block',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
    },
    
    iconContainerDesktop: {
      fontSize: '50px',
      marginBottom: designTokens.spacing[3]
    },
    
    title: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      marginBottom: designTokens.spacing[2],
      color: designTokens.colors.neutral[900],
      lineHeight: designTokens.typography.lineHeight.tight
    },
    
    titleDesktop: {
      fontSize: designTokens.typography.fontSize.xl,
      marginBottom: designTokens.spacing[3]
    },
    
    description: {
      color: designTokens.colors.neutral[600],
      lineHeight: designTokens.typography.lineHeight.relaxed,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal
    },
    
    descriptionDesktop: {
      fontSize: designTokens.typography.fontSize.base
    },
    
    shimmer: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      transition: 'left 0.5s ease',
      pointerEvents: 'none'
    },
    
    shimmerActive: {
      left: '100%'
    }
  };

  const combinedCardStyle = {
    ...getResponsiveStyle(
      cardStyles.card,
      null,
      cardStyles.cardDesktop,
      screenSize
    ),
    ...(isHovered ? cardStyles.cardHover : {})
  };

  return (
    <div
      style={combinedCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="feature-card"
    >
      {/* Shimmer effect */}
      <div 
        style={{
          ...cardStyles.shimmer,
          ...(isHovered ? cardStyles.shimmerActive : {})
        }}
      />
      
      {/* Icon */}
      <span style={getResponsiveStyle(
        cardStyles.iconContainer,
        null,
        cardStyles.iconContainerDesktop,
        screenSize
      )}>
        {icon}
      </span>
      
      {/* Title */}
      <h3 style={getResponsiveStyle(
        cardStyles.title,
        null,
        cardStyles.titleDesktop,
        screenSize
      )}>
        {title}
      </h3>
      
      {/* Description */}
      <p style={getResponsiveStyle(
        cardStyles.description,
        null,
        cardStyles.descriptionDesktop,
        screenSize
      )}>
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;