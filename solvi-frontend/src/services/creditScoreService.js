// Servicio de cálculo de puntaje de confianza para Solvi
// Evalúa la elegibilidad crediticia basada en datos de ventas

import { calcularMetricasVentas } from './salesDataService.js';

// Calcula el puntaje de confianza (0-100) basado en múltiples factores
export function calcularPuntajeConfianza(datosVentas) {
  const metricas = calcularMetricasVentas(datosVentas);
  
  if (!metricas) {
    return 0;
  }
  
  const factores = {
    consistencia: calcularConsistenciaVentas(metricas), // 40%
    volumen: calcularVolumenPromedio(metricas), // 30%
    crecimiento: calcularTendenciaCrecimiento(metricas), // 20%
    antiguedad: calcularAntiguedadCuenta(metricas) // 10%
  };
  
  const puntajeFinal = Math.min(100, Math.max(0,
    factores.consistencia * 0.4 +
    factores.volumen * 0.3 +
    factores.crecimiento * 0.2 +
    factores.antiguedad * 0.1
  ));
  
  return {
    puntajeTotal: Math.round(puntajeFinal),
    factores: {
      consistencia: Math.round(factores.consistencia),
      volumen: Math.round(factores.volumen),
      crecimiento: Math.round(factores.crecimiento),
      antiguedad: Math.round(factores.antiguedad)
    },
    detalles: {
      ventasPromedioDiarias: metricas.ventasPromedioDiarias,
      consistenciaFlujo: Math.round(metricas.consistenciaFlujo * 100),
      tendenciaCrecimiento: Math.round(metricas.tendenciaCrecimiento * 100),
      antiguedadMeses: metricas.antiguedadMeses
    }
  };
}

// Factor de consistencia (0-100): qué tan regulares son las ventas
function calcularConsistenciaVentas(metricas) {
  const consistenciaBase = metricas.consistenciaFlujo * 100; // 0-100
  
  // Penalizar si hay muy pocos días con ventas
  const ratioActividad = metricas.diasConVentas / (metricas.antiguedadMeses * 30);
  const penalizacionActividad = ratioActividad < 0.5 ? (0.5 - ratioActividad) * 100 : 0;
  
  return Math.max(0, consistenciaBase - penalizacionActividad);
}

// Factor de volumen (0-100): evalúa el volumen de ventas promedio
function calcularVolumenPromedio(metricas) {
  const ventasDiarias = metricas.ventasPromedioDiarias;
  
  // Rangos de evaluación (en pesos/USD aproximados)
  if (ventasDiarias >= 5000) return 100;      // Excelente
  if (ventasDiarias >= 3000) return 85;       // Muy bueno
  if (ventasDiarias >= 2000) return 70;       // Bueno
  if (ventasDiarias >= 1000) return 55;       // Regular
  if (ventasDiarias >= 500) return 40;        // Bajo pero aceptable
  
  return Math.max(0, (ventasDiarias / 500) * 40); // Escala lineal para montos menores
}

// Factor de crecimiento (0-100): tendencia de crecimiento del negocio
function calcularTendenciaCrecimiento(metricas) {
  const tendencia = metricas.tendenciaCrecimiento;
  
  // Convertir tendencia a puntaje
  if (tendencia >= 0.2) return 100;          // Crecimiento >20%
  if (tendencia >= 0.1) return 85;           // Crecimiento 10-20%
  if (tendencia >= 0.05) return 70;          // Crecimiento 5-10%
  if (tendencia >= 0) return 55;             // Estable
  if (tendencia >= -0.05) return 40;         // Leve declive
  if (tendencia >= -0.1) return 25;          // Declive moderado
  
  return Math.max(0, 25 + (tendencia + 0.1) * 250); // Escala para declives mayores
}

// Factor de antigüedad (0-100): tiempo en el negocio
function calcularAntiguedadCuenta(metricas) {
  const meses = metricas.antiguedadMeses;
  
  if (meses >= 24) return 100;               // 2+ años
  if (meses >= 12) return 85;                // 1-2 años
  if (meses >= 6) return 70;                 // 6-12 meses
  if (meses >= 3) return 50;                 // 3-6 meses (mínimo)
  
  return Math.max(0, (meses / 3) * 50);      // Menos de 3 meses
}

// Calcula el límite máximo de préstamo basado en el puntaje y ventas
export function calcularLimiteMaximoPrestamo(puntajeConfianza, metricas) {
  if (!puntajeConfianza || !metricas) {
    return 0;
  }
  
  const puntaje = typeof puntajeConfianza === 'object' ? puntajeConfianza.puntajeTotal : puntajeConfianza;
  
  // Base: porcentaje de ventas mensuales promedio
  const ventasMensuales = metricas.ventasPromedioDiarias * 30;
  let factorPrestamo = 0;
  
  // Factor basado en puntaje de confianza
  if (puntaje >= 90) factorPrestamo = 0.4;      // Hasta 40% de ventas mensuales
  else if (puntaje >= 80) factorPrestamo = 0.3; // Hasta 30%
  else if (puntaje >= 70) factorPrestamo = 0.25; // Hasta 25%
  else if (puntaje >= 60) factorPrestamo = 0.2;  // Hasta 20%
  else if (puntaje >= 50) factorPrestamo = 0.15; // Hasta 15%
  else factorPrestamo = 0.1;                     // Hasta 10%
  
  const limiteCalculado = ventasMensuales * factorPrestamo;
  
  // Límites absolutos de seguridad
  const limiteMinimo = 100;   // USD mínimo
  const limiteMaximo = 5000;  // USD máximo para microcréditos
  
  return Math.round(Math.min(limiteMaximo, Math.max(limiteMinimo, limiteCalculado)));
}

// Genera recomendaciones para mejorar el puntaje
export function generarRecomendaciones(puntajeConfianza, metricas) {
  const recomendaciones = [];
  const factores = puntajeConfianza.factores;
  
  if (factores.consistencia < 70) {
    recomendaciones.push({
      tipo: 'consistencia',
      titulo: 'Mejorar consistencia de ventas',
      descripcion: 'Trata de mantener ventas más regulares día a día. Evita períodos largos sin actividad.',
      impacto: 'alto'
    });
  }
  
  if (factores.volumen < 60) {
    recomendaciones.push({
      tipo: 'volumen',
      titulo: 'Aumentar volumen de ventas',
      descripcion: 'Incrementa tus ventas diarias promedio para mejorar tu capacidad de préstamo.',
      impacto: 'alto'
    });
  }
  
  if (factores.crecimiento < 50) {
    recomendaciones.push({
      tipo: 'crecimiento',
      titulo: 'Impulsar crecimiento del negocio',
      descripcion: 'Busca estrategias para hacer crecer tu negocio mes a mes.',
      impacto: 'medio'
    });
  }
  
  if (factores.antiguedad < 70) {
    recomendaciones.push({
      tipo: 'antiguedad',
      titulo: 'Mantener historial activo',
      descripcion: 'Continúa operando para construir un historial más sólido.',
      impacto: 'bajo'
    });
  }
  
  if (metricas.totalTransacciones / metricas.antiguedadMeses < 100) {
    recomendaciones.push({
      tipo: 'actividad',
      titulo: 'Aumentar frecuencia de transacciones',
      descripcion: 'Más transacciones regulares demuestran un negocio más activo.',
      impacto: 'medio'
    });
  }
  
  return recomendaciones;
}

// Simula diferentes escenarios de mejora
export function simularMejorasPuntaje(datosVentas, mejoras) {
  // Clonar datos originales
  const datosModificados = [...datosVentas];
  
  // Aplicar mejoras simuladas
  if (mejoras.aumentoVentas) {
    datosModificados.forEach(dia => {
      dia.monto *= (1 + mejoras.aumentoVentas);
    });
  }
  
  if (mejoras.mayorConsistencia) {
    // Reducir variabilidad en las ventas
    const promedio = datosModificados.reduce((sum, dia) => sum + dia.monto, 0) / datosModificados.length;
    datosModificados.forEach(dia => {
      const diferencia = dia.monto - promedio;
      dia.monto = promedio + (diferencia * (1 - mejoras.mayorConsistencia));
    });
  }
  
  return calcularPuntajeConfianza(datosModificados);
}

// Categoriza el riesgo crediticio
export function categorizarRiesgo(puntajeTotal) {
  if (puntajeTotal >= 85) return { categoria: 'Muy Bajo', color: '#22c55e', descripcion: 'Excelente historial crediticio' };
  if (puntajeTotal >= 70) return { categoria: 'Bajo', color: '#84cc16', descripcion: 'Buen historial crediticio' };
  if (puntajeTotal >= 55) return { categoria: 'Medio', color: '#eab308', descripcion: 'Historial crediticio aceptable' };
  if (puntajeTotal >= 40) return { categoria: 'Alto', color: '#f97316', descripcion: 'Historial crediticio con riesgos' };
  return { categoria: 'Muy Alto', color: '#ef4444', descripcion: 'Historial crediticio riesgoso' };
}