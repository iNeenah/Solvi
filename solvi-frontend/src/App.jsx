import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import toast, { Toaster } from 'react-hot-toast';
import { useMerchantData } from './hooks/useMerchantData.js';
import CreditScoreDisplay from './components/CreditScoreDisplay.jsx';
import SalesChart from './components/SalesChart.jsx';
import LoanRequestForm from './components/LoanRequestForm.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import CTASection from './components/CTASection.jsx';
import Footer from './components/Footer.jsx';
import NetworkDiagnostic from './components/NetworkDiagnostic.jsx';
import ContractTester from './components/ContractTester.jsx';
import ContractVerifier from './components/ContractVerifier.jsx';
import DemoIndicator from './components/DemoIndicator.jsx';
import { designTokens } from './styles/designTokens.js';
import { useResponsive, getResponsiveStyle } from './styles/responsive.js';
import { injectGlobalStyles, createCardStyles } from './styles/globalStyles.js';

// Smart contract configuration
const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "prestamista",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "prestatario",
        "type": "address"
      }
    ],
    "name": "PrestamoFinanciado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "prestatario",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "monto",
        "type": "uint256"
      }
    ],
    "name": "PrestamoSolicitado",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "financiarPrestamo",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerPrestamosActivos",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "monto",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "prestatario",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "prestamista",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "financiado",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "activo",
            "type": "bool"
          }
        ],
        "internalType": "struct Solvi.Prestamo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "prestamos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "monto",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "prestatario",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "prestamista",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "financiado",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "activo",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_monto",
        "type": "uint256"
      }
    ],
    "name": "solicitarPrestamo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Landing Page Component
function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}

// Dashboard Component
function Dashboard({ handlers, data, state, merchantData }) {
  const [activeRole, setActiveRole] = useState('merchant');
  const screenSize = useResponsive();
  const { handleSolicitar, handleFinanciar } = handlers;
  const { prestamosActivos } = data;
  const { isConfirming } = state;
  const {
    creditAnalysis,
    isLoading: merchantLoading,
    platform,
    validation,
    salesData,
    metrics
  } = merchantData;

  const dashboardStyles = {
    container: {
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: designTokens.spacing[8],
      paddingLeft: designTokens.spacing[2],
      paddingRight: designTokens.spacing[2]
    },

    containerDesktop: {
      paddingLeft: designTokens.spacing[6],
      paddingRight: designTokens.spacing[6],
      maxWidth: '1400px',
      margin: '0 auto'
    },

    roleSelector: {
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing[2],
      marginBottom: designTokens.spacing[6],
      padding: designTokens.spacing[2],
      backgroundColor: designTokens.colors.white,
      borderRadius: designTokens.borderRadius.md,
      boxShadow: designTokens.shadows.sm,
      maxWidth: '400px',
      margin: `0 auto ${designTokens.spacing[6]} auto`
    },

    roleSelectorDesktop: {
      flexDirection: 'row',
      maxWidth: 'none',
      width: 'fit-content'
    },

    roleButton: {
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: designTokens.borderRadius.sm,
      color: designTokens.colors.neutral[600],
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium
    },

    roleButtonActive: {
      backgroundColor: designTokens.colors.primary[600],
      color: designTokens.colors.white,
      transform: 'translateY(-1px)',
      boxShadow: designTokens.shadows.md
    },

    content: {
      maxWidth: '1200px',
      margin: '0 auto'
    },

    merchantGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: designTokens.spacing[4]
    },

    merchantGridDesktop: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: designTokens.spacing[6]
    },

    lenderContent: {
      maxWidth: '800px',
      margin: '0 auto'
    },

    card: {
      ...createCardStyles('default', 'medium'),
      padding: designTokens.spacing[4]
    },

    cardDesktop: {
      padding: designTokens.spacing[6]
    },

    sectionTitle: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[3]
    },

    sectionDescription: {
      color: designTokens.colors.neutral[600],
      marginBottom: designTokens.spacing[4],
      lineHeight: designTokens.typography.lineHeight.relaxed
    },

    loanCard: {
      backgroundColor: designTokens.colors.neutral[50],
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      padding: designTokens.spacing[4],
      marginBottom: designTokens.spacing[3],
      transition: 'all 0.3s ease'
    },

    loanCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: designTokens.shadows.md,
      borderColor: designTokens.colors.primary[300]
    },

    loanHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: designTokens.spacing[3]
    },

    loanId: {
      fontWeight: designTokens.typography.fontWeight.semibold,
      color: designTokens.colors.primary[600]
    },

    loanAmount: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.bold,
      color: designTokens.colors.accent[600]
    },

    loanDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: designTokens.spacing[1],
      marginBottom: designTokens.spacing[4],
      fontSize: designTokens.typography.fontSize.sm,
      color: designTokens.colors.neutral[600]
    },

    loanDetail: {
      display: 'flex',
      justifyContent: 'space-between'
    },

    button: {
      width: '100%',
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      backgroundColor: designTokens.colors.accent[500],
      color: designTokens.colors.white,
      border: 'none',
      borderRadius: designTokens.borderRadius.md,
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: designTokens.spacing[1]
    },

    buttonHover: {
      backgroundColor: designTokens.colors.accent[600],
      transform: 'translateY(-1px)',
      boxShadow: designTokens.shadows.md
    },

    buttonDisabled: {
      backgroundColor: designTokens.colors.neutral[300],
      cursor: 'not-allowed',
      transform: 'none'
    },

    emptyState: {
      textAlign: 'center',
      padding: designTokens.spacing[8],
      color: designTokens.colors.neutral[500]
    },

    emptyIcon: {
      fontSize: '64px',
      marginBottom: designTokens.spacing[3],
      opacity: 0.5
    },

    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={getResponsiveStyle(
      dashboardStyles.container,
      null,
      dashboardStyles.containerDesktop,
      screenSize
    )}>
      {/* Role Selector */}
      <div style={getResponsiveStyle(
        dashboardStyles.roleSelector,
        null,
        dashboardStyles.roleSelectorDesktop,
        screenSize
      )}>
        <button
          style={{
            ...dashboardStyles.roleButton,
            ...(activeRole === 'merchant' ? dashboardStyles.roleButtonActive : {})
          }}
          onClick={() => setActiveRole('merchant')}
        >
          🏪 Soy Comerciante
        </button>
        <button
          style={{
            ...dashboardStyles.roleButton,
            ...(activeRole === 'lender' ? dashboardStyles.roleButtonActive : {})
          }}
          onClick={() => setActiveRole('lender')}
        >
          💸 Soy Inversor
        </button>
      </div>

      {/* Dashboard Content */}
      <div style={dashboardStyles.content}>
        {activeRole === 'merchant' ? (
          <div style={getResponsiveStyle(
            dashboardStyles.merchantGrid,
            null,
            dashboardStyles.merchantGridDesktop,
            screenSize
          )}>
            <div style={getResponsiveStyle(
              dashboardStyles.card,
              null,
              dashboardStyles.cardDesktop,
              screenSize
            )}>
              <CreditScoreDisplay
                creditAnalysis={creditAnalysis}
                isLoading={merchantLoading}
              />
            </div>

            <div style={getResponsiveStyle(
              dashboardStyles.card,
              null,
              dashboardStyles.cardDesktop,
              screenSize
            )}>
              <SalesChart
                salesData={salesData}
                metrics={metrics}
              />
            </div>

            <div style={getResponsiveStyle(
              dashboardStyles.card,
              null,
              dashboardStyles.cardDesktop,
              screenSize
            )}>
              <LoanRequestForm
                creditAnalysis={creditAnalysis}
                validation={validation}
                onSubmit={handleSolicitar}
                isLoading={isConfirming}
                platform={platform}
              />
            </div>
          </div>
        ) : (
          <div style={dashboardStyles.lenderContent}>
            <div style={getResponsiveStyle(
              dashboardStyles.card,
              null,
              dashboardStyles.cardDesktop,
              screenSize
            )}>
              <h3 style={dashboardStyles.sectionTitle}>
                Oportunidades de Inversión
              </h3>
              <p style={dashboardStyles.sectionDescription}>
                Invierte en microcréditos para comerciantes verificados de LATAM.
              </p>

              {prestamosActivos && prestamosActivos.length > 0 ? (
                prestamosActivos.map((prestamo) => (
                  <div
                    key={Number(prestamo.id)}
                    style={dashboardStyles.loanCard}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, dashboardStyles.loanCardHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = designTokens.colors.neutral[200];
                    }}
                  >
                    <div style={dashboardStyles.loanHeader}>
                      <div style={dashboardStyles.loanId}>
                        Préstamo #{Number(prestamo.id)}
                      </div>
                      <div style={dashboardStyles.loanAmount}>
                        {formatEther(prestamo.monto)} MATIC
                      </div>
                    </div>

                    <div style={dashboardStyles.loanDetails}>
                      <div style={dashboardStyles.loanDetail}>
                        <span>Comerciante:</span>
                        <span>{prestamo.prestatario.slice(0, 6)}...{prestamo.prestatario.slice(-4)}</span>
                      </div>
                      <div style={dashboardStyles.loanDetail}>
                        <span>Estado:</span>
                        <span style={{ color: designTokens.colors.accent[600] }}>Disponible</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFinanciar(prestamo.id, prestamo.monto)}
                      style={{
                        ...dashboardStyles.button,
                        ...(isConfirming ? dashboardStyles.buttonDisabled : {})
                      }}
                      disabled={isConfirming}
                      onMouseEnter={(e) => {
                        if (!isConfirming) {
                          Object.assign(e.target.style, dashboardStyles.buttonHover);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isConfirming) {
                          e.target.style.backgroundColor = designTokens.colors.accent[500];
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {isConfirming ? (
                        <>
                          <div style={dashboardStyles.spinner}></div>
                          Procesando...
                        </>
                      ) : (
                        'Financiar Préstamo'
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div style={dashboardStyles.emptyState}>
                  <div style={dashboardStyles.emptyIcon}>📋</div>
                  <p>No hay préstamos disponibles</p>
                  <p style={{ fontSize: designTokens.typography.fontSize.sm, opacity: 0.7 }}>
                    Los préstamos aparecerán aquí cuando los comerciantes los soliciten.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { isConnected } = useAccount();
  const merchantData = useMerchantData();
  const [lastTransactionType, setLastTransactionType] = useState(null);
  const [demoMode] = useState(true); // Demo mode enabled
  const [demoLoans, setDemoLoans] = useState([
    {
      id: 1n,
      monto: parseEther('2.5'),
      prestatario: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87',
      prestamista: '0x0000000000000000000000000000000000000000',
      financiado: false,
      activo: true
    },
    {
      id: 2n,
      monto: parseEther('1.8'),
      prestatario: '0x8ba1f109551bD432803012645Hac136c82C5e2c',
      prestamista: '0x0000000000000000000000000000000000000000',
      financiado: false,
      activo: true
    }
  ]);

  // Initialize global styles
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  // Smart contract hooks (demo mode uses mock data)
  const { data: hash, writeContract, error: writeError } = useWriteContract();
  const { data: realPrestamosActivos, refetch, error: readError } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'obtenerPrestamosActivos',
  });
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: transactionError } = useWaitForTransactionReceipt({ hash });
  
  // Use demo data or real data based on mode
  const prestamosActivos = demoMode ? demoLoans : realPrestamosActivos;

  // Test contract connectivity (only in non-demo mode)
  useEffect(() => {
    if (!demoMode && readError) {
      console.error('Error leyendo contrato:', readError);
      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>
            ⚠️ Problema de Conectividad
          </div>
          <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
            No se puede conectar al contrato. Verifica tu red y conexión.
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg
          }
        }
      );
    }
  }, [readError, demoMode]);

  // Enhanced transaction success handling (only in non-demo mode)
  useEffect(() => {
    if (!demoMode && isConfirmed && hash) {
      const explorerUrl = `https://amoy.polygonscan.com/tx/${hash}`;

      // Dismiss loading toasts
      toast.dismiss('loan-transaction');
      toast.dismiss('funding-transaction');

      if (lastTransactionType === 'loan') {
        toast.success(
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', color: designTokens.colors.accent[600] }}>
              🎉 ¡Préstamo Solicitado Exitosamente!
            </div>
            <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
              Tu solicitud de préstamo ha sido registrada en la blockchain
            </div>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: designTokens.colors.primary[600],
                textDecoration: 'underline',
                fontSize: '12px'
              }}
            >
              Ver transacción en el explorador →
            </a>
          </div>,
          {
            duration: 6000,
            style: {
              background: designTokens.colors.white,
              color: designTokens.colors.neutral[900],
              border: `1px solid ${designTokens.colors.accent[200]}`,
              borderRadius: designTokens.borderRadius.md,
              boxShadow: designTokens.shadows.lg
            }
          }
        );
      } else if (lastTransactionType === 'funding') {
        toast.success(
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', color: designTokens.colors.primary[600] }}>
              💸 ¡Préstamo Financiado Exitosamente!
            </div>
            <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
              Has financiado el préstamo. Los fondos han sido transferidos al comerciante.
            </div>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: designTokens.colors.primary[600],
                textDecoration: 'underline',
                fontSize: '12px'
              }}
            >
              Ver transacción en el explorador →
            </a>
          </div>,
          {
            duration: 6000,
            style: {
              background: designTokens.colors.white,
              color: designTokens.colors.neutral[900],
              border: `1px solid ${designTokens.colors.primary[200]}`,
              borderRadius: designTokens.borderRadius.md,
              boxShadow: designTokens.shadows.lg
            }
          }
        );
      }

      // Refresh data after successful transaction
      refetch();
      setLastTransactionType(null);
    }
  }, [isConfirmed, hash, lastTransactionType, refetch, demoMode]);

  // Handle writeContract errors
  useEffect(() => {
    if (writeError) {
      console.error('WriteContract Error:', writeError);
      // Dismiss loading toasts
      toast.dismiss('loan-transaction');
      toast.dismiss('funding-transaction');

      let errorMessage = 'Error desconocido al enviar la transacción';

      // Parse common error messages
      if (writeError.message) {
        if (writeError.message.includes('User rejected')) {
          errorMessage = 'Transacción cancelada por el usuario';
        } else if (writeError.message.includes('insufficient funds')) {
          errorMessage = 'Fondos insuficientes para completar la transacción';
        } else if (writeError.message.includes('gas')) {
          errorMessage = 'Error de gas. Verifica que tengas suficiente MATIC para el gas';
        } else if (writeError.message.includes('network')) {
          errorMessage = 'Error de red. Verifica tu conexión y que estés en Polygon Amoy';
        } else {
          errorMessage = writeError.message;
        }
      }

      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>
            ❌ Error al Enviar Transacción
          </div>
          <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
            {errorMessage}
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg
          }
        }
      );
      setLastTransactionType(null);
    }
  }, [writeError]);

  // Handle transaction receipt errors
  useEffect(() => {
    if (transactionError) {
      console.error('Transaction Receipt Error:', transactionError);
      // Dismiss loading toasts
      toast.dismiss('loan-transaction');
      toast.dismiss('funding-transaction');

      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>
            ❌ Error en la Transacción
          </div>
          <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
            {transactionError.message || 'La transacción falló en la blockchain'}
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg
          }
        }
      );
      setLastTransactionType(null);
    }
  }, [transactionError]);

  const handleSolicitar = async (loanData) => {
    const { amount } = loanData;

    if (!amount || amount <= 0) {
      toast.error("Por favor, ingresa un monto válido.", {
        style: {
          background: designTokens.colors.white,
          color: designTokens.colors.neutral[900],
          border: '1px solid #fecaca',
          borderRadius: designTokens.borderRadius.md
        }
      });
      return;
    }

    // Validate minimum amount
    if (amount < 0.001) {
      toast.error("El monto mínimo es 0.001 MATIC", {
        style: {
          background: designTokens.colors.white,
          color: designTokens.colors.neutral[900],
          border: '1px solid #fecaca',
          borderRadius: designTokens.borderRadius.md
        }
      });
      return;
    }

    if (merchantData.creditAnalysis) {
      const limiteMaximo = merchantData.creditAnalysis.limiteMaximo;

      if (amount > limiteMaximo) {
        toast.error(`El monto excede tu límite máximo de ${limiteMaximo} USD.`, {
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md
          }
        });
        return;
      }
    }

    if (merchantData.validation && !merchantData.validation.valido) {
      toast.error(`No puedes solicitar préstamos: ${merchantData.validation.razon}`, {
        style: {
          background: designTokens.colors.white,
          color: designTokens.colors.neutral[900],
          border: '1px solid #fecaca',
          borderRadius: designTokens.borderRadius.md
        }
      });
      return;
    }

    if (demoMode) {
      // Demo mode - simulate successful transaction
      toast.loading(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>🏪</div>
          <div>Procesando solicitud de préstamo...</div>
        </div>,
        {
          id: 'loan-transaction',
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: `1px solid ${designTokens.colors.neutral[200]}`,
            borderRadius: designTokens.borderRadius.md
          }
        }
      );

      // Simulate processing time
      setTimeout(() => {
        toast.dismiss('loan-transaction');
        
        // Generate fake transaction hash
        const fakeHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        const explorerUrl = `https://amoy.polygonscan.com/tx/${fakeHash}`;
        
        // Add new loan to demo data
        const newLoan = {
          id: BigInt(demoLoans.length + 1),
          monto: parseEther(amount.toString()),
          prestatario: '0x7E2221a24920e1cC8dE400b1F1711f09C434F720', // Your address
          prestamista: '0x0000000000000000000000000000000000000000',
          financiado: false,
          activo: true
        };
        
        setDemoLoans(prev => [...prev, newLoan]);
        
        toast.success(
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', color: designTokens.colors.accent[600] }}>
              🎉 ¡Préstamo Solicitado Exitosamente!
            </div>
            <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
              Tu solicitud de préstamo por {amount} MATIC ha sido registrada en la blockchain
            </div>
            <a 
              href={explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: designTokens.colors.primary[600], 
                textDecoration: 'underline',
                fontSize: '12px'
              }}
            >
              Ver transacción en el explorador →
            </a>
          </div>,
          {
            duration: 6000,
            style: {
              background: designTokens.colors.white,
              color: designTokens.colors.neutral[900],
              border: `1px solid ${designTokens.colors.accent[200]}`,
              borderRadius: designTokens.borderRadius.md,
              boxShadow: designTokens.shadows.lg
            }
          }
        );
      }, 2000); // 2 second delay to simulate processing
      
      return;
    }

    // Real blockchain transaction (original code)
    try {
      toast.loading(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>🏪</div>
          <div>Procesando solicitud de préstamo...</div>
        </div>,
        {
          id: 'loan-transaction',
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: `1px solid ${designTokens.colors.neutral[200]}`,
            borderRadius: designTokens.borderRadius.md
          }
        }
      );

      setLastTransactionType('loan');
      const amountInWei = parseEther(amount.toString());
      
      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'solicitarPrestamo',
        args: [amountInWei],
        gas: 500000n,
      });

    } catch (error) {
      console.error('Error en handleSolicitar:', error);
      toast.dismiss('loan-transaction');
      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>
            ❌ Error al Procesar Solicitud
          </div>
          <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
            {error.message || 'Error desconocido al procesar la solicitud'}
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg
          }
        }
      );
      setLastTransactionType(null);
    }
  };

  const handleFinanciar = async (id, monto) => {
    if (demoMode) {
      // Demo mode - simulate successful funding
      toast.loading(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>💸</div>
          <div>Procesando financiamiento...</div>
        </div>,
        {
          id: 'funding-transaction',
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: `1px solid ${designTokens.colors.neutral[200]}`,
            borderRadius: designTokens.borderRadius.md
          }
        }
      );

      // Simulate processing time
      setTimeout(() => {
        toast.dismiss('funding-transaction');
        
        // Generate fake transaction hash
        const fakeHash = `0x${Math.random().toString(16).substr(2, 64)}`;
        const explorerUrl = `https://amoy.polygonscan.com/tx/${fakeHash}`;
        
        // Update loan status in demo data
        setDemoLoans(prev => prev.map(loan => 
          loan.id === id 
            ? { ...loan, financiado: true, prestamista: '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87' }
            : loan
        ));
        
        const montoInMatic = formatEther(monto);
        
        toast.success(
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 'bold', color: designTokens.colors.primary[600] }}>
              💸 ¡Préstamo Financiado Exitosamente!
            </div>
            <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
              Has financiado el préstamo #{Number(id)} por {montoInMatic} MATIC. Los fondos han sido transferidos al comerciante.
            </div>
            <a 
              href={explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: designTokens.colors.primary[600], 
                textDecoration: 'underline',
                fontSize: '12px'
              }}
            >
              Ver transacción en el explorador →
            </a>
          </div>,
          {
            duration: 6000,
            style: {
              background: designTokens.colors.white,
              color: designTokens.colors.neutral[900],
              border: `1px solid ${designTokens.colors.primary[200]}`,
              borderRadius: designTokens.borderRadius.md,
              boxShadow: designTokens.shadows.lg
            }
          }
        );
      }, 2500); // 2.5 second delay to simulate processing
      
      return;
    }

    // Real blockchain transaction (original code)
    try {
      toast.loading(
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>💸</div>
          <div>Procesando financiamiento...</div>
        </div>,
        {
          id: 'funding-transaction',
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: `1px solid ${designTokens.colors.neutral[200]}`,
            borderRadius: designTokens.borderRadius.md
          }
        }
      );

      setLastTransactionType('funding');

      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'financiarPrestamo',
        args: [id],
        value: monto,
      });

    } catch (error) {
      console.error('Error en handleFinanciar:', error);
      toast.dismiss('funding-transaction');
      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 'bold', color: '#dc2626' }}>
            ❌ Error al Procesar Financiamiento
          </div>
          <div style={{ fontSize: '14px', color: designTokens.colors.neutral[600] }}>
            {error.message || 'Error desconocido al procesar el financiamiento'}
          </div>
        </div>,
        {
          duration: 5000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            border: '1px solid #fecaca',
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg
          }
        }
      );
      setLastTransactionType(null);
    }
  };

  const appStyles = {
    container: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  };

  return (
    <div style={appStyles.container}>
      <Header />

      {!isConnected ? (
        <LandingPage />
      ) : (
        <Dashboard
          handlers={{ handleSolicitar, handleFinanciar }}
          data={{ prestamosActivos }}
          state={{ isConfirming }}
          merchantData={merchantData}
        />
      )}

      <Footer />

      {/* Demo mode indicator */}
      {demoMode && <DemoIndicator />}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: designTokens.colors.white,
            color: designTokens.colors.neutral[900],
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.lg,
            border: `1px solid ${designTokens.colors.neutral[200]}`,
            fontSize: designTokens.typography.fontSize.sm,
            fontFamily: designTokens.typography.fontFamily.primary.join(', ')
          },
          success: {
            duration: 6000,
            iconTheme: {
              primary: designTokens.colors.accent[500],
              secondary: designTokens.colors.white,
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#dc2626',
              secondary: designTokens.colors.white,
            },
          },
          loading: {
            iconTheme: {
              primary: designTokens.colors.primary[500],
              secondary: designTokens.colors.white,
            },
          },
        }}
      />
    </div>
  );
}

export default App;