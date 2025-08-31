import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { designTokens } from '../styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from '../styles/responsive.js';

function Header() {
  const screenSize = useResponsive();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyles = {
    header: {
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
      backgroundColor: isScrolled 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: isScrolled 
        ? `1px solid ${designTokens.colors.neutral[200]}` 
        : '1px solid transparent',
      boxShadow: isScrolled ? designTokens.shadows.md : 'none',
      transition: 'all 0.3s ease'
    },
    
    headerDesktop: {
      padding: `0 ${designTokens.spacing[6]}`,
      maxWidth: '1400px',
      margin: '0 auto',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    
    logo: {
      fontSize: '28px',
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.primary[600],
      letterSpacing: designTokens.typography.letterSpacing.tight,
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    
    logoDesktop: {
      fontSize: '32px'
    },
    
    logoHover: {
      color: designTokens.colors.primary[700]
    },
    
    nav: {
      display: 'none',
      alignItems: 'center',
      gap: designTokens.spacing[6]
    },
    
    navDesktop: {
      display: 'flex'
    },
    
    navLink: {
      color: designTokens.colors.neutral[700],
      textDecoration: 'none',
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      padding: `${designTokens.spacing[1]} ${designTokens.spacing[2]}`,
      borderRadius: designTokens.borderRadius.sm,
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    
    navLinkHover: {
      color: designTokens.colors.primary[600],
      backgroundColor: designTokens.colors.primary[50]
    },
    
    mobileMenuButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      height: '30px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'all 0.3s ease'
    },
    
    mobileMenuButtonDesktop: {
      display: 'none'
    },
    
    hamburgerLine: {
      width: '20px',
      height: '2px',
      backgroundColor: designTokens.colors.neutral[700],
      margin: '2px 0',
      transition: 'all 0.3s ease',
      borderRadius: '1px'
    },
    
    hamburgerLineOpen1: {
      transform: 'rotate(45deg) translate(5px, 5px)'
    },
    
    hamburgerLineOpen2: {
      opacity: 0
    },
    
    hamburgerLineOpen3: {
      transform: 'rotate(-45deg) translate(7px, -6px)'
    },
    
    mobileMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
      boxShadow: designTokens.shadows.lg,
      padding: designTokens.spacing[4],
      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
      opacity: isMobileMenuOpen ? 1 : 0,
      visibility: isMobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    },
    
    mobileNavLink: {
      display: 'block',
      color: designTokens.colors.neutral[700],
      textDecoration: 'none',
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.medium,
      padding: designTokens.spacing[3],
      borderRadius: designTokens.borderRadius.md,
      transition: 'all 0.3s ease',
      marginBottom: designTokens.spacing[1]
    },
    
    mobileNavLinkHover: {
      color: designTokens.colors.primary[600],
      backgroundColor: designTokens.colors.primary[50]
    },
    
    connectButtonWrapper: {
      display: 'flex',
      alignItems: 'center'
    }
  };

  const navigation = [
    { label: 'Inicio', href: '#home' },
    { label: 'Características', href: '#features' },
    { label: 'Cómo Funciona', href: '#how-it-works' },
    { label: 'Contacto', href: '#contact' }
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header style={getResponsiveStyle(
      headerStyles.header,
      null,
      headerStyles.headerDesktop,
      screenSize
    )}>
      {/* Logo */}
      <a 
        href="#home" 
        style={getResponsiveStyle(
          headerStyles.logo,
          null,
          headerStyles.logoDesktop,
          screenSize
        )}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#home');
        }}
        onMouseEnter={(e) => {
          e.target.style.color = headerStyles.logoHover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.color = designTokens.colors.primary[600];
        }}
      >
        Solvi
      </a>

      {/* Desktop Navigation */}
      <nav style={getResponsiveStyle(
        headerStyles.nav,
        null,
        headerStyles.navDesktop,
        screenSize
      )}>
        {navigation.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={headerStyles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.href);
            }}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, headerStyles.navLinkHover);
            }}
            onMouseLeave={(e) => {
              e.target.style.color = designTokens.colors.neutral[700];
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        style={getResponsiveStyle(
          headerStyles.mobileMenuButton,
          null,
          headerStyles.mobileMenuButtonDesktop,
          screenSize
        )}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div style={{
          ...headerStyles.hamburgerLine,
          ...(isMobileMenuOpen ? headerStyles.hamburgerLineOpen1 : {})
        }} />
        <div style={{
          ...headerStyles.hamburgerLine,
          ...(isMobileMenuOpen ? headerStyles.hamburgerLineOpen2 : {})
        }} />
        <div style={{
          ...headerStyles.hamburgerLine,
          ...(isMobileMenuOpen ? headerStyles.hamburgerLineOpen3 : {})
        }} />
      </button>

      {/* Connect Button */}
      <div style={headerStyles.connectButtonWrapper}>
        <ConnectButton />
      </div>

      {/* Mobile Menu */}
      <div style={headerStyles.mobileMenu}>
        {navigation.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={headerStyles.mobileNavLink}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.href);
            }}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, headerStyles.mobileNavLinkHover);
            }}
            onMouseLeave={(e) => {
              e.target.style.color = designTokens.colors.neutral[700];
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export default Header;