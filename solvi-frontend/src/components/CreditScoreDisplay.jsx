// Componente para mostrar el puntaje de confianza de forma visual atractiva
import { useState, useEffect } from 'react';

const CreditScoreDisplay = ({ creditAnalysis, isLoading }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (creditAnalysis?.puntajeConfianza?.puntajeTotal) {
      const targetScore = creditAnalysis.puntajeConfianza.puntajeTotal;
      let current = 0;
      const increment = targetScore / 30; // Animación de 30 frames
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [creditAnalysis]);

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Analizando tu historial de ventas...</p>
      </div>
    );
  }

  if (!creditAnalysis) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📊</div>
        <p>Conecta tu wallet para ver tu perfil crediticio</p>
      </div>
    );
  }

  const { puntajeConfianza, categoriaRiesgo, limiteMaximo } = creditAnalysis;
  const scorePercentage = (animatedScore / 100) * 100;

  return (
    <div style={styles.container}>
      {/* Medidor circular del puntaje */}
      <div style={styles.scoreSection}>
        <div style={styles.circularProgress}>
          <svg width="120" height="120" style={styles.progressSvg}>
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#333"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={categoriaRiesgo.color}
              strokeWidth="8"
              strokeDasharray={`${scorePercentage * 3.14} 314`}
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div style={styles.scoreText}>
            <div style={{ ...styles.scoreNumber, color: categoriaRiesgo.color }}>
              {animatedScore}
            </div>
            <div style={styles.scoreLabel}>/ 100</div>
          </div>
        </div>
        
        <div style={styles.riskBadge}>
          <span style={{ ...styles.riskDot, backgroundColor: categoriaRiesgo.color }}></span>
          {categoriaRiesgo.categoria} Riesgo
        </div>
      </div>

      {/* Desglose de factores */}
      <div style={styles.factorsSection}>
        <h4 style={styles.factorsTitle}>Factores de Evaluación</h4>
        {Object.entries(puntajeConfianza.factores).map(([factor, valor]) => (
          <div key={factor} style={styles.factorRow}>
            <div style={styles.factorInfo}>
              <span style={styles.factorName}>{getFactorName(factor)}</span>
              <span style={styles.factorValue}>{valor}/100</span>
            </div>
            <div style={styles.factorBar}>
              <div 
                style={{
                  ...styles.factorProgress,
                  width: `${valor}%`,
                  backgroundColor: getFactorColor(valor)
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Límite de crédito */}
      <div style={styles.limitSection}>
        <div style={styles.limitAmount}>
          ${limiteMaximo.toLocaleString()} USD
        </div>
        <div style={styles.limitLabel}>Límite Disponible</div>
      </div>
    </div>
  );
};

const getFactorName = (factor) => {
  const names = {
    consistencia: 'Consistencia',
    volumen: 'Volumen',
    crecimiento: 'Crecimiento',
    antiguedad: 'Antigüedad'
  };
  return names[factor] || factor;
};

const getFactorColor = (value) => {
  if (value >= 80) return '#22c55e';
  if (value >= 60) return '#84cc16';
  if (value >= 40) return '#eab308';
  return '#ef4444';
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
    gap: '1rem'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #333',
    borderTop: '4px solid #0d6efd',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
    gap: '1rem',
    color: '#888'
  },
  emptyIcon: {
    fontSize: '3rem',
    opacity: 0.5
  },
  scoreSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '1.5rem',
    backgroundColor: '#2c2c2c',
    borderRadius: '12px',
    border: '1px solid #444'
  },
  circularProgress: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressSvg: {
    transform: 'rotate(-90deg)'
  },
  scoreText: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: 1
  },
  scoreLabel: {
    fontSize: '0.9rem',
    color: '#888',
    marginTop: '-0.2rem'
  },
  riskBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  riskDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  factorsSection: {
    padding: '1.5rem',
    backgroundColor: '#2c2c2c',
    borderRadius: '12px',
    border: '1px solid #444'
  },
  factorsTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    color: '#e0e0e0'
  },
  factorRow: {
    marginBottom: '1rem'
  },
  factorInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  },
  factorName: {
    color: '#ccc'
  },
  factorValue: {
    color: '#fff',
    fontWeight: '500'
  },
  factorBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#444',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  factorProgress: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.8s ease'
  },
  limitSection: {
    padding: '1.5rem',
    backgroundColor: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #3b82f6'
  },
  limitAmount: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.25rem'
  },
  limitLabel: {
    fontSize: '0.9rem',
    color: '#bfdbfe',
    opacity: 0.9
  }
};

// Agregar keyframes para la animación del spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default CreditScoreDisplay;