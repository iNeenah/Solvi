import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { designTokens } from '../styles/designTokens.js';

const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';

function ContractVerifier() {
  const [contractInfo, setContractInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicClient = usePublicClient();

  useEffect(() => {
    const verifyContract = async () => {
      try {
        setLoading(true);
        
        // Check if contract exists
        const bytecode = await publicClient.getBytecode({
          address: contractAddress,
        });
        
        // Get contract balance
        const balance = await publicClient.getBalance({
          address: contractAddress,
        });

        setContractInfo({
          exists: bytecode && bytecode !== '0x',
          bytecode: bytecode,
          balance: balance.toString(),
          address: contractAddress
        });
        
      } catch (error) {
        console.error('Error verificando contrato:', error);
        setContractInfo({
          exists: false,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (publicClient) {
      verifyContract();
    }
  }, [publicClient]);

  const verifierStyles = {
    container: {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: designTokens.colors.white,
      border: `2px solid ${designTokens.colors.red?.[300] || '#fca5a5'}`,
      borderRadius: designTokens.borderRadius.md,
      padding: designTokens.spacing[4],
      boxShadow: designTokens.shadows.lg,
      fontSize: '12px',
      maxWidth: '500px',
      zIndex: 1001
    },
    title: {
      fontWeight: designTokens.typography.fontWeight.bold,
      marginBottom: designTokens.spacing[3],
      color: '#dc2626',
      fontSize: '14px',
      textAlign: 'center'
    },
    section: {
      marginBottom: designTokens.spacing[2],
      padding: designTokens.spacing[2],
      background: designTokens.colors.neutral[50],
      borderRadius: designTokens.borderRadius.sm
    },
    label: {
      fontWeight: designTokens.typography.fontWeight.semibold,
      color: designTokens.colors.neutral[700]
    },
    value: {
      color: designTokens.colors.neutral[900],
      fontFamily: 'monospace',
      fontSize: '11px',
      wordBreak: 'break-all'
    },
    status: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: designTokens.typography.fontWeight.medium,
      textAlign: 'center',
      marginTop: designTokens.spacing[2]
    },
    success: {
      background: designTokens.colors.accent[100],
      color: designTokens.colors.accent[700]
    },
    error: {
      background: '#fecaca',
      color: '#dc2626'
    },
    warning: {
      background: '#fef3c7',
      color: '#92400e'
    },
    link: {
      color: designTokens.colors.primary[600],
      textDecoration: 'underline',
      fontSize: '11px',
      display: 'block',
      textAlign: 'center',
      marginTop: designTokens.spacing[2]
    }
  };

  if (loading) {
    return (
      <div style={verifierStyles.container}>
        <div style={verifierStyles.title}>🔍 Verificando Contrato...</div>
        <div style={{ textAlign: 'center' }}>⏳ Cargando...</div>
      </div>
    );
  }

  return (
    <div style={verifierStyles.container}>
      <div style={verifierStyles.title}>🔍 Verificación del Contrato</div>
      
      <div style={verifierStyles.section}>
        <div style={verifierStyles.label}>Dirección:</div>
        <div style={verifierStyles.value}>{contractAddress}</div>
      </div>

      {contractInfo && (
        <>
          <div style={verifierStyles.section}>
            <div style={verifierStyles.label}>Estado del Contrato:</div>
            <div style={{
              ...verifierStyles.status,
              ...(contractInfo.exists ? verifierStyles.success : verifierStyles.error)
            }}>
              {contractInfo.exists ? '✅ Contrato Existe' : '❌ Contrato No Encontrado'}
            </div>
          </div>

          {contractInfo.exists && (
            <>
              <div style={verifierStyles.section}>
                <div style={verifierStyles.label}>Balance del Contrato:</div>
                <div style={verifierStyles.value}>
                  {(parseInt(contractInfo.balance) / 1e18).toFixed(6)} MATIC
                </div>
              </div>

              <div style={verifierStyles.section}>
                <div style={verifierStyles.label}>Bytecode (primeros 50 chars):</div>
                <div style={verifierStyles.value}>
                  {contractInfo.bytecode?.slice(0, 50)}...
                </div>
              </div>
            </>
          )}

          {!contractInfo.exists && (
            <div style={{
              ...verifierStyles.status,
              ...verifierStyles.error
            }}>
              ⚠️ El contrato no existe en esta red o la dirección es incorrecta
            </div>
          )}

          {contractInfo.error && (
            <div style={verifierStyles.section}>
              <div style={verifierStyles.label}>Error:</div>
              <div style={verifierStyles.value}>{contractInfo.error}</div>
            </div>
          )}
        </>
      )}

      <a
        href={`https://amoy.polygonscan.com/address/${contractAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        style={verifierStyles.link}
      >
        Ver en Polygon Amoy Explorer →
      </a>
    </div>
  );
}

export default ContractVerifier;