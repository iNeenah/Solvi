import { useAccount, useBalance, useChainId } from 'wagmi';
import { designTokens } from '../styles/designTokens.js';

function NetworkDiagnostic() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  const diagnosticStyles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: designTokens.colors.white,
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      borderRadius: designTokens.borderRadius.md,
      padding: designTokens.spacing[3],
      boxShadow: designTokens.shadows.lg,
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 1000
    },
    title: {
      fontWeight: designTokens.typography.fontWeight.bold,
      marginBottom: designTokens.spacing[2],
      color: designTokens.colors.neutral[900]
    },
    item: {
      marginBottom: designTokens.spacing[1],
      display: 'flex',
      justifyContent: 'space-between'
    },
    label: {
      color: designTokens.colors.neutral[600]
    },
    value: {
      color: designTokens.colors.neutral[900],
      fontWeight: designTokens.typography.fontWeight.medium
    },
    status: {
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: designTokens.typography.fontWeight.medium
    },
    success: {
      background: designTokens.colors.accent[100],
      color: designTokens.colors.accent[700]
    },
    error: {
      background: '#fecaca',
      color: '#dc2626'
    }
  };

  const expectedChainId = 80002; // Polygon Amoy
  const isCorrectNetwork = chainId === expectedChainId;
  const hasBalance = balance && parseFloat(balance.formatted) > 0;

  return (
    <div style={diagnosticStyles.container}>
      <div style={diagnosticStyles.title}>🔍 Diagnóstico de Red</div>
      
      <div style={diagnosticStyles.item}>
        <span style={diagnosticStyles.label}>Conectado:</span>
        <span style={{
          ...diagnosticStyles.status,
          ...(isConnected ? diagnosticStyles.success : diagnosticStyles.error)
        }}>
          {isConnected ? '✅ Sí' : '❌ No'}
        </span>
      </div>

      {isConnected && (
        <>
          <div style={diagnosticStyles.item}>
            <span style={diagnosticStyles.label}>Dirección:</span>
            <span style={diagnosticStyles.value}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
            </span>
          </div>

          <div style={diagnosticStyles.item}>
            <span style={diagnosticStyles.label}>Red:</span>
            <span style={{
              ...diagnosticStyles.status,
              ...(isCorrectNetwork ? diagnosticStyles.success : diagnosticStyles.error)
            }}>
              {chainId === 80002 ? '✅ Amoy' : `❌ ${chainId}`}
            </span>
          </div>

          <div style={diagnosticStyles.item}>
            <span style={diagnosticStyles.label}>Balance:</span>
            <span style={{
              ...diagnosticStyles.status,
              ...(hasBalance ? diagnosticStyles.success : diagnosticStyles.error)
            }}>
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} MATIC` : '0 MATIC'}
            </span>
          </div>

          {!isCorrectNetwork && (
            <div style={{
              marginTop: designTokens.spacing[2],
              padding: designTokens.spacing[2],
              background: '#fef3c7',
              borderRadius: designTokens.borderRadius.sm,
              fontSize: '11px',
              color: '#92400e'
            }}>
              ⚠️ Cambia a Polygon Amoy Testnet
            </div>
          )}

          {!hasBalance && isCorrectNetwork && (
            <div style={{
              marginTop: designTokens.spacing[2],
              padding: designTokens.spacing[2],
              background: '#fef3c7',
              borderRadius: designTokens.borderRadius.sm,
              fontSize: '11px',
              color: '#92400e'
            }}>
              ⚠️ Necesitas MATIC de prueba
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NetworkDiagnostic;