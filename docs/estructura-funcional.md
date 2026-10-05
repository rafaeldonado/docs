# Estructura Funcional del Sistema de Liquidación de Incentivos
## Procesos, parámetros, fórmulas y conceptos de negocio — B. Braun Medical

**Versión:** 2.0  
**Fecha:** 30 de septiembre de 2026  
**Alcance:** Venta/Recaudo Diario, Venta/Recaudo Mensual, Liquidación de Incentivos, ajustes manuales, aprobación, vouchers y contabilización.

---

# 1. Propósito

Este documento presenta la estructura funcional del Sistema de Liquidación de Incentivos de B. Braun Medical desde la perspectiva de negocio.

Consolida:

- procesos;
- entradas;
- maestros y parametrizaciones;
- reglas de cálculo;
- fórmulas;
- relaciones comerciales;
- controles;
- ajustes manuales;
- aprobaciones;
- resultados;
- vouchers;
- salidas de contabilización.

El objetivo es disponer de una vista integral del funcionamiento esperado del sistema, desde la recepción de información hasta la obtención y aprobación de los resultados finales.

---

# 2. Vista general del proceso

El sistema se organiza en tres procesos principales:

```text
VENTA / RECAUDO DIARIO
Venta + Recaudo + información complementaria
        ↓
Resultado diario por fecha
        ↓
Revisión / ajustes / aprobación
        │
        ▼
VENTA / RECAUDO MENSUAL
Resultados diarios aprobados
          o
Archivos mensuales
        ↓
Resultado mensual
        ↓
Revisión / ajustes / aprobación
        │
        ▼
LIQUIDACIÓN DE INCENTIVOS
Resultado mensual aprobado
          o
Archivo Venta/Recaudo
        +
Presupuesto
        +
Parrillas y fuentes complementarias
        ↓
Cálculo de incentivos
        ↓
Resultado detallado y resultado final
        ↓
Revisión / ajustes / aprobación
        ↓
Vouchers
        ↓
Contabilización
```

Venta Mensual y Liquidación pueden utilizar información proveniente del proceso anterior o recibir directamente los archivos correspondientes. En ambos casos, la información debe contener las dimensiones y valores requeridos para ejecutar las reglas de negocio del proceso.

---

# 3. Información maestra y parametrización

## 3.1 Maestros principales

Los procesos utilizan, según corresponda:

- Colaboradores.
- Clientes.
- Productos / materiales.
- Grupos de producto.
- SBA.
- Clusters.
- Zonas.
- Centros de costo / CECO.
- Cargos.
- Canales comerciales.
- Divisiones comerciales.
- Unidades de negocio.
- Sociedades.
- Categorías y demás catálogos requeridos.

## 3.2 Relaciones comerciales

### Distribución comercial

Permite definir, para una combinación:

```text
Cliente + Grupo Producto + SBA
```

uno o varios destinos comerciales:

```text
Cluster + Zona + Porcentaje
```

La distribución se administra con vigencia.

### Destino comercial base del cliente

Cada cliente dispone de un destino comercial base para los casos en los que no exista una distribución específica.

### Canal

El Canal asociado al movimiento se obtiene a partir del Grupo Producto.

### Unidad de negocio y División

La relación comercial utilizada es:

```text
Grupo Producto
→ Unidad de negocio
→ División comercial
```

### Asignación de vendedor

La asignación del representante comercial considera las dimensiones que correspondan a la relación vigente:

- Cluster;
- Zona;
- Canal;
- Grupo Producto;
- SBA.

### Asignación documental

Permite relacionar documentos comerciales específicos con un colaborador cuando se requiere una asignación por documento.

---

# 4. Manejo de resultados, ajustes y reasignaciones

## 4.1 Revisión y aprobación de resultados

Los resultados de Venta/Recaudo Diario, Venta/Recaudo Mensual y Liquidación podrán ser revisados antes de continuar con el siguiente proceso.

Un resultado aprobado podrá utilizarse como entrada del proceso siguiente:

```text
Venta/Recaudo Diario aprobado
→ Venta/Recaudo Mensual

Venta/Recaudo Mensual aprobado
→ Liquidación

Liquidación aprobada
→ Voucher y procesos posteriores
```

Cuando un resultado requiera corrección, deberá conservarse la trazabilidad del cambio y someterse nuevamente al flujo de revisión y aprobación correspondiente.

## 4.2 Módulo de Ajustes y Reasignación de Ventas

El sistema contará con un módulo específico para gestionar excepciones comerciales y correcciones en la asignación de ventas para efectos de incentivos.

Este módulo permitirá modificar la forma en que una venta es reconocida dentro del proceso de incentivos sin alterar ni eliminar la información original proveniente de SAP.

La información original permanecerá disponible como referencia y cada ajuste se registrará de manera independiente, conservando:

-   dato original;
-   dato ajustado;
-   origen y destino;
-   vigencia;
-   usuario solicitante;
-   aprobadores;
-   motivo;
-   soportes;
-   fecha y hora;
-   impacto sobre los resultados y liquidaciones.

Los cálculos posteriores utilizarán la asignación ajustada una vez haya sido aprobada.

## 4.3 Tipos de ajuste

El módulo deberá soportar, como mínimo, los siguientes tipos de ajuste:

| Tipo | Alcance |
| --- | --- |
| Distribución porcentual | Dividir una venta entre varias zonas, clusters o representantes. Puede aplicarse a una factura completa, posiciones específicas o una porción del valor. |
| Reasignación total o parcial | Trasladar una venta desde una combinación de origen hacia una combinación de destino. |
| Cambio de representante | Modificar el representante comercial manteniendo, cuando corresponda, cliente, zona, canal y cluster. |
| Regla temporal por cliente | Aplicar una asignación a las ventas que cumplan determinados criterios durante una vigencia definida. |
| Regla retroactiva | Aplicar una regla a períodos anteriores, incluso a todo el año, aunque la solicitud sea registrada posteriormente. |
| Ajuste masivo | Aplicar una misma modificación a múltiples facturas, clientes o períodos mediante selección múltiple o carga controlada. |
| Reversión | Deshacer de forma trazable un ajuste previamente aprobado sin eliminar su historial. |

## 4.4 Niveles de aplicación

Los ajustes podrán aplicarse a diferentes niveles:

-   factura completa;
-   posición de factura;
-   valor o porcentaje parcial;
-   cliente dentro de una vigencia;
-   combinación de criterios;
-   conjunto de facturas mediante selección o carga masiva.

Las condiciones podrán considerar, según corresponda:

-   cliente;
-   canal;
-   material;
-   Grupo Producto;
-   SBA;
-   Zona;
-   Cluster;
-   representante;
-   período;
-   otras dimensiones autorizadas.

## 4.5 Distribución porcentual

Cuando una venta deba repartirse entre varios destinos, el sistema permitirá definir uno o varios destinos con su porcentaje correspondiente.

Ejemplo conceptual:

```
Venta original
100%

→ Zona A  33%
→ Zona B  33%
→ Zona C  34%
```

El sistema deberá:

-   validar que la suma de porcentajes sea exactamente 100% cuando se redistribuya la totalidad de la venta;
-   calcular automáticamente el valor asignado a cada destino;
-   controlar que el valor o porcentaje ajustado no supere el saldo disponible;
-   evitar que una misma porción de la venta sea reconocida más de una vez;
-   aplicar una política consistente de redondeo;
-   mantener el total de la venta cuadrado.

Cuando corresponda, el ajuste deberá reflejarse sobre las bases utilizadas para incentivos, incluyendo Venta, Recaudo, margen, presupuesto, cumplimiento y base incentivada, de acuerdo con la configuración del modelo.

## 4.6 Vigencia del ajuste

La fecha en que se solicita o aprueba un ajuste no limita su período de aplicación.

El sistema distinguirá entre:

| Fecha / período | Función |
| --- | --- |
| Fecha de solicitud | Momento en que se registra el requerimiento. |
| Fecha de aprobación | Momento en que se autoriza el ajuste. |
| Fecha efectiva desde | Primer día al que aplica la regla, incluso si es anterior a la solicitud. |
| Fecha efectiva hasta | Último día de aplicación de la regla. |
| Período de procesamiento | Mes en el que se ejecuta el recálculo. |
| Período de compensación | Mes en el que se reflejan diferencias correspondientes a períodos ya cerrados o pagados. |

Una regla aprobada en un mes podrá tener vigencia desde un período anterior.

Por ejemplo:

```
Regla aprobada en agosto
Vigencia: 1 de enero a 31 de diciembre

→ Recalcular enero a agosto
→ Aplicar automáticamente septiembre a diciembre
```

## 4.7 Simulación de impacto

Antes de aplicar un ajuste retroactivo o un reprocesamiento de períodos cerrados, el usuario deberá poder ejecutar una simulación.

La simulación deberá mostrar, según el alcance:

-   períodos afectados;
-   facturas;
-   posiciones;
-   valores;
-   asignación original;
-   asignación propuesta;
-   representantes afectados;
-   liquidaciones afectadas;
-   incentivo anterior;
-   incentivo recalculado;
-   diferencia estimada.

La simulación no modificará los resultados vigentes.

## 4.8 Reprocesamiento

Un ajuste aprobado podrá solicitar reprocesamiento sobre:

-   un mes específico;
-   un rango de meses;
-   el año completo;
-   todos los períodos comprendidos desde una fecha efectiva;
-   una selección específica de facturas.

Para cada período afectado, el sistema utilizará la información, reglas y parametrizaciones que correspondan al escenario aprobado.

### Períodos abiertos

El resultado podrá recalcularse antes del cierre.

### Períodos cerrados no pagados

Se conservará el resultado anterior y se generará el tratamiento corregido correspondiente de acuerdo con la aprobación.

### Períodos pagados

El pago original no se eliminará.

El sistema calculará la diferencia entre el valor anteriormente reconocido y el nuevo resultado:

```
Diferencia
=
Resultado recalculado
−
Resultado previamente reconocido
```

La diferencia podrá reflejarse mediante:

-   débito;
-   crédito;
-   compensación;

en el período autorizado.

## 4.9 Aplicación futura de una regla

Una regla temporal o retroactiva aprobada permanecerá aplicable durante su vigencia.

Por ejemplo:

```
Vigencia:
01/01/2026 → 31/12/2026

Aprobación:
Agosto 2026

Comportamiento:
Enero–Agosto → reprocesamiento
Septiembre–Diciembre → aplicación automática
```

## 4.10 Datos mínimos de un ajuste

Cada ajuste deberá conservar como mínimo:

### Identificación

-   número de ajuste;
-   tipo;
-   estado;
-   fecha de solicitud;
-   solicitante.

### Venta origen

-   factura;
-   posición;
-   fecha;
-   cliente;
-   código SAP;
-   pedido o referencia equivalente;
-   material;
-   valor;
-   Recaudo;
-   período.

### Asignación origen

-   Canal;
-   Zona;
-   Cluster;
-   representante;
-   código de representante.

### Asignación destino

-   Canal;
-   Zona;
-   Cluster;
-   representante;
-   porcentaje;
-   valor.

### Vigencia

-   fecha efectiva desde;
-   fecha efectiva hasta;
-   año;
-   alcance del reprocesamiento.

### Justificación y aprobación

-   motivo;
-   descripción;
-   aprobadores;
-   comentarios;
-   documentos soporte.

### Impacto

-   liquidaciones afectadas;
-   incentivo anterior;
-   incentivo recalculado;
-   diferencia;
-   período de compensación.

## 4.11 Flujo del ajuste

El flujo general será:

```
Buscar venta / definir criterio
        ↓
Consultar información original
        ↓
Seleccionar tipo y alcance
        ↓
Definir vigencia
        ↓
Configurar destino / porcentajes
        ↓
Simular impacto
        ↓
Registrar justificación y soportes
        ↓
Validación comercial
        ↓
Aprobación correspondiente
        ↓
Validación financiera / incentivos
        ↓
Aplicar ajuste
        ↓
Reprocesar períodos autorizados
        ↓
Generar diferencias y resultados
        ↓
Cerrar o revertir
```

## 4.12 Aprobación de ajustes

El flujo podrá incluir, según el tipo de ajuste:

1.  solicitud por usuario autorizado;
2.  validación comercial;
3.  aprobación del responsable de canal;
4.  validación financiera / incentivos;
5.  ejecución;
6.  cierre.

La aplicación de ajustes deberá respetar la matriz de autoridad definida por B. Braun.

## 4.13 Estados del ajuste

Los estados contemplados incluyen:

-   Borrador.
-   Pendiente de aprobación.
-   Devuelto.
-   Aprobado.
-   Rechazado.
-   Programado para reprocesamiento.
-   En proceso.
-   Aplicado.
-   Aplicado con diferencias.
-   Incluido en Liquidación.
-   Revertido.
-   Fallido.
-   Anulado.

## 4.14 Controles

El módulo deberá garantizar:

-   que los datos originales provenientes de SAP no sean sobrescritos;
-   que el porcentaje o valor ajustado no supere el saldo disponible;
-   que una misma porción de venta no sea incentivada dos veces;
-   que la factura y sus posiciones existan;
-   que las relaciones comerciales de destino sean válidas para el período;
-   que no existan reglas contradictorias para el mismo criterio y vigencia sin una prioridad definida;
-   que los redondeos mantengan el total cuadrado;
-   que una ejecución repetida no duplique débitos, créditos o reconocimientos;
-   que los períodos abiertos, cerrados y pagados se identifiquen antes del reprocesamiento;
-   que un ajuste aprobado no pueda modificarse directamente: cualquier corrección posterior deberá realizarse mediante reversión y una nueva versión.

## 4.15 Reversión

Un ajuste aplicado podrá ser revertido por un usuario autorizado.

La reversión:

-   no elimina el ajuste original;
-   conserva toda la auditoría;
-   anula sus efectos;
-   permite generar posteriormente una nueva corrección.

## 4.16 Auditoría y reportes

La auditoría del módulo deberá permitir consultar:

-   identificador del ajuste;
-   lote de reprocesamiento;
-   dato original;
-   dato ajustado;
-   diferencia;
-   facturas y posiciones;
-   períodos afectados;
-   regla aplicada;
-   solicitante;
-   aprobadores;
-   ejecutor;
-   fechas y horas;
-   motivo;
-   comentarios;
-   soportes;
-   estado;
-   errores y reintentos;
-   reversión;
-   incentivo original;
-   incentivo recalculado;
-   diferencia por período.

También deberá permitir obtener resúmenes:

-   mensuales;
-   acumulados anuales;
-   por Zona;
-   por Cluster;
-   por representante.

Los reportes podrán exportarse a Excel y PDF de acuerdo con los permisos definidos.

---

# 5. Venta / Recaudo Diario

## 5.1 Objetivo

Construir diariamente una base de Venta y Recaudo enriquecida con las dimensiones comerciales necesarias para su revisión, aprobación y posterior consolidación mensual.

## 5.2 Entradas

### Obligatorias

| Fuente | Uso |
|---|---|
| Venta | Movimientos diarios de Venta |
| Recaudo | Movimientos diarios de Recaudo |

### Opcional

| Fuente | Uso |
|---|---|
| Asignación de Ortopedia | Asignación documental de facturas específicas a colaboradores |

## 5.3 Información utilizada

El proceso utiliza, entre otros:

- Cliente.
- Material.
- Grupo Producto.
- SBA.
- Canal.
- Cluster.
- Zona.
- Destino comercial base.
- Distribución Comercial.
- Asignación de vendedor.
- Asignación documental.

## 5.4 Identificación de Venta y Recaudo

Venta y Recaudo son conceptos financieros diferentes y se conservan separados durante el procesamiento.

## 5.5 Distribución comercial

Para cada movimiento se evalúa la combinación:

```text
Cliente + Grupo Producto + SBA
```

### Cuando existe distribución

El valor se distribuye entre los destinos vigentes de acuerdo con los porcentajes configurados.

```text
Valor destino
=
Valor del movimiento × Porcentaje de distribución
```

### Cuando no existe distribución

El movimiento permanece al 100% en el destino comercial base del cliente.

```text
Sin distribución específica
→ 100% al destino base del cliente
```

## 5.6 Precisión y conservación monetaria

Los porcentajes de distribución se manejan con una precisión de cuatro decimales.

El proceso debe garantizar:

```text
Suma de valores distribuidos
=
Valor original del movimiento
```

Cuando exista un residual por redondeo:

```text
Residual
=
Valor original
−
Suma de valores distribuidos
```

el residual se asigna de forma determinística a uno de los destinos sin alterar el porcentaje configurado.

## 5.7 Asignación del representante

Una vez determinado el destino comercial, se resuelve la asignación del representante considerando las dimensiones de la relación comercial aplicable.

La asignación puede utilizar:

- Cluster;
- Zona;
- Canal;
- Grupo Producto;
- SBA.

## 5.8 Asignación documental y Ortopedia

Cuando no es posible resolver un representante mediante la asignación comercial, se utiliza la asignación documental cuando exista.

El archivo opcional de Ortopedia permite complementar documentos específicos para la ejecución.

Reglas:

- aplica únicamente a documentos de la ejecución;
- el colaborador informado debe existir;
- un documento no puede asignarse simultáneamente a dos colaboradores diferentes;
- una asignación de Ortopedia que contradiga una asignación documental vigente debe presentarse como conflicto para revisión;
- Ortopedia no reemplaza una asignación comercial ya resuelta.

## 5.9 Ajustes manuales del proceso

Desde el Módulo de Manualidades se podrán realizar correcciones controladas sobre facturas o registros habilitados, por ejemplo:

- Cluster;
- Zona;
- representante;
- Categoría;
- SBA;
- Grupo Producto.

El cambio debe conservar el valor anterior y el nuevo valor y recalcular los resultados afectados.

## 5.10 Validaciones

Entre las validaciones del proceso se incluyen:

- archivo obligatorio faltante;
- estructura no válida;
- maestro requerido inexistente;
- dimensión comercial incompleta;
- conflicto de asignación documental;
- información que impida determinar correctamente el destino o asignación.

Las advertencias deben presentarse en términos de negocio y permitir identificar los registros afectados.

## 5.11 Resultado Diario

El resultado debe permitir identificar la información necesaria para seguimiento y consolidación, incluyendo según corresponda:

- documento;
- fecha;
- cliente;
- material;
- descripción;
- SBA;
- Grupo Producto;
- Cluster;
- Zona;
- Canal;
- representante;
- cantidad;
- Venta;
- Recaudo;
- demás atributos requeridos por el formato de salida.

Una ejecución puede contener información de varias fechas; cada fecha puede revisarse y aprobarse de manera independiente.

---

# 6. Venta / Recaudo Mensual

## 6.1 Objetivo

Consolidar la información mensual de Venta, Recaudo y ajustes aplicables para obtener la base mensual oficial que puede alimentar el proceso de Liquidación.

## 6.2 Orígenes

### Resultados diarios aprobados

El usuario puede utilizar los resultados diarios aprobados del período.

El sistema debe mostrar las fechas incluidas y permitir identificar cualquier fecha pendiente de revisión.

### Archivos mensuales

El usuario también puede cargar directamente:

| Fuente | Condición |
|---|---|
| Venta mensual | Obligatoria |
| Recaudo mensual | Obligatoria |
| Descuentos / DPP | Opcional |

## 6.3 Información mensual consolidada

La base mensual conserva, cuando corresponda:

- fecha;
- documento;
- cliente;
- material;
- Grupo Producto;
- SBA;
- Unidad de negocio;
- División;
- Cluster;
- Zona;
- Canal;
- Venta;
- Recaudo;
- DPP;
- trazabilidad del origen.

La presentación del archivo mensual puede estar agrupada de forma distinta a la información diaria, siempre que se conserve la información necesaria para los procesos posteriores.

## 6.4 Facturas compensadas

El proceso mensual contempla el tratamiento de facturas compensadas de acuerdo con la regla funcional definida para su identificación y tratamiento.

## 6.5 Descuentos / DPP

DPP se procesa como ajuste mensual cuando aplique.

El ajuste se registra una sola vez y debe permanecer identificado en el resultado mensual para evitar una doble aplicación posterior.

## 6.6 Signos

Venta, Recaudo y ajustes conservan la semántica de signo correspondiente a su naturaleza financiera.

## 6.7 Ajustes manuales del proceso

Venta/Recaudo Mensual permite realizar ajustes controlados sobre facturas o registros específicos.

Entre los casos de negocio:

- mover una factura de un Cluster a otro;
- cambiar Zona;
- cambiar representante;
- cambiar SBA;
- cambiar Grupo Producto;
- corregir una asignación después del cierre mensual.

Los cambios deben recalcular el resultado mensual y los incentivos afectados.

## 6.8 Resultado Mensual

El resultado mensual debe conservar separados los conceptos:

```text
Venta
Recaudo
DPP
```

y las dimensiones necesarias para Liquidación.

Cuando el resultado mensual representa los mismos hechos financieros que el archivo utilizado directamente en Liquidación, ambos deben ser reconciliables por dimensiones como:

```text
Grupo Producto
+ SBA
+ División
+ Cluster
+ Zona
```

No es necesario que ambos archivos tengan el mismo número de filas o la misma granularidad.

## 6.9 Aprobación

El resultado mensual revisado y aprobado queda habilitado como entrada de Liquidación.

---

# 7. Conceptos financieros para la Liquidación

## 7.1 Venta Facturada Neta

```text
Venta Facturada Neta
=
Ventas Brutas
− Notas de Crédito
− Descuentos financieros
− Rebates
```

No incluye IVA.

## 7.2 Venta Cobrada Neta

Corresponde a cobros realizados al 100% y aplicados a las facturas, menos las notas de crédito, sin incluir IVA.

## 7.3 Portafolio asignado en Cluster

Corresponde a productos vendidos y cobrados al grupo de clientes asignado al representante de acuerdo con el portafolio definido.

Cuando la venta o cobro corresponda a clientes que no pertenecen al Cluster, podrá aplicar a niveles superiores como Zona, Región o País según la definición de la variable.

## 7.4 Distribuidores, Operadores Logísticos y Aseguradoras

Las ventas y cobros pueden asignarse mediante porcentajes definidos para Zona y representante.

Cuando exista negociación con sell-out, se aplicarán los porcentajes informados y aprobados para el cliente correspondiente.

## 7.5 Rentabilidad COGs+

La rentabilidad COGs+ utilizada para la Liquidación corresponde a la rentabilidad acumulada al cierre del mes de liquidación.

## 7.6 Cobros parciales

Las facturas con abonos parciales se consideran cuando se encuentren pagadas al 100%, conforme a la política aplicable.

## 7.7 Facturas excluidas

No se consideran para el cálculo de incentivos las facturas canceladas por baja de cuentas incobrables o cobradas mediante cobro jurídico, conforme a la política aplicable.

## 7.8 Periodicidad

Los objetivos financieros se liquidan mes vencido y se pagan en el mes siguiente.

---

# 8. Liquidación de Incentivos

## 8.1 Objetivo

Determinar el incentivo correspondiente a cada colaborador de acuerdo con:

- parrilla asignada;
- pesos;
- Venta/Recaudo;
- presupuesto;
- real alcanzado;
- cumplimiento;
- curvas;
- territorio;
- portafolio;
- rentabilidad;
- indicadores;
- salario variable;
- acumulados;
- pagos anteriores;
- fuentes complementarias aplicables.

## 8.2 Origen de Venta/Recaudo

El usuario puede seleccionar:

### Resultado mensual aprobado

Se utiliza la base mensual aprobada del mismo período.

### Archivo de Real Venta/Recaudo

El archivo combinado contiene las medidas financieras requeridas.

Mapeo funcional:

```text
Total_Facturado → Venta
Valor_Neto      → Recaudo
```

## 8.3 Información financiera para Liquidación

La información financiera utilizada para cálculo conserva:

- período;
- Grupo Producto;
- SBA;
- Unidad de negocio;
- División;
- Cluster;
- Zona;
- Canal;
- Venta;
- Recaudo;
- atributos de trazabilidad necesarios.

## 8.4 Presupuesto

El Presupuesto anual debe estar cargado previamente.

Para la Liquidación se utiliza el presupuesto vigente y aplicable al período.

Si no existe presupuesto requerido para una variable, el componente correspondiente debe presentarse para revisión y no asumir presupuesto cero.

## 8.5 Fuentes complementarias

Según la parrilla del colaborador pueden aplicar:

- Rentabilidad.
- Variables cualitativas.
- Variable Calidad Surgical.
- Indicadores Surgical.
- Venta Otras Compañías.
- Venta / Recaudo KAMS.
- tasas de conversión.
- otras fuentes definidas en la parrilla.

## 8.6 Asociación del colaborador

La liquidación financiera parte del colaborador y su parrilla:

```text
Colaborador
→ Parrilla
→ Territorio
→ Filtros de la variable
→ Hechos financieros aplicables
→ Cálculo del componente
```

Los filtros pueden considerar:

- División;
- Grupo Producto;
- SBA;
- Cluster;
- Zona;
- País;
- Sociedad;
- Portafolio;
- otras dimensiones definidas en la parrilla.

## 8.7 Resolución territorial VC

Se han definido relaciones territoriales para variables VC, entre ellas:

```text
P001 / VC4 → CC
P002 / VC3 → IC
P003 / VC6 → CC + IC
```

El Canal participa en la resolución territorial cuando la parrilla lo requiere.

---

# 9. Parrillas

La definición detallada de:

- parrillas;
- variables;
- subvariables;
- pesos;
- filtros;
- curvas;
- fuentes;
- sociedades;
- países;
- parámetros;
- topes;

corresponde al **archivo de Parrillas 2026 enviado por B. Braun** y a la parametrización vigente derivada de éste.

El sistema utiliza la parrilla asignada al colaborador para determinar qué componentes deben calcularse y qué reglas corresponden a cada uno.

## 9.1 Criterios complementarios revisados

### Venta Facturada por País

Cuando una variable se distribuye por país, cada país se procesa como detalle del componente de acuerdo con el peso definido en la parrilla.

### Venta Facturada de Portafolio y CMII COGs+

Cuando ambos conceptos aparecen en una parrilla se consideran variables independientes, con sus pesos y fuentes respectivas.

### Portafolios específicos

Los filtros de División, Grupo Producto y SBA definidos en la parrilla determinan el universo de hechos que participa en cada componente.

---

# 10. Fórmulas generales de Liquidación

## 10.1 Target acumulado

El Target acumulado corresponde a la suma del valor esperado al 100% de cumplimiento para los meses aplicables.

```text
Target acumulado
=
Σ Target mensual aplicable
```

## 10.2 Base de Liquidación por componente

Cuando el componente se define como porcentaje del Target:

```text
Base de Liquidación
=
Target acumulado × Peso del componente
```

Cuando existan subcomponentes, el peso efectivo corresponde a la distribución definida en la parrilla.

## 10.3 Real acumulado

```text
Real acumulado
=
Σ Real elegible de los meses aplicables
```

Los hechos elegibles dependen de los filtros definidos para la variable.

## 10.4 Cuota / Presupuesto acumulado

```text
Cuota acumulada
=
Σ Presupuesto elegible de los meses aplicables
```

## 10.5 Cumplimiento

Para variables en las que el cumplimiento se determina por Real frente a Presupuesto:

```text
Cumplimiento
=
Real acumulado / Cuota acumulada
```

Los cumplimientos se manejan con dos decimales conforme a la regla de redondeo definida por B. Braun.

## 10.6 Factor de pago

```text
Factor
=
Curva de pago(Cumplimiento)
```

La curva aplicable depende de la parrilla / tipo de componente.

## 10.7 Incentivo acumulado del componente

```text
Incentivo acumulado
=
Base de Liquidación × Factor
```

## 10.8 Liquidación total acumulada

```text
Liquidación total acumulada
=
Σ Incentivos acumulados de los componentes
```

## 10.9 Valor a pagar en el mes

```text
Valor a pagar del mes
=
Liquidación total acumulada
− Pago acumulado anterior
```

---

# 11. Fecha de ingreso y acumulación

Para hechos comerciales acumulables:

```text
Mes del hecho < Mes de ingreso
→ no participa

Mes del hecho >= Mes de ingreso
→ participa
```

Aplica, cuando corresponda, sobre:

- Venta;
- Recaudo;
- Presupuesto.

No se realiza prorrateo por día dentro del mes.

---

# 12. Pago Garantizado

Durante los primeros tres meses calendario aplicables:

```text
Pago Garantizado
=
Salario variable completo
```

sin prorrateo.

El Pago Garantizado se trata de forma independiente de las curvas ordinarias de cumplimiento.

---

# 13. Variables cualitativas e indicadores

## 13.1 Variables cualitativas

Para los meses enero a noviembre, cuando la regla cualitativa aplicable así lo determine:

```text
Factor = 0,5
```

En diciembre se utiliza la evaluación correspondiente y la curva definida para la variable.

## 13.2 Variable Calidad Surgical

Se procesa por colaborador con el porcentaje de cumplimiento informado y la regla de pago definida en la parrilla correspondiente.

## 13.3 Indicadores Surgical

Los indicadores Surgical se procesan de acuerdo con:

- variable;
- peso;
- cumplimiento;
- curva;
- parámetros vigentes.

---

# 14. Curvas de pago

Las curvas completas se administran dentro de la parametrización del sistema y corresponden a las definiciones del archivo de Parrillas 2026 enviado por B. Braun.

Las familias actualmente consideradas incluyen:

1. **RC / Ingeniería**.
2. **GUN / DC / ADM / Cross-Cutting**.
3. **Surgical / Planta**.

Cada componente utiliza la curva que le corresponda según su parrilla y parametrización.

---

# 15. Tasas de conversión

Cuando una variable requiera conversión monetaria:

1. se identifica la tasa aplicable al período;
2. se aplica según moneda, sociedad y regla de la variable;
3. la tasa utilizada se conserva como parte de la trazabilidad del cálculo.

La ausencia de una tasa requerida debe presentarse para revisión.

---

# 16. Consideraciones laborales y acumulados

## 16.1 Maternidad y enfermedad prolongada

Cuando corresponda a la política aplicable, se considera la información acumulada dentro del año para determinar cumplimiento y pago de incentivos de acuerdo con la parrilla.

## 16.2 Cargo y categoría

Los incentivos utilizan la parrilla aprobada para el cargo y categoría vigentes en el período de liquidación.

---

# 17. Ajustes excepcionales

Las modificaciones excepcionales que incidan sobre resultados deben quedar sustentadas y aprobadas conforme a la matriz de autoridad de B. Braun.

Los ajustes pueden realizarse:

- sobre la información de Venta/Recaudo;
- sobre asignaciones de facturas;
- sobre puntos de datos habilitados del resultado;
- mediante carga controlada cuando se requiera un ajuste masivo.

El sistema conserva el antes y después y permite identificar el impacto generado.

---

# 18. Resultado de Liquidación

La Liquidación genera dos niveles de salida funcional.

## 18.1 Resultado Detallado

Debe permitir revisar, por colaborador:

```text
Colaborador
→ Variable
→ Subvariable / detalle
→ Peso
→ Base de Liquidación
→ Real
→ Presupuesto / Cuota
→ Cumplimiento
→ Factor
→ Incentivo acumulado
→ Pago anterior
→ Valor del período
```

## 18.2 Resultado Final

Resume el valor final por colaborador y los conceptos necesarios para:

- aprobación;
- pago;
- voucher;
- contabilización;
- seguimiento.

## 18.3 Ajustes sobre el resultado

El usuario autorizado puede:

- realizar ajustes directos en la aplicación sobre campos habilitados;
- descargar y cargar una corrección;
- revisar el impacto;
- someter el resultado nuevamente a aprobación.

---

# 19. Vouchers

Los vouchers individuales se generan a partir de la Liquidación aprobada.

El voucher debe ser consistente con:

- resultado detallado;
- resultado final;
- acumulados;
- valor del período.

Cuando exista un ajuste que modifique la Liquidación aprobada, el voucher correspondiente debe regenerarse.

---

# 20. Contabilización y conciliación

## 20.1 Archivo contable

La salida de contabilización debe contener, según corresponda:

- sociedad;
- período;
- cuenta;
- centro de costo;
- empleado;
- concepto;
- debe / haber;
- valor.

## 20.2 Cuadre

```text
Total contabilización
=
Total Liquidación aprobada
```

## 20.3 Cuentas y centros de costo

Las cuentas y centros de costo se determinan según la parametrización definida por Finanzas.

Cuando una cuenta o CECO requerido no pueda resolverse, el registro debe quedar identificado para revisión antes de contabilizar.

## 20.4 Reversos

Un reproceso aprobado que impacte una contabilización ya generada debe permitir generar el ajuste o reverso correspondiente, manteniendo vínculo con el registro original.

## 20.5 Trazabilidad

Debe conservarse:

- generación;
- revisión;
- aprobación;
- envío;
- ajuste;
- reverso, cuando corresponda.

---

# 21. Incidencias operativas

Las incidencias se presentan como condiciones de negocio accionables.

Ejemplos:

- archivo requerido faltante;
- maestro requerido inexistente;
- asignación comercial no resoluble;
- conflicto de asignación documental;
- presupuesto no disponible;
- parrilla no asignada;
- salario requerido no disponible;
- tasa no disponible;
- evaluación individual no disponible;
- parámetro requerido de una variable no disponible.

Las incidencias deben mostrar suficiente información para que el usuario pueda identificar el registro o concepto afectado.

---

# 22. Matriz resumida de parámetros

| Parámetro / dimensión | Diario | Mensual | Liquidación |
|---|:---:|:---:|:---:|
| Cliente | Sí | Sí | Según variable / trazabilidad |
| Material | Sí | Sí | Según variable / trazabilidad |
| Grupo Producto | Sí | Sí | Sí |
| SBA | Sí | Sí | Sí |
| Canal | Sí | Sí | Según variable / territorio |
| Cluster | Sí | Sí | Sí |
| Zona | Sí | Sí | Sí |
| Unidad de negocio | Sí | Sí | Sí |
| División | Sí | Sí | Sí |
| Distribución comercial | Sí | Resultado ya distribuido | No se reaplica |
| Representante | Sí | Sí | Según territorio |
| Asignación documental | Sí | No | No |
| Ortopedia | Opcional | No | No |
| DPP | No | Opcional | No se reaplica |
| Presupuesto | No | No | Obligatorio cuando aplica |
| Parrilla | No | No | Sí |
| Peso | No | No | Sí |
| Curva | No | No | Según componente |
| Salario variable | No | No | Según componente |
| Fecha de ingreso | No | No | Sí |
| Rentabilidad | No | No | Según parrilla |
| Calidad Surgical | No | No | Según parrilla |
| Indicadores Surgical | No | No | Según parrilla |
| Variables cualitativas | No | No | Según parrilla |
| Venta otras compañías | No | No | Según parrilla |
| Venta / Recaudo KAMS | No | No | Según parrilla |
| Tasa de conversión | No | No | Cuando aplique |
| Pago acumulado anterior | No | No | Sí |
| CECO | No | No | Resultado / contabilización |

---

# 23. Matriz de reglas

## 23.1 Venta / Recaudo Diario

| ID | Regla de negocio |
|---|---|
| VD-001 | Venta y Recaudo se procesan como conceptos financieros separados |
| VD-002 | La distribución comercial se identifica por Cliente + Grupo Producto + SBA |
| VD-003 | Cuando existe distribución, el valor se reparte según porcentajes vigentes |
| VD-004 | Sin distribución específica, el 100% se mantiene en el destino base del cliente |
| VD-005 | Los porcentajes de distribución se manejan con precisión de cuatro decimales |
| VD-006 | El proceso conserva íntegramente el valor monetario de cada movimiento |
| VD-007 | El Canal se determina desde Grupo Producto |
| VD-008 | La asignación comercial del representante se resuelve con las dimensiones aplicables |
| VD-009 | La asignación documental se utiliza cuando se requiere resolución por documento |
| VD-010 | Ortopedia puede complementar la asignación documental de la ejecución |
| VD-011 | Un conflicto de asignación documental debe ser revisado antes de aprobar el resultado |
| VD-012 | El resultado diario se administra por fecha |
| VD-013 | Solo un resultado diario aprobado puede alimentar Venta/Recaudo Mensual |
| VD-014 | Los ajustes manuales sobre facturas deben recalcular los procesos impactados |

## 23.2 Venta / Recaudo Mensual

| ID | Regla de negocio |
|---|---|
| VM-001 | El origen puede ser resultados diarios aprobados o archivos mensuales |
| VM-002 | Venta y Recaudo mensuales son obligatorios cuando el origen es archivo |
| VM-003 | DPP es opcional y se aplica una sola vez |
| VM-004 | Se aplica la regla funcional de facturas compensadas |
| VM-005 | Los signos se mantienen conforme a la naturaleza financiera del concepto |
| VM-006 | El resultado conserva separadamente Venta, Recaudo y DPP |
| VM-007 | El resultado mensual conserva las dimensiones requeridas para Liquidación |
| VM-008 | Solo un resultado mensual aprobado puede alimentar Liquidación |
| VM-009 | Los ajustes posteriores al cierre deben recalcular los resultados impactados |

## 23.3 Liquidación

| ID | Regla de negocio |
|---|---|
| LIQ-001 | El origen financiero puede ser el resultado mensual aprobado o el archivo de Real Venta/Recaudo |
| LIQ-002 | Total_Facturado representa Venta en el archivo de Real Venta/Recaudo |
| LIQ-003 | Valor_Neto representa Recaudo en el archivo de Real Venta/Recaudo |
| LIQ-004 | El Presupuesto aplicable debe estar disponible para las variables que lo requieren |
| LIQ-005 | La parrilla define componentes, pesos, fuentes, filtros y curvas |
| LIQ-006 | Grupo Producto determina Unidad de negocio y División según parametrización |
| LIQ-007 | Fecha de ingreso determina desde qué mes participan los hechos acumulables |
| LIQ-008 | No existe prorrateo diario dentro del mes por Fecha de ingreso |
| LIQ-009 | Cumplimiento = Real acumulado / Cuota acumulada cuando aplica |
| LIQ-010 | El Factor de pago se obtiene de la curva correspondiente |
| LIQ-011 | Base de Liquidación = Target acumulado × Peso del componente cuando aplica |
| LIQ-012 | Incentivo acumulado = Base de Liquidación × Factor |
| LIQ-013 | Liquidación total acumulada = suma de incentivos acumulados |
| LIQ-014 | Valor a pagar del mes = Liquidación total acumulada − Pago acumulado anterior |
| LIQ-015 | Los primeros tres meses de Pago Garantizado reconocen el salario variable completo |
| LIQ-016 | Las variables cualitativas aplican la regla definida para el período y parrilla |
| LIQ-017 | Los indicadores Surgical aplican la parametrización y curva correspondientes |
| LIQ-018 | Rentabilidad COGs+ utiliza la información acumulada al cierre del mes |
| LIQ-019 | Solo una Liquidación aprobada puede generar vouchers y contabilización |
| LIQ-020 | Un ajuste que modifique la Liquidación debe actualizar las salidas dependientes |

## 23.4 Ajustes manuales y trazabilidad

| ID | Regla de negocio |
|---|---|
| MAN-001 | Todo ajuste debe conservar valor original y valor modificado |
| MAN-002 | Todo ajuste debe registrar usuario, fecha y motivo |
| MAN-003 | Los ajustes sujetos a aprobación deben registrar el aprobador correspondiente |
| MAN-004 | Cambios de Cluster, Zona, Región, representante, Categoría, SBA o Grupo Producto deben recalcular el alcance afectado |
| MAN-005 | Los ajustes pueden realizarse directamente en la aplicación sobre puntos de datos habilitados |
| MAN-006 | Los ajustes masivos pueden realizarse mediante carga controlada |
| MAN-007 | Un cambio posterior al cierre debe conservar trazabilidad del estado anterior y del resultado vigente |
| MAN-008 | Si un ajuste impacta Voucher o Contabilización, estas salidas deben actualizarse o reversarse según corresponda |

---

# 24. Salidas del sistema

## 24.1 Venta / Recaudo Diario

- Resultado por fecha.
- Archivo descargable.
- Advertencias e incidencias.
- Información aprobada para consolidación mensual.

## 24.2 Venta / Recaudo Mensual

- Resultado mensual oficial.
- Archivo descargable.
- Venta.
- Recaudo.
- DPP cuando aplique.
- Información aprobada para Liquidación.

## 24.3 Liquidación

- Resultado Detallado.
- Resultado Final.
- Incidencias.
- Vouchers.
- Información para contabilización.

---

# 25. Criterios de integridad

El sistema debe asegurar:

1. conservación de valores monetarios durante la distribución diaria;
2. aplicación única de DPP;
3. trazabilidad de los ajustes manuales;
4. utilización de resultados aprobados cuando se encadenan procesos;
5. correspondencia entre Liquidación aprobada, Voucher y Contabilización;
6. conservación del antes y después de cualquier modificación;
7. utilización de las parrillas y parámetros vigentes;
8. explicación del resultado por colaborador, variable y componente;
9. identificación de incidencias de negocio que impidan un cálculo completo.

---

# 26. Glosario

| Concepto | Definición |
|---|---|
| GP | Grupo Producto |
| SBA | Strategic Business Area |
| DPP | Descuento / ajuste aplicado en Venta/Recaudo Mensual |
| Venta Facturada Neta | Venta bruta menos notas de crédito, descuentos financieros y rebates, sin IVA |
| Venta Cobrada Neta | Cobros aplicados a facturas pagadas al 100%, menos notas de crédito, sin IVA |
| Real | Valor logrado para una variable |
| Presupuesto / Cuota | Meta aplicable a la variable |
| Cumplimiento | Relación entre Real y Presupuesto cuando aplica |
| Factor de pago | Factor obtenido de la curva aplicable |
| Target | Valor esperado a recibir al 100% de cumplimiento |
| Target acumulado | Suma del Target correspondiente a los meses aplicables |
| Base de Liquidación | Porción del Target acumulado asignada a un componente |
| Incentivo acumulado | Base de Liquidación multiplicada por el Factor |
| Pago acumulado anterior | Valor ya reconocido en meses anteriores |
| Valor a pagar mes | Liquidación acumulada menos Pago acumulado anterior |
| Parrilla | Definición de variables, pesos, filtros, fuentes y curvas aplicables al colaborador |
| Manualidades | Módulo de ajustes manuales controlados dentro de la aplicación |
| Resultado vigente | Resultado actualmente válido para el período |
| Voucher | Comprobante individual de Liquidación |

---

# 27. Fuentes de referencia

La estructura funcional descrita en este documento se apoya en:

- Política de Incentivos de B. Braun Medical S.A.
- Archivo de Parrillas 2026 enviado por B. Braun.
- Diseños y definiciones funcionales de Venta/Recaudo Diario y Mensual.
- Definiciones de Distribución Comercial y relaciones comerciales.
- Formatos de resultado detallado, resultado final y voucher.
- Requerimientos de ajustes manuales, reprocesos y trazabilidad comunicados por B. Braun.
- Definiciones funcionales revisadas durante las sesiones del proyecto.
