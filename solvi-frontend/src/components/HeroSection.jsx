import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { designTokens, gradients } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle, responsiveTypography } from '../styles/responsive.js';
import { createButtonStyles } from '../styles/globalStyles.js';

function HeroSection() {
  const screenSize = useResponsive();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyles = {
    section: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradients.background,
      overflow: 'hidden',
      paddingTop: '80px' // Account for fixed header
    },
    
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: gradients.hero,
      zIndex: 1
    },
    
    container: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: `0 ${designTokens.spacing[2]}`,
      textAlign: 'center'
    },
    
    containerDesktop: {
      padding: `0 ${designTokens.spacing[6]}`
    },
    
    content: {
      maxWidth: '900px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease'
    },
    
    title: {
      ...responsiveTypography.heroTitle,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[3],
      textAlign: 'center'
    },
    
    titleDesktop: {
      marginBottom: designTokens.spacing[4],
      fontSize: '4.5rem'
    },
    
    subtitle: {
      fontSize: 'clamp(1.1rem, 3vw, 1.375rem)',
      color: designTokens.colors.neutral[600],
      lineHeight: designTokens.typography.lineHeight.relaxed,
      marginBottom: designTokens.spacing[6],
      maxWidth: '700px',
      margin: `0 auto ${designTokens.spacing[6]} auto`,
      fontWeight: designTokens.typography.fontWeight.normal
    },
    
    subtitleDesktop: {
      marginBottom: designTokens.spacing[8],
      fontSize: '1.375rem'
    },
    
    ctaSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: designTokens.spacing[2],
      marginBottom: designTokens.spacing[8]
    },
    
    ctaSectionDesktop: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: designTokens.spacing[3],
      marginBottom: designTokens.spacing[12]
    },
    
    connectText: {
      color: designTokens.colors.neutral[600],
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      background: designTokens.colors.white,
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      boxShadow: designTokens.shadows.sm,
      marginTop: designTokens.spacing[2]
    },
    
    socialProof: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: designTokens.spacing[4],
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s ease 0.3s'
    },
    
    socialProofDesktop: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: designTokens.spacing[8]
    },
    
    statItem: {
      textAlign: 'center'
    },
    
    statNumber: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.primary[600],
      display: 'block',
      marginBottom: designTokens.spacing[1]
    },
    
    statNumberDesktop: {
      fontSize: designTokens.typography.fontSize['2xl']
    },
    
    statLabel: {
      fontSize: designTokens.typography.fontSize.sm,
      color: designTokens.colors.neutral[600],
      fontWeight: designTokens.typography.fontWeight.medium
    },
    
    decorativeElements: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '80px',
      height: '80px',
      background: gradients.primary,
      borderRadius: '50%',
      opacity: 0.1,
      animation: 'float 6s ease-in-out infinite',
      zIndex: 1
    },
    
    decorativeElements2: {
      position: 'absolute',
      bottom: '30%',
      right: '15%',
      width: '60px',
      height: '60px',
      background: gradients.accent,
      borderRadius: designTokens.borderRadius.md,
      opacity: 0.1,
      animation: 'float 4s ease-in-out infinite reverse',
      zIndex: 1
    }
  };

  return (
    <section style={getResponsiveStyle(
      heroStyles.section,
      null,
      null,
      screenSize
    )}>
      {/* Background overlay */}
      <div style={heroStyles.backgroundOverlay} />
      
      {/* Decorative elements */}
      <div style={heroStyles.decorativeElements} />
      <div style={heroStyles.decorativeElements2} />
      
      {/* Main content */}
      <div style={getResponsiveStyle(
        heroStyles.container,
        null,
        heroStyles.containerDesktop,
        screenSize
      )}>
        <div style={heroStyles.content}>
          {/* Hero title with enhanced impact */}
          <h1 style={getResponsiveStyle(
            heroStyles.title,
            null,
            heroStyles.titleDesktop,
            screenSize
          )}>
            Financiamiento para el motor de LATAM
          </h1>
          
          {/* Enhanced subtitle */}
          <p style={getResponsiveStyle(
            heroStyles.subtitle,
            null,
            heroStyles.subtitleDesktop,
            screenSize
          )}>
            Conectamos comerciantes con inversores a través de microcréditos descentralizados, 
            usando el historial de ventas como garantía digital para impulsar la economía latinoamericana.
          </p>
          
          {/* CTA section */}
          <div style={getResponsiveStyle(
            heroStyles.ctaSection,
            null,
            heroStyles.ctaSectionDesktop,
            screenSize
          )}>
            <ConnectButton />
            <p style={heroStyles.connectText}>
              Conecta tu wallet para comenzar tu experiencia financiera
            </p>
          </div>
          
          {/* Social proof section */}
          <div style={getResponsiveStyle(
            heroStyles.socialProof,
            null,
            heroStyles.socialProofDesktop,
            screenSize
          )}>
            <div style={heroStyles.statItem}>
              <span style={getResponsiveStyle(
                heroStyles.statNumber,
                null,
                heroStyles.statNumberDesktop,
                screenSize
              )}>
                500+
              </span>
              <span style={heroStyles.statLabel}>Comerciantes Activos</span>
            </div>
            
            <div style={heroStyles.statItem}>
              <span style={getResponsiveStyle(
                heroStyles.statNumber,
                null,
                heroStyles.statNumberDesktop,
                screenSize
              )}>
                $2M+
              </span>
              <span style={heroStyles.statLabel}>Financiamiento Otorgado</span>
            </div>
            
            <div style={heroStyles.statItem}>
              <span style={getResponsiveStyle(
                heroStyles.statNumber,
                null,
                heroStyles.statNumberDesktop,
                screenSize
              )}>
                15
              </span>
              <span style={heroStyles.statLabel}>Países de LATAM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;