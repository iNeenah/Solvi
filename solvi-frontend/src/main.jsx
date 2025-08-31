
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- Importamos las herramientas que instalamos ---
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains'; // <-- ¡Importante! Usaremos la red de prueba de Polygon
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// --- Aquí configuramos las redes y wallets que aceptará nuestra app ---
const config = getDefaultConfig({
  appName: 'Solvi Demo', // El nombre de tu app
  projectId: '518a99de4eb28c1545f50a5b84de4307', 
  chains: [polygonAmoy], 
});

const queryClient = new QueryClient();

// --- Aquí "envolvemos" nuestra App con los proveedores ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App /> 
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);