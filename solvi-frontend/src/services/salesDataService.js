// Servicio de simulación de datos de ventas para Solvi
// Genera datos históricos realistas para diferentes plataformas de pago LATAM

const PLATAFORMAS = ['mercadopago', 'uala', 'getnet', 'modo'];

// Genera datos de ventas simulados para los últimos N meses
export function generarDatosVentas(meses = 6, plataforma = 'mercadopago') {
  const datos = [];
  const fechaActual = new Date();
  
  // Configuración base por plataforma
  const configPlataforma = {
    mercadopago: { ventaPromedio: 2500, variabilidad: 0.3, tendenciaCrecimiento: 0.02 },
    uala: { ventaPromedio: 1800, variabilidad: 0.4, tendenciaCrecimiento: 0.015 },
    getnet: { ventaPromedio: 3200, variabilidad: 0.25, tendenciaCrecimiento: 0.025 },
    modo: { ventaPromedio: 1200, variabilidad: 0.5, tendenciaCrecimiento: 0.01 }
  };
  
  const config = configPlataforma[plataforma] || configPlataforma.mercadopago;
  
  // Generar datos día por día hacia atrás
  for (let i = meses * 30; i >= 0; i--) {
    const fecha = new Date(fechaActual);
    fecha.setDate(fecha.getDate() - i);
    
    // Factores que afectan las ventas
    const factorDiaSemana = obtenerFactorDiaSemana(fecha.getDay());
    const factorEstacional = obtenerFactorEstacional(fecha.getMonth());
    const factorTendencia = 1 + (config.tendenciaCrecimiento * (meses * 30 - i) / 30);
    
    // Calcular ventas del día con variabilidad realista
    const ventaBase = config.ventaPromedio * factorDiaSemana * factorEstacional * factorTendencia;
    const variacion = (Math.random() - 0.5) * config.variabilidad;
    const ventasDia = Math.max(0, ventaBase * (1 + variacion));
    
    // Número de transacciones (entre 5-50 por día)
    const transacciones = Math.floor(Math.random() * 45) + 5;
    
    datos.push({
      fecha: fecha.toISOString().split('T')[0],
      monto: Math.round(ventasDia),
      transacciones: transacciones,
      plataforma: plataforma,
      montoPromedioPorTransaccion: Math.round(ventasDia / transacciones)
    });
  }
  
  return datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

// Factor multiplicador según día de la semana (0=domingo, 6=sábado)
function obtenerFactorDiaSemana(diaSemana) {
  const factores = {
    0: 0.6,  // Domingo - menos ventas
    1: 1.0,  // Lunes
    2: 1.1,  // Martes
    3: 1.2,  // Miércoles - pico medio
    4: 1.3,  // Jueves
    5: 1.4,  // Viernes - pico de ventas
    6: 1.1   // Sábado
  };
  return factores[diaSemana] || 1.0;
}

// Factor estacional por mes (0=enero, 11=diciembre)
function obtenerFactorEstacional(mes) {
  const factores = {
    0: 0.8,   // Enero - post fiestas
    1: 0.9,   // Febrero
    2: 1.0,   // Marzo
    3: 1.1,   // Abril
    4: 1.2,   // Mayo - Día de la Madre
    5: 1.0,   // Junio
    6: 0.9,   // Julio - invierno
    7: 0.9,   // Agosto
    8: 1.1,   // Septiembre - primavera
    9: 1.1,   // Octubre
    10: 1.3,  // Noviembre - Black Friday
    11: 1.5   // Diciembre - fiestas
  };
  return factores[mes] || 1.0;
}

// Calcula métricas agregadas de los datos de ventas
export function calcularMetricasVentas(datosVentas) {
  if (!datosVentas || datosVentas.length === 0) {
    return null;
  }
  
  const totalVentas = datosVentas.reduce((sum, dia) => sum + dia.monto, 0);
  const totalTransacciones = datosVentas.reduce((sum, dia) => sum + dia.transacciones, 0);
  const diasConVentas = datosVentas.filter(dia => dia.monto > 0).length;
  
  // Ventas por semana para calcular consistencia
  const ventasPorSemana = agruparPorSemana(datosVentas);
  const promedioSemanal = ventasPorSemana.reduce((sum, semana) => sum + semana, 0) / ventasPorSemana.length;
  const desviacionSemanal = Math.sqrt(
    ventasPorSemana.reduce((sum, semana) => sum + Math.pow(semana - promedioSemanal, 2), 0) / ventasPorSemana.length
  );
  
  return {
    totalVentas: Math.round(totalVentas),
    ventasPromedioDiarias: Math.round(totalVentas / datosVentas.length),
    totalTransacciones,
    diasConVentas,
    consistenciaFlujo: Math.max(0, 1 - (desviacionSemanal / promedioSemanal)), // 0-1
    ticketPromedio: Math.round(totalVentas / totalTransacciones),
    tendenciaCrecimiento: calcularTendenciaCrecimiento(datosVentas),
    antiguedadMeses: Math.floor(datosVentas.length / 30)
  };
}

// Agrupa ventas por semana
function agruparPorSemana(datosVentas) {
  const semanas = {};
  
  datosVentas.forEach(dia => {
    const fecha = new Date(dia.fecha);
    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - fecha.getDay());
    const claveSemanaa = inicioSemana.toISOString().split('T')[0];
    
    if (!semanas[claveSemanaa]) {
      semanas[claveSemanaa] = 0;
    }
    semanas[claveSemanaa] += dia.monto;
  });
  
  return Object.values(semanas);
}

// Calcula la tendencia de crecimiento (positiva o negativa)
function calcularTendenciaCrecimiento(datosVentas) {
  if (datosVentas.length < 60) return 0; // Necesitamos al menos 2 meses
  
  const mitad = Math.floor(datosVentas.length / 2);
  const primeraMitad = datosVentas.slice(0, mitad);
  const segundaMitad = datosVentas.slice(mitad);
  
  const promedioPrimera = primeraMitad.reduce((sum, dia) => sum + dia.monto, 0) / primeraMitad.length;
  const promedioSegunda = segundaMitad.reduce((sum, dia) => sum + dia.monto, 0) / segundaMitad.length;
  
  return (promedioSegunda - promedioPrimera) / promedioPrimera; // Porcentaje de crecimiento
}

// Valida si los datos cumplen requisitos mínimos
export function validarRequisitosMinimos(datosVentas) {
  const metricas = calcularMetricasVentas(datosVentas);
  
  if (!metricas) {
    return { valido: false, razon: 'No hay datos de ventas disponibles' };
  }
  
  // Requisitos mínimos
  if (metricas.antiguedadMeses < 3) {
    return { 
      valido: false, 
      razon: `Historial insuficiente: ${metricas.antiguedadMeses} meses (mínimo 3 meses requeridos)` 
    };
  }
  
  if (metricas.diasConVentas < (metricas.antiguedadMeses * 15)) {
    return { 
      valido: false, 
      razon: 'Actividad comercial insuficiente: muy pocos días con ventas' 
    };
  }
  
  if (metricas.ventasPromedioDiarias < 500) {
    return { 
      valido: false, 
      razon: 'Volumen de ventas muy bajo para calificar a microcréditos' 
    };
  }
  
  return { valido: true, razon: 'Cumple todos los requisitos mínimos' };
}

// Genera un perfil completo de comerciante con datos simulados
export function generarPerfilComerciante(walletAddress, plataforma = null) {
  const plataformaSeleccionada = plataforma || PLATAFORMAS[Math.floor(Math.random() * PLATAFORMAS.length)];
  const mesesHistorial = 3 + Math.floor(Math.random() * 9); // Entre 3-12 meses
  
  const datosVentas = generarDatosVentas(mesesHistorial, plataformaSeleccionada);
  const metricas = calcularMetricasVentas(datosVentas);
  const validacion = validarRequisitosMinimos(datosVentas);
  
  return {
    walletAddress,
    plataforma: plataformaSeleccionada,
    datosVentas,
    metricas,
    validacion,
    fechaCreacion: new Date().toISOString()
  };
}