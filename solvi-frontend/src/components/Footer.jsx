import { useState } from 'react';
import CTAButton from './CTAButton.jsx';
import { designTokens } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function Footer() {
  const screenSize = useResponsive();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerStyles = {
    footer: {
      backgroundColor: designTokens.colors.neutral[900],
      color: designTokens.colors.neutral[300],
      padding: `${designTokens.spacing[12]} ${designTokens.spacing[2]} ${designTokens.spacing[6]} ${designTokens.spacing[2]}`
    },
    
    footerDesktop: {
      padding: `${designTokens.spacing[16]} ${designTokens.spacing[6]} ${designTokens.spacing[8]} ${designTokens.spacing[6]}`
    },
    
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: designTokens.spacing[8],
      marginBottom: designTokens.spacing[8]
    },
    
    mainContentTablet: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: designTokens.spacing[6]
    },
    
    mainContentDesktop: {
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: designTokens.spacing[8]
    },
    
    brandSection: {
      marginBottom: designTokens.spacing[4]
    },
    
    logo: {
      fontSize: '32px',
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.white,
      marginBottom: designTokens.spacing[3],
      display: 'block'
    },
    
    brandDescription: {
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.relaxed,
      color: designTokens.colors.neutral[400],
      marginBottom: designTokens.spacing[4],
      maxWidth: '300px'
    },
    
    socialLinks: {
      display: 'flex',
      gap: designTokens.spacing[2]
    },
    
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      backgroundColor: designTokens.colors.neutral[800],
      borderRadius: designTokens.borderRadius.md,
      color: designTokens.colors.neutral[400],
      textDecoration: 'none',
      fontSize: '18px',
      transition: 'all 0.3s ease'
    },
    
    socialLinkHover: {
      backgroundColor: designTokens.colors.primary[600],
      color: designTokens.colors.white,
      transform: 'translateY(-2px)'
    },
    
    footerSection: {
      marginBottom: designTokens.spacing[4]
    },
    
    sectionTitle: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      color: designTokens.colors.white,
      marginBottom: designTokens.spacing[3]
    },
    
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    
    linkItem: {
      marginBottom: designTokens.spacing[2]
    },
    
    link: {
      color: designTokens.colors.neutral[400],
      textDecoration: 'none',
      fontSize: designTokens.typography.fontSize.base,
      transition: 'color 0.3s ease'
    },
    
    linkHover: {
      color: designTokens.colors.primary[400]
    },
    
    newsletterSection: {
      marginBottom: designTokens.spacing[4]
    },
    
    newsletterDescription: {
      fontSize: designTokens.typography.fontSize.base,
      color: designTokens.colors.neutral[400],
      marginBottom: designTokens.spacing[3],
      lineHeight: designTokens.typography.lineHeight.relaxed
    },
    
    newsletterForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing[2]
    },
    
    newsletterFormDesktop: {
      flexDirection: 'row'
    },
    
    emailInput: {
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.neutral[700]}`,
      backgroundColor: designTokens.colors.neutral[800],
      color: designTokens.colors.white,
      fontSize: designTokens.typography.fontSize.base,
      outline: 'none',
      transition: 'border-color 0.3s ease',
      flex: 1
    },
    
    emailInputFocus: {
      borderColor: designTokens.colors.primary[500]
    },
    
    subscribeButton: {
      whiteSpace: 'nowrap'
    },
    
    successMessage: {
      color: designTokens.colors.accent[400],
      fontSize: designTokens.typography.fontSize.sm,
      marginTop: designTokens.spacing[1],
      display: 'flex',
      alignItems: 'center',
      gap: designTokens.spacing[1]
    },
    
    bottomSection: {
      borderTop: `1px solid ${designTokens.colors.neutral[800]}`,
      paddingTop: designTokens.spacing[6],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: designTokens.spacing[4],
      textAlign: 'center'
    },
    
    bottomSectionDesktop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left'
    },
    
    copyright: {
      fontSize: designTokens.typography.fontSize.sm,
      color: designTokens.colors.neutral[500]
    },
    
    legalLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: designTokens.spacing[4]
    },
    
    legalLinksDesktop: {
      justifyContent: 'flex-end'
    },
    
    legalLink: {
      color: designTokens.colors.neutral[500],
      textDecoration: 'none',
      fontSize: designTokens.typography.fontSize.sm,
      transition: 'color 0.3s ease'
    },
    
    legalLinkHover: {
      color: designTokens.colors.primary[400]
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { label: 'Características', href: '#features' },
      { label: 'Cómo Funciona', href: '#how-it-works' },
      { label: 'Precios', href: '#pricing' },
      { label: 'API', href: '#api' }
    ],
    company: [
      { label: 'Acerca de', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Carreras', href: '#careers' },
      { label: 'Prensa', href: '#press' }
    ],
    support: [
      { label: 'Centro de Ayuda', href: '#help' },
      { label: 'Contacto', href: '#contact' },
      { label: 'Estado del Sistema', href: '#status' },
      { label: 'Documentación', href: '#docs' }
    ]
  };

  const socialLinks = [
    { icon: '𝕏', href: 'https://twitter.com/solvi', label: 'Twitter' },
    { icon: '📘', href: 'https://facebook.com/solvi', label: 'Facebook' },
    { icon: '💼', href: 'https://linkedin.com/company/solvi', label: 'LinkedIn' },
    { icon: '📷', href: 'https://instagram.com/solvi', label: 'Instagram' }
  ];

  return (
    <footer style={getResponsiveStyle(
      footerStyles.footer,
      null,
      footerStyles.footerDesktop,
      screenSize
    )}>
      <div style={footerStyles.container}>
        {/* Main footer content */}
        <div style={getResponsiveStyle(
          footerStyles.mainContent,
          footerStyles.mainContentTablet,
          footerStyles.mainContentDesktop,
          screenSize
        )}>
          {/* Brand section */}
          <div style={footerStyles.brandSection}>
            <div style={footerStyles.logo}>Solvi</div>
            <p style={footerStyles.brandDescription}>
              Transformando el acceso al crédito en América Latina a través de 
              tecnología blockchain y análisis de datos inteligente.
            </p>
            <div style={footerStyles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={footerStyles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, footerStyles.socialLinkHover);
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = designTokens.colors.neutral[800];
                    e.target.style.color = designTokens.colors.neutral[400];
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div style={footerStyles.footerSection}>
            <h3 style={footerStyles.sectionTitle}>Producto</h3>
            <ul style={footerStyles.linkList}>
              {footerLinks.product.map((link, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  <a
                    href={link.href}
                    style={footerStyles.link}
                    onMouseEnter={(e) => {
                      e.target.style.color = footerStyles.linkHover.color;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = designTokens.colors.neutral[400];
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div style={footerStyles.footerSection}>
            <h3 style={footerStyles.sectionTitle}>Empresa</h3>
            <ul style={footerStyles.linkList}>
              {footerLinks.company.map((link, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  <a
                    href={link.href}
                    style={footerStyles.link}
                    onMouseEnter={(e) => {
                      e.target.style.color = footerStyles.linkHover.color;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = designTokens.colors.neutral[400];
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter section */}
          <div style={footerStyles.newsletterSection}>
            <h3 style={footerStyles.sectionTitle}>Newsletter</h3>
            <p style={footerStyles.newsletterDescription}>
              Mantente al día con las últimas noticias y actualizaciones de Solvi.
            </p>
            <form 
              style={getResponsiveStyle(
                footerStyles.newsletterForm,
                null,
                footerStyles.newsletterFormDesktop,
                screenSize
              )}
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={footerStyles.emailInput}
                onFocus={(e) => {
                  e.target.style.borderColor = footerStyles.emailInputFocus.borderColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = designTokens.colors.neutral[700];
                }}
                required
              />
              <CTAButton
                type="submit"
                variant="primary"
                size="medium"
                style={footerStyles.subscribeButton}
              >
                Suscribirse
              </CTAButton>
            </form>
            {isSubscribed && (
              <div style={footerStyles.successMessage}>
                <span>✅</span>
                <span>¡Gracias por suscribirte!</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div style={getResponsiveStyle(
          footerStyles.bottomSection,
          null,
          footerStyles.bottomSectionDesktop,
          screenSize
        )}>
          <div style={footerStyles.copyright}>
            © 2024 Solvi. Todos los derechos reservados.
          </div>
          <div style={getResponsiveStyle(
            footerStyles.legalLinks,
            null,
            footerStyles.legalLinksDesktop,
            screenSize
          )}>
            <a
              href="#privacy"
              style={footerStyles.legalLink}
              onMouseEnter={(e) => {
                e.target.style.color = footerStyles.legalLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = designTokens.colors.neutral[500];
              }}
            >
              Privacidad
            </a>
            <a
              href="#terms"
              style={footerStyles.legalLink}
              onMouseEnter={(e) => {
                e.target.style.color = footerStyles.legalLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = designTokens.colors.neutral[500];
              }}
            >
              Términos
            </a>
            <a
              href="#cookies"
              style={footerStyles.legalLink}
              onMouseEnter={(e) => {
                e.target.style.color = footerStyles.legalLinkHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = designTokens.colors.neutral[500];
              }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;