import { useState } from 'react';
import { useReadContract, useSimulateContract } from 'wagmi';
import { parseEther } from 'viem';
import { designTokens } from '../styles/designTokens.js';

const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';
const contractABI = [
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

function ContractTester() {
  const [testAmount, setTestAmount] = useState('1');
  const [testResults, setTestResults] = useState({});

  // Test read function
  const { data: prestamos, error: readError, isLoading: readLoading } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'obtenerPrestamosActivos',
  });

  // Test simulate contract call
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'solicitarPrestamo',
    args: [parseEther(testAmount)],
  });

  const testerStyles = {
    container: {
      position: 'fixed',
      top: '100px',
      left: '20px',
      background: designTokens.colors.white,
      border: `2px solid ${designTokens.colors.primary[300]}`,
      borderRadius: designTokens.borderRadius.md,
      padding: designTokens.spacing[4],
      boxShadow: designTokens.shadows.lg,
      fontSize: '12px',
      maxWidth: '400px',
      zIndex: 1000,
      maxHeight: '400px',
      overflowY: 'auto'
    },
    title: {
      fontWeight: designTokens.typography.fontWeight.bold,
      marginBottom: designTokens.spacing[3],
      color: designTokens.colors.primary[700],
      fontSize: '14px'
    },
    section: {
      marginBottom: designTokens.spacing[3],
      padding: designTokens.spacing[2],
      background: designTokens.colors.neutral[50],
      borderRadius: designTokens.borderRadius.sm
    },
    sectionTitle: {
      fontWeight: designTokens.typography.fontWeight.semibold,
      marginBottom: designTokens.spacing[1],
      color: designTokens.colors.neutral[800]
    },
    input: {
      width: '100%',
      padding: designTokens.spacing[1],
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      borderRadius: designTokens.borderRadius.sm,
      marginBottom: designTokens.spacing[2]
    },
    button: {
      padding: `${designTokens.spacing[1]} ${designTokens.spacing[2]}`,
      background: designTokens.colors.primary[500],
      color: designTokens.colors.white,
      border: 'none',
      borderRadius: designTokens.borderRadius.sm,
      cursor: 'pointer',
      fontSize: '11px'
    },
    success: {
      color: designTokens.colors.accent[600],
      background: designTokens.colors.accent[50],
      padding: designTokens.spacing[1],
      borderRadius: designTokens.borderRadius.sm,
      marginTop: designTokens.spacing[1]
    },
    error: {
      color: '#dc2626',
      background: '#fef2f2',
      padding: designTokens.spacing[1],
      borderRadius: designTokens.borderRadius.sm,
      marginTop: designTokens.spacing[1]
    },
    code: {
      fontFamily: 'monospace',
      fontSize: '10px',
      background: designTokens.colors.neutral[100],
      padding: designTokens.spacing[1],
      borderRadius: designTokens.borderRadius.sm,
      marginTop: designTokens.spacing[1],
      wordBreak: 'break-all'
    }
  };

  return (
    <div style={testerStyles.container}>
      <div style={testerStyles.title}>🧪 Probador de Contrato</div>
      
      {/* Contract Address */}
      <div style={testerStyles.section}>
        <div style={testerStyles.sectionTitle}>Dirección del Contrato:</div>
        <div style={testerStyles.code}>{contractAddress}</div>
      </div>

      {/* Read Test */}
      <div style={testerStyles.section}>
        <div style={testerStyles.sectionTitle}>Prueba de Lectura (obtenerPrestamosActivos):</div>
        {readLoading && <div>⏳ Cargando...</div>}
        {readError && (
          <div style={testerStyles.error}>
            ❌ Error: {readError.message}
          </div>
        )}
        {prestamos && (
          <div style={testerStyles.success}>
            ✅ Éxito: {prestamos.length} préstamos encontrados
          </div>
        )}
      </div>

      {/* Simulate Test */}
      <div style={testerStyles.section}>
        <div style={testerStyles.sectionTitle}>Simulación de Transacción:</div>
        <input
          type="number"
          value={testAmount}
          onChange={(e) => setTestAmount(e.target.value)}
          placeholder="Monto en MATIC"
          style={testerStyles.input}
        />
        
        {simulateError && (
          <div style={testerStyles.error}>
            ❌ Simulación falló: {simulateError.message}
          </div>
        )}
        {simulateData && (
          <div style={testerStyles.success}>
            ✅ Simulación exitosa
          </div>
        )}
      </div>

      {/* Network Info */}
      <div style={testerStyles.section}>
        <div style={testerStyles.sectionTitle}>Información de Red:</div>
        <div style={testerStyles.code}>
          Red esperada: Polygon Amoy (80002)
        </div>
      </div>
    </div>
  );
}

export default ContractTester;