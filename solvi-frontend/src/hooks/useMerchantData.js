// Hook personalizado para manejar datos del comerciante en Solvi
import { useState, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { generarPerfilComerciante } from '../services/salesDataService.js';
import { calcularPuntajeConfianza, calcularLimiteMaximoPrestamo, generarRecomendaciones, categorizarRiesgo } from '../services/creditScoreService.js';

export function useMerchantData() {
  const { address, isConnected } = useAccount();
  const [merchantProfile, setMerchantProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generar o cargar perfil del comerciante cuando se conecta la wallet
  useEffect(() => {
    if (isConnected && address && !merchantProfile) {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simular delay de carga de datos reales
        setTimeout(() => {
          const profile = generarPerfilComerciante(address);
          setMerchantProfile(profile);
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        setError('Error al cargar datos de ventas');
        setIsLoading(false);
      }
    } else if (!isConnected) {
      setMerchantProfile(null);
      setError(null);
    }
  }, [address, isConnected, merchantProfile]);

  // Calcular puntaje de confianza y métricas derivadas
  const creditAnalysis = useMemo(() => {
    if (!merchantProfile?.datosVentas) {
      return null;
    }

    const puntajeConfianza = calcularPuntajeConfianza(merchantProfile.datosVentas);
    const limiteMaximo = calcularLimiteMaximoPrestamo(puntajeConfianza, merchantProfile.metricas);
    const recomendaciones = generarRecomendaciones(puntajeConfianza, merchantProfile.metricas);
    const categoriaRiesgo = categorizarRiesgo(puntajeConfianza.puntajeTotal);

    return {
      puntajeConfianza,
      limiteMaximo,
      recomendaciones,
      categoriaRiesgo
    };
  }, [merchantProfile]);

  // Función para simular reconexión de datos
  const refreshData = () => {
    if (address) {
      setIsLoading(true);
      setError(null);
      
      setTimeout(() => {
        const newProfile = generarPerfilComerciante(address);
        setMerchantProfile(newProfile);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Función para simular cambio de plataforma
  const changePlatform = (newPlatform) => {
    if (address) {
      setIsLoading(true);
      
      setTimeout(() => {
        const newProfile = generarPerfilComerciante(address, newPlatform);
        setMerchantProfile(newProfile);
        setIsLoading(false);
      }, 1000);
    }
  };

  return {
    // Datos principales
    merchantProfile,
    creditAnalysis,
    
    // Estados
    isLoading,
    error,
    isConnected,
    
    // Datos derivados para fácil acceso
    salesData: merchantProfile?.datosVentas || [],
    metrics: merchantProfile?.metricas || null,
    validation: merchantProfile?.validacion || null,
    platform: merchantProfile?.plataforma || null,
    
    // Funciones
    refreshData,
    changePlatform
  };
}