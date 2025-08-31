// Componente para el formulario de solicitud de préstamo
import { useState, useEffect } from 'react';

const LoanRequestForm = ({ 
  creditAnalysis, 
  validation, 
  onSubmit, 
  isLoading,
  platform 
}) => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState(12); // 12% anual por defecto
  const [termMonths, setTermMonths] = useState(3); // 3 meses por defecto
  const [errors, setErrors] = useState({});

  const maxLimit = creditAnalysis?.limiteMaximo || 0;
  const isEligible = validation?.valido || false;

  // Calcular detalles del préstamo
  const loanDetails = {
    principal: parseFloat(amount) || 0,
    monthlyRate: interestRate / 12 / 100,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0
  };

  if (loanDetails.principal > 0) {
    loanDetails.totalInterest = (loanDetails.principal * interestRate * termMonths) / (12 * 100);
    loanDetails.totalPayment = loanDetails.principal + loanDetails.totalInterest;
    loanDetails.monthlyPayment = loanDetails.totalPayment / termMonths;
  }

  // Validar formulario
  useEffect(() => {
    const newErrors = {};
    
    if (amount && parseFloat(amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }
    
    if (amount && parseFloat(amount) > maxLimit) {
      newErrors.amount = `El monto no puede exceder $${maxLimit} USD`;
    }
    
    if (interestRate < 5 || interestRate > 50) {
      newErrors.interestRate = 'La tasa debe estar entre 5% y 50%';
    }
    
    if (termMonths < 1 || termMonths > 12) {
      newErrors.termMonths = 'El plazo debe estar entre 1 y 12 meses';
    }
    
    setErrors(newErrors);
  }, [amount, interestRate, termMonths, maxLimit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0 || !isEligible) {
      return;
    }
    
    onSubmit({
      amount: parseFloat(amount),
      interestRate,
      termMonths,
      loanDetails
    });
  };

  if (!isEligible) {
    return (
      <div style={styles.ineligibleContainer}>
        <div style={styles.warningIcon}>⚠️</div>
        <h3 style={styles.ineligibleTitle}>No Elegible para Préstamos</h3>
        <p style={styles.ineligibleReason}>{validation?.razon}</p>
        
        <div style={styles.requirementsList}>
          <h4>Requisitos para ser elegible:</h4>
          <ul>
            <li>Mínimo 3 meses de historial de ventas</li>
            <li>Actividad comercial consistente</li>
            <li>Ventas promedio mínimas de $500 USD/día</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Solicitar Microcrédito</h3>
        <div style={styles.platformBadge}>
          {platform?.toUpperCase()}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo de monto */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Monto del Préstamo (USD)
          </label>
          <div style={styles.inputContainer}>
            <span style={styles.currencySymbol}>$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Máximo: ${maxLimit.toLocaleString()}`}
              style={{
                ...styles.input,
                ...(errors.amount && styles.inputError)
              }}
              max={maxLimit}
              min="1"
              step="1"
              disabled={isLoading}
            />
          </div>
          {errors.amount && (
            <div style={styles.errorMessage}>{errors.amount}</div>
          )}
          <div style={styles.limitInfo}>
            Límite disponible: ${maxLimit.toLocaleString()} USD
          </div>
        </div>

        {/* Campo de tasa de interés */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Tasa de Interés Anual (%)
          </label>
          <div style={styles.sliderContainer}>
            <input
              type="range"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              min="5"
              max="50"
              step="0.5"
              style={styles.slider}
              disabled={isLoading}
            />
            <div style={styles.sliderValue}>{interestRate}%</div>
          </div>
          {errors.interestRate && (
            <div style={styles.errorMessage}>{errors.interestRate}</div>
          )}
        </div>

        {/* Campo de plazo */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Plazo (meses)
          </label>
          <select
            value={termMonths}
            onChange={(e) => setTermMonths(parseInt(e.target.value))}
            style={styles.select}
            disabled={isLoading}
          >
            {[1, 2, 3, 4, 5, 6, 9, 12].map(months => (
              <option key={months} value={months}>
                {months} {months === 1 ? 'mes' : 'meses'}
              </option>
            ))}
          </select>
          {errors.termMonths && (
            <div style={styles.errorMessage}>{errors.termMonths}</div>
          )}
        </div>

        {/* Resumen del préstamo */}
        {loanDetails.principal > 0 && (
          <div style={styles.loanSummary}>
            <h4 style={styles.summaryTitle}>Resumen del Préstamo</h4>
            
            <div style={styles.summaryGrid}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Capital:</span>
                <span style={styles.summaryValue}>
                  ${loanDetails.principal.toLocaleString()}
                </span>
              </div>
              
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Intereses:</span>
                <span style={styles.summaryValue}>
                  ${loanDetails.totalInterest.toFixed(2)}
                </span>
              </div>
              
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Total a Pagar:</span>
                <span style={styles.summaryValueTotal}>
                  ${loanDetails.totalPayment.toFixed(2)}
                </span>
              </div>
              
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Pago Mensual:</span>
                <span style={styles.summaryValue}>
                  ${loanDetails.monthlyPayment.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            ...(isLoading && styles.submitButtonDisabled),
            ...(Object.keys(errors).length > 0 && styles.submitButtonDisabled)
          }}
          disabled={isLoading || Object.keys(errors).length > 0 || !amount}
        >
          {isLoading ? (
            <>
              <div style={styles.spinner}></div>
              Procesando...
            </>
          ) : (
            'Solicitar Préstamo'
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#e0e0e0'
  },
  platformBadge: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#ccc'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  currencySymbol: {
    position: 'absolute',
    left: '12px',
    color: '#888',
    fontSize: '1rem',
    zIndex: 1
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 32px',
    backgroundColor: '#2c2c2c',
    border: '1px solid #555',
    borderRadius: '8px',
    color: '#f0f0f0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  select: {
    padding: '12px',
    backgroundColor: '#2c2c2c',
    border: '1px solid #555',
    borderRadius: '8px',
    color: '#f0f0f0',
    fontSize: '1rem',
    outline: 'none'
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  slider: {
    flex: 1,
    height: '6px',
    backgroundColor: '#444',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  sliderValue: {
    minWidth: '50px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  errorMessage: {
    fontSize: '0.8rem',
    color: '#ef4444',
    marginTop: '0.25rem'
  },
  limitInfo: {
    fontSize: '0.8rem',
    color: '#888'
  },
  loanSummary: {
    padding: '1.5rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    border: '1px solid #333'
  },
  summaryTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    color: '#e0e0e0'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: '0.9rem',
    color: '#ccc'
  },
  summaryValue: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#fff'
  },
  summaryValueTotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '14px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none'
  },
  submitButtonDisabled: {
    backgroundColor: '#444',
    cursor: 'not-allowed',
    opacity: 0.6
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  ineligibleContainer: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#2c1810',
    borderRadius: '8px',
    border: '1px solid #f97316'
  },
  warningIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  ineligibleTitle: {
    margin: '0 0 1rem 0',
    color: '#f97316',
    fontSize: '1.25rem'
  },
  ineligibleReason: {
    margin: '0 0 1.5rem 0',
    color: '#ccc',
    lineHeight: 1.5
  },
  requirementsList: {
    textAlign: 'left',
    color: '#ccc'
  }
};

export default LoanRequestForm;