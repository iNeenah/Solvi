# Documento de Requerimientos - Solvi 

## Introducción

"Solvi" es una plataforma descentralizada que permite a pequeños comerciantes en América Latina tokenizar su reputación de ventas para acceder a microcréditos de forma instantánea. La plataforma conecta comerciantes que utilizan sistemas de cobro digital (como Mercado Pago, Ualá) con inversores dispuestos a financiar microcréditos basados en datos de ventas verificables.

## Requerimientos

### Requerimiento 1 - Autenticación y Conexión de Datos de Ventas

**Historia de Usuario:** Como comerciante, quiero conectar mi cuenta de ventas digitales para que la plataforma pueda evaluar mi historial y calcular mi elegibilidad crediticia.

#### Criterios de Aceptación 

1. CUANDO el comerciante accede a la plataforma ENTONCES el sistema DEBERÁ mostrar una interfaz clara explicando la propuesta de valor
2. CUANDO el comerciante hace clic en "Conectar mi cuenta de ventas" ENTONCES el sistema DEBERÁ simular la conexión con datos de ventas falsos para la demo (Mercado Pago, Ualá Bis, Getnet, MODO)
3. CUANDO se valida la cuenta ENTONCES el sistema DEBERÁ verificar que tenga mínimo 3-6 meses de historial de transacciones consistentes
4. CUANDO la conexión se establece exitosamente ENTONCES el sistema DEBERÁ redirigir al panel principal del comerciante
5. SI la cuenta no cumple requisitos mínimos ENTONCES el sistema DEBERÁ mostrar mensaje explicativo sobre los requisitos de elegibilidad
6. SI la conexión falla ENTONCES el sistema DEBERÁ mostrar un mensaje de error claro y opciones para reintentar

### Requerimiento 2 - Panel de Análisis del Comerciante

**Historia de Usuario:** Como comerciante, quiero ver mi historial de ventas y puntaje de confianza para entender mi elegibilidad crediticia.

#### Criterios de Aceptación

1. CUANDO el comerciante accede al panel ENTONCES el sistema DEBERÁ mostrar gráficos de ingresos diarios y semanales simulados
2. CUANDO se calculan los datos ENTONCES el sistema DEBERÁ generar un puntaje de confianza entre 0-100 basado en el historial de ventas
3. CUANDO se muestra el puntaje ENTONCES el sistema DEBERÁ calcular y mostrar el monto máximo de préstamo disponible
4. CUANDO los datos se actualizan ENTONCES el sistema DEBERÁ refrescar automáticamente todos los indicadores en tiempo real

### Requerimiento 3 - Solicitud de Microcrédito

**Historia de Usuario:** Como comerciante, quiero solicitar un préstamo basado en mi puntaje de confianza para obtener capital de trabajo rápidamente.

#### Criterios de Aceptación

1. CUANDO el comerciante ingresa un monto de préstamo ENTONCES el sistema DEBERÁ validar que no exceda el límite máximo calculado
2. CUANDO el comerciante confirma la solicitud ENTONCES el sistema DEBERÁ iniciar la transacción con su wallet conectada (MetaMask,binance,etc...)
3. CUANDO la transacción se procesa ENTONCES el sistema DEBERÁ registrar la solicitud en el smart contract
4. SI el monto excede el límite ENTONCES el sistema DEBERÁ mostrar un error y sugerir el monto máximo disponible

### Requerimiento 4 - Smart Contract de Préstamos

**Historia de Usuario:** Como desarrollador del sistema, quiero un contrato inteligente que maneje los préstamos de forma segura y transparente.

#### Criterios de Aceptación

1. CUANDO un inversor deposita fondos ENTONCES el contrato DEBERÁ recibir y custodiar los fondos de forma segura
2. CUANDO se aprueba un préstamo ENTONCES el contrato DEBERÁ transferir los fondos al comerciante automáticamente
3. CUANDO se crea un préstamo ENTONCES el contrato DEBERÁ registrar monto, plazo, interés y dirección del prestatario
4. CUANDO se procesa un repago ENTONCES el contrato DEBERÁ actualizar el balance y distribuir fondos al prestamista

### Requerimiento 5 - Interfaz del Inversor

**Historia de Usuario:** Como inversor, quiero ver oportunidades de préstamo disponibles para poder financiar comerciantes con buen puntaje crediticio.

#### Criterios de Aceptación

1. CUANDO el inversor accede a la plataforma ENTONCES el sistema DEBERÁ mostrar una lista de oportunidades de préstamo activas
2. CUANDO se muestra cada oportunidad ENTONCES el sistema DEBERÁ incluir puntaje de confianza, monto solicitado e interés ofrecido
3. CUANDO el inversor selecciona "Financiar" ENTONCES el sistema DEBERÁ iniciar la transacción con el smart contract
4. CUANDO se completa el financiamiento ENTONCES el sistema DEBERÁ actualizar el estado de la oportunidad y notificar al comerciante

### Requerimiento 6 - Gestión de Wallets y Fondos

**Historia de Usuario:** Como usuario de la plataforma, quiero conectar mi wallet de criptomonedas de forma segura para realizar transacciones.

#### Criterios de Aceptación

1. CUANDO el usuario conecta su wallet ENTONCES el sistema DEBERÁ soportar MetaMask, Rabby, Trust Wallet y otros wallets compatibles
2. CUANDO se verifica el wallet ENTONCES el sistema DEBERÁ confirmar que tiene fondos mínimos para gas (MATIC en Polygon)
3. CUANDO se inicia una transacción ENTONCES el sistema DEBERÁ mostrar el costo estimado de gas antes de proceder
4. SI el usuario no tiene fondos suficientes para gas ENTONCES el sistema DEBERÁ mostrar instrucciones para obtener la criptomoneda nativa

### Requerimiento 7 - Gestión de Transacciones Blockchain

**Historia de Usuario:** Como usuario de la plataforma, quiero que todas las transacciones sean seguras y transparentes en la blockchain.

#### Criterios de Aceptación

1. CUANDO se inicia cualquier transacción ENTONCES el sistema DEBERÁ requerir confirmación del wallet del usuario
2. CUANDO una transacción está pendiente ENTONCES el sistema DEBERÁ mostrar el estado de progreso en tiempo real
3. CUANDO una transacción se confirma ENTONCES el sistema DEBERÁ actualizar la interfaz y mostrar confirmación
4. SI una transacción falla ENTONCES el sistema DEBERÁ mostrar el error específico y opciones para reintentar

### Requerimiento 8 - Verificación de Identidad y Cumplimiento

**Historia de Usuario:** Como administrador de la plataforma, quiero implementar verificaciones básicas de identidad para prevenir fraudes y cumplir regulaciones.

#### Criterios de Aceptación

1. CUANDO un comerciante se registra ENTONCES el sistema DEBERÁ solicitar verificación básica de negocio (KYB simplificado)
2. CUANDO un inversor supera cierto monto ENTONCES el sistema DEBERÁ requerir verificación KYC básica
3. CUANDO se detecta actividad sospechosa ENTONCES el sistema DEBERÁ flagear la cuenta para revisión manual
4. SI la verificación falla ENTONCES el sistema DEBERÁ limitar las funcionalidades hasta completar el proceso

### Requerimiento 9 - Gestión de Stablecoins y Capital

**Historia de Usuario:** Como inversor, quiero usar stablecoins (USDC, USDT) para financiar préstamos de forma segura y estable.

#### Criterios de Aceptación

1. CUANDO el inversor deposita fondos ENTONCES el sistema DEBERÁ aceptar solo USDC y USDT como monedas válidas
2. CUANDO se muestra el balance ENTONCES el sistema DEBERÁ convertir automáticamente a USD para facilitar la comprensión
3. CUANDO se procesa un préstamo ENTONCES el sistema DEBERÁ transferir stablecoins directamente al comerciante
4. CUANDO se completa un repago ENTONCES el sistema DEBERÁ distribuir capital más intereses en la misma stablecoin