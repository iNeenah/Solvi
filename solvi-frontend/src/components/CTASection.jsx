import CTAButton from './CTAButton.jsx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { designTokens, gradients } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function CTASection() {
  const screenSize = useResponsive();

  const sectionStyles = {
    section: {
      padding: `${designTokens.spacing[12]} ${designTokens.spacing[2]}`,
      background: gradients.hero,
      position: 'relative',
      overflow: 'hidden'
    },
    
    sectionDesktop: {
      padding: `${designTokens.spacing[16]} ${designTokens.spacing[6]}`
    },
    
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },
    
    title: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[3],
      lineHeight: designTokens.typography.lineHeight.tight
    },
    
    subtitle: {
      fontSize: designTokens.typography.fontSize.lg,
      color: designTokens.colors.neutral[600],
      lineHeight: designTokens.typography.lineHeight.relaxed,
      marginBottom: designTokens.spacing[6],
      maxWidth: '600px',
      margin: `0 auto ${designTokens.spacing[6]} auto`
    },
    
    subtitleDesktop: {
      fontSize: designTokens.typography.fontSize.xl,
      marginBottom: designTokens.spacing[8]
    },
    
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: designTokens.spacing[3],
      marginBottom: designTokens.spacing[6]
    },
    
    buttonGroupDesktop: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: designTokens.spacing[4],
      marginBottom: designTokens.spacing[8]
    },
    
    trustIndicators: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: designTokens.spacing[2],
      opacity: 0.8
    },
    
    trustIndicatorsDesktop: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: designTokens.spacing[6]
    },
    
    trustItem: {
      display: 'flex',
      alignItems: 'center',
      gap: designTokens.spacing[1],
      fontSize: designTokens.typography.fontSize.sm,
      color: designTokens.colors.neutral[600],
      fontWeight: designTokens.typography.fontWeight.medium
    },
    
    trustIcon: {
      fontSize: '16px',
      color: designTokens.colors.accent[500]
    },
    
    decorativeCircle1: {
      position: 'absolute',
      top: '10%',
      left: '5%',
      width: '120px',
      height: '120px',
      background: `linear-gradient(45deg, ${designTokens.colors.primary[200]}, ${designTokens.colors.accent[200]})`,
      borderRadius: '50%',
      opacity: 0.3,
      animation: 'float 6s ease-in-out infinite',
      zIndex: 1
    },
    
    decorativeCircle2: {
      position: 'absolute',
      bottom: '15%',
      right: '8%',
      width: '80px',
      height: '80px',
      background: `linear-gradient(45deg, ${designTokens.colors.accent[200]}, ${designTokens.colors.primary[200]})`,
      borderRadius: '50%',
      opacity: 0.3,
      animation: 'float 8s ease-in-out infinite reverse',
      zIndex: 1
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section or open modal
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={getResponsiveStyle(
      sectionStyles.section,
      null,
      sectionStyles.sectionDesktop,
      screenSize
    )}>
      {/* Decorative elements */}
      <div style={sectionStyles.decorativeCircle1} />
      <div style={sectionStyles.decorativeCircle2} />
      
      <div style={sectionStyles.container}>
        {/* Main heading */}
        <h2 style={sectionStyles.title}>
          ¿Listo para transformar tu negocio?
        </h2>
        
        {/* Subtitle */}
        <p style={getResponsiveStyle(
          sectionStyles.subtitle,
          null,
          sectionStyles.subtitleDesktop,
          screenSize
        )}>
          Únete a cientos de comerciantes que ya están accediendo a financiamiento 
          instantáneo y construyendo el futuro de las finanzas en LATAM.
        </p>
        
        {/* CTA Buttons */}
        <div style={getResponsiveStyle(
          sectionStyles.buttonGroup,
          null,
          sectionStyles.buttonGroupDesktop,
          screenSize
        )}>
          <ConnectButton />
          
          <CTAButton
            variant="outline"
            size="medium"
            onClick={handleLearnMore}
            icon="📖"
          >
            Conocer Más
          </CTAButton>
        </div>
        
        {/* Trust indicators */}
        <div style={getResponsiveStyle(
          sectionStyles.trustIndicators,
          null,
          sectionStyles.trustIndicatorsDesktop,
          screenSize
        )}>
          <div style={sectionStyles.trustItem}>
            <span style={sectionStyles.trustIcon}>🔒</span>
            <span>100% Seguro</span>
          </div>
          
          <div style={sectionStyles.trustItem}>
            <span style={sectionStyles.trustIcon}>⚡</span>
            <span>Aprobación Instantánea</span>
          </div>
          
          <div style={sectionStyles.trustItem}>
            <span style={sectionStyles.trustIcon}>🌟</span>
            <span>Sin Comisiones Ocultas</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;