// Componente para mostrar gráficos de ventas del comerciante
import { useMemo } from 'react';

const SalesChart = ({ salesData, metrics }) => {
  // Procesar datos para el gráfico de los últimos 30 días
  const chartData = useMemo(() => {
    if (!salesData || salesData.length === 0) return [];
    
    // Tomar los últimos 30 días
    const last30Days = salesData.slice(-30);
    
    return last30Days.map((day, index) => ({
      day: index + 1,
      amount: day.monto,
      transactions: day.transacciones,
      date: new Date(day.fecha).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
    }));
  }, [salesData]);

  // Calcular estadísticas para mostrar
  const stats = useMemo(() => {
    if (!metrics) return null;
    
    return {
      totalVentas: metrics.totalVentas,
      promedioDiario: metrics.ventasPromedioDiarias,
      totalTransacciones: metrics.totalTransacciones,
      ticketPromedio: metrics.ticketPromedio,
      tendencia: metrics.tendenciaCrecimiento
    };
  }, [metrics]);

  if (!chartData.length) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📈</div>
        <p>No hay datos de ventas disponibles</p>
      </div>
    );
  }

  const maxAmount = Math.max(...chartData.map(d => d.amount));
  const minAmount = Math.min(...chartData.map(d => d.amount));

  return (
    <div style={styles.container}>
      {/* Estadísticas principales */}
      {stats && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              ${stats.totalVentas.toLocaleString()}
            </div>
            <div style={styles.statLabel}>Ventas Totales</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              ${stats.promedioDiario.toLocaleString()}
            </div>
            <div style={styles.statLabel}>Promedio Diario</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {stats.totalTransacciones.toLocaleString()}
            </div>
            <div style={styles.statLabel}>Transacciones</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              ${stats.ticketPromedio}
            </div>
            <div style={styles.statLabel}>Ticket Promedio</div>
          </div>
        </div>
      )}

      {/* Gráfico de barras simple */}
      <div style={styles.chartContainer}>
        <h4 style={styles.chartTitle}>Ventas Últimos 30 Días</h4>
        
        <div style={styles.chart}>
          <div style={styles.yAxis}>
            <div style={styles.yAxisLabel}>${Math.round(maxAmount).toLocaleString()}</div>
            <div style={styles.yAxisLabel}>${Math.round(maxAmount * 0.75).toLocaleString()}</div>
            <div style={styles.yAxisLabel}>${Math.round(maxAmount * 0.5).toLocaleString()}</div>
            <div style={styles.yAxisLabel}>${Math.round(maxAmount * 0.25).toLocaleString()}</div>
            <div style={styles.yAxisLabel}>$0</div>
          </div>
          
          <div style={styles.chartArea}>
            {/* Líneas de grid horizontales */}
            <div style={styles.gridLines}>
              {[0, 25, 50, 75, 100].map(percent => (
                <div 
                  key={percent}
                  style={{
                    ...styles.gridLine,
                    bottom: `${percent}%`
                  }}
                />
              ))}
            </div>
            
            {/* Barras del gráfico */}
            <div style={styles.bars}>
              {chartData.map((data, index) => {
                const height = ((data.amount - minAmount) / (maxAmount - minAmount)) * 100;
                const isWeekend = (index + 1) % 7 === 0 || (index + 1) % 7 === 1;
                
                return (
                  <div
                    key={index}
                    style={styles.barContainer}
                    title={`${data.date}: $${data.amount.toLocaleString()}`}
                  >
                    <div
                      style={{
                        ...styles.bar,
                        height: `${Math.max(height, 2)}%`,
                        backgroundColor: isWeekend ? '#3b82f6' : '#06b6d4'
                      }}
                    />
                    {index % 5 === 0 && (
                      <div style={styles.barLabel}>
                        {data.date}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Indicador de tendencia */}
        {stats && (
          <div style={styles.trendIndicator}>
            <span style={styles.trendLabel}>Tendencia:</span>
            <span style={{
              ...styles.trendValue,
              color: stats.tendencia >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.tendencia >= 0 ? '↗' : '↘'} 
              {Math.abs(stats.tendencia * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
    gap: '1rem',
    color: '#888'
  },
  emptyIcon: {
    fontSize: '3rem',
    opacity: 0.5
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem'
  },
  statCard: {
    padding: '1rem',
    backgroundColor: '#2c2c2c',
    borderRadius: '8px',
    border: '1px solid #444',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.25rem'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  chartContainer: {
    padding: '1.5rem',
    backgroundColor: '#2c2c2c',
    borderRadius: '12px',
    border: '1px solid #444'
  },
  chartTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1rem',
    color: '#e0e0e0'
  },
  chart: {
    display: 'flex',
    height: '200px',
    gap: '1rem'
  },
  yAxis: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80px',
    paddingRight: '0.5rem'
  },
  yAxisLabel: {
    fontSize: '0.75rem',
    color: '#888',
    textAlign: 'right'
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1a1a1a',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: '#333',
    opacity: 0.5
  },
  bars: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
    gap: '2px',
    padding: '0.5rem'
  },
  barContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    position: 'relative'
  },
  bar: {
    width: '100%',
    minHeight: '2px',
    borderRadius: '2px 2px 0 0',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  barLabel: {
    position: 'absolute',
    bottom: '-20px',
    fontSize: '0.7rem',
    color: '#888',
    transform: 'rotate(-45deg)',
    transformOrigin: 'center',
    whiteSpace: 'nowrap'
  },
  trendIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '6px'
  },
  trendLabel: {
    fontSize: '0.9rem',
    color: '#ccc'
  },
  trendValue: {
    fontSize: '0.9rem',
    fontWeight: 'bold'
  }
};

export default SalesChart;