# Summary Ejecutivo — Capacidades de la Plataforma de Incentivos

## Objetivo

La plataforma centraliza el ciclo de Venta/Recaudo, Liquidación de Incentivos, revisión, aprobación, ajustes, trazabilidad y salidas asociadas. El diseño busca que los procesos operativos y financieros puedan ejecutarse dentro de una misma solución, utilizando maestros, parámetros y reglas de negocio administradas de forma controlada.

## Capacidades principales

| Capacidad | Alcance funcional | Estado |
|---|---|---|
| Venta/Recaudo Diario | Carga de Venta y Recaudo, distribución comercial, asignación de representante, Ortopedia opcional, validaciones, resultado por fecha, revisión y aprobación. | Implementado / UAT |
| Venta/Recaudo Mensual | Uso de resultados diarios aprobados o archivos mensuales, tratamiento de DPP, facturas compensadas, signos y consolidación mensual. | Implementado / UAT |
| Liquidación de Incentivos | Cálculo por colaborador y parrilla utilizando Venta/Recaudo, Presupuesto, filtros, curvas, tasas, acumulados y fuentes complementarias. | Implementado / UAT |
| Maestros y parametrización | Administración de Colaboradores, Clientes, Productos, GP, SBA, Clusters, Zonas, CECO y relaciones comerciales; importación por Excel para estructuras versionadas. | Implementado |
| Contratos de archivos | Configuración de nombres visibles, hojas y encabezados sin depender del nombre físico del archivo cargado. | Implementado |
| Resultados y aprobación | Revisión de resultados, aprobación explícita y utilización de resultados aprobados como insumo de procesos posteriores. | Implementado |
| Reemplazo por archivo | Descarga, ajuste controlado y carga de un resultado corregido con trazabilidad. | Implementado |
| Ajustes y Reasignación de Ventas | Modificación controlada de asignaciones de facturas, reglas temporales o retroactivas, simulación, aprobación, reprocesamiento y reversión. | Pendiente de implementación |
| Vouchers | Generación de comprobantes individuales a partir de la Liquidación aprobada. | Implementado / UAT |
| Contabilización y conciliación | Generación de salida contable, cuadre contra Liquidación aprobada, tratamiento de CECO/cuentas y reversos. | Pendiente de implementación |
| Auditoría y trazabilidad | Registro de cargas, aprobaciones, modificaciones, usuarios, fechas, soportes y resultados asociados. | Implementado; se ampliará para Ajustes |
| Seguridad | Roles y permisos para operación, administración, aprobación y funciones sensibles. | Implementado |
| Reportes y exportación | Descarga de resultados, detalle de advertencias, archivos de salida y reportes asociados a procesos. | Implementado / en refinamiento UAT |

## Capacidades funcionales destacadas

- Encadenamiento controlado **Diario → Mensual → Liquidación → Voucher**.
- Posibilidad de iniciar Mensual y Liquidación directamente desde archivos cuando el negocio lo requiera.
- Conservación monetaria en las distribuciones de Venta/Recaudo.
- Aplicación de Distribución Comercial por Cliente + Grupo Producto + SBA.
- Resolución comercial por Cluster, Zona, Canal, Grupo Producto y SBA.
- Parrillas y reglas parametrizadas para el cálculo de incentivos.
- Presupuesto anual administrado previamente y utilizado en Liquidación.
- Manejo de acumulados, pago anterior y valor a pagar del período.
- Manejo de Pago Garantizado, Fecha de Ingreso, variables cualitativas, Surgical, rentabilidad y otras fuentes definidas por parrilla.
- Trazabilidad de ajustes y aprobaciones.
- Soporte para resultados detallados, resultados finales y vouchers.

## Próximos frentes

Los principales desarrollos funcionales pendientes corresponden a:

1. **Módulo de Ajustes y Reasignación de Ventas**, incluyendo retroactividad, simulación, reprocesamiento por rango/año, compensaciones y reversión.
2. **Contabilización y conciliación**, incluyendo archivo contable, cuadre, reversos y trazabilidad.
3. Refinamientos derivados de UAT y del reacondicionamiento visual de la aplicación.

La plataforma ya dispone de la estructura funcional principal para continuar UAT sobre Venta/Recaudo Diario, Venta/Recaudo Mensual y Liquidación.
