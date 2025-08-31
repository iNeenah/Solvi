import { designTokens } from '../styles/designTokens.js';

function DemoIndicator() {
  const indicatorStyles = {
    container: {
      position: 'fixed',
      top: '90px',
      right: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: designTokens.colors.white,
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
      borderRadius: designTokens.borderRadius.md,
      boxShadow: designTokens.shadows.lg,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.semibold,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: designTokens.spacing[1],
      animation: 'pulse 2s infinite'
    },
    icon: {
      fontSize: '16px'
    },
    text: {
      fontSize: '12px'
    }
  };

  return (
    <div style={indicatorStyles.container}>
      <span style={indicatorStyles.icon}>🎭</span>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>MODO DEMO</div>
        <div style={indicatorStyles.text}>Transacciones simuladas</div>
      </div>
    </div>
  );
}

// Add pulse animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

export default DemoIndicator;