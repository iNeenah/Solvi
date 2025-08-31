// Contract configuration
export const CONTRACTS = {
  // Original contract (currently having issues)
  SOLVI_ORIGINAL: {
    address: '0xf8e81D47203A594245E36C48e151709F0C19fBe8',
    name: 'Solvi Original',
    network: 'Polygon Amoy',
    chainId: 80002
  },
  
  // Test contract (deploy the TestContract.sol here)
  SOLVI_TEST: {
    address: '0x0000000000000000000000000000000000000000', // Replace with new contract address
    name: 'Solvi Test',
    network: 'Polygon Amoy',
    chainId: 80002
  }
};

// Current active contract
export const ACTIVE_CONTRACT = CONTRACTS.SOLVI_ORIGINAL;

// Contract ABI
export const CONTRACT_ABI = [
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
  },
  // Additional functions for the test contract
  {
    "inputs": [],
    "name": "contadorPrestamos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerContadorPrestamos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];