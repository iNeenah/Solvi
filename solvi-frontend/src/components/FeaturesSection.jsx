import FeatureCard from './FeatureCard.jsx';
import { designTokens } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function FeaturesSection() {
  const screenSize = useResponsive();

  const features = [
    {
      icon: '🏪',
      title: 'Para Comerciantes',
      description: 'Accede a microcréditos instantáneos usando tu historial de ventas como garantía digital. Sin papeleos ni esperas.'
    },
    {
      icon: '💸',
      title: 'Para Inversores',
      description: 'Invierte en la economía real de LATAM con rendimientos atractivos y riesgo calculado basado en datos verificados.'
    },
    {
      icon: '🔒',
      title: 'Seguro y Transparente',
      description: 'Tecnología blockchain que garantiza transparencia total y seguridad en cada transacción financiera.'
    },
    {
      icon: '⚡',
      title: 'Instantáneo',
      description: 'Evaluación automática de crédito y desembolso inmediato. Tu negocio no puede esperar, nosotros tampoco.'
    }
  ];

  const sectionStyles = {
    section: {
      padding: `${designTokens.spacing[12]} ${designTokens.spacing[2]}`,
      background: designTokens.colors.white,
      position: 'relative'
    },
    
    sectionDesktop: {
      padding: `${designTokens.spacing[16]} ${designTokens.spacing[6]}`
    },
    
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    header: {
      textAlign: 'center',
      marginBottom: designTokens.spacing[8]
    },
    
    headerDesktop: {
      marginBottom: designTokens.spacing[12]
    },
    
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[3],
      lineHeight: designTokens.typography.lineHeight.tight
    },
    
    subtitle: {
      fontSize: designTokens.typography.fontSize.lg,
      color: designTokens.colors.neutral[600],
      lineHeight: designTokens.typography.lineHeight.relaxed,
      maxWidth: '600px',
      margin: '0 auto'
    },
    
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: designTokens.spacing[3],
      width: '100%'
    },
    
    gridTablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: designTokens.spacing[4]
    },
    
    gridDesktop: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: designTokens.spacing[6]
    },
    
    decorativeElement: {
      position: 'absolute',
      top: '10%',
      right: '5%',
      width: '100px',
      height: '100px',
      background: `linear-gradient(45deg, ${designTokens.colors.primary[100]}, ${designTokens.colors.accent[100]})`,
      borderRadius: '50%',
      opacity: 0.3,
      animation: 'float 8s ease-in-out infinite',
      zIndex: 0
    }
  };

  return (
    <section style={getResponsiveStyle(
      sectionStyles.section,
      null,
      sectionStyles.sectionDesktop,
      screenSize
    )}>
      {/* Decorative element */}
      <div style={sectionStyles.decorativeElement} />
      
      <div style={sectionStyles.container}>
        {/* Section header */}
        <div style={getResponsiveStyle(
          sectionStyles.header,
          null,
          sectionStyles.headerDesktop,
          screenSize
        )}>
          <h2 style={sectionStyles.title}>
            Una plataforma completa para el ecosistema financiero
          </h2>
          <p style={sectionStyles.subtitle}>
            Diseñada específicamente para las necesidades de comerciantes e inversores en América Latina
          </p>
        </div>
        
        {/* Features grid */}
        <div style={getResponsiveStyle(
          sectionStyles.grid,
          sectionStyles.gridTablet,
          sectionStyles.gridDesktop,
          screenSize
        )}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;