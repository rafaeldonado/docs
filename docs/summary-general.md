# Summary Ejecutivo — Manejo General de los Procesos

## Flujo general

La plataforma organiza el proceso de incentivos en tres etapas principales:

```text
VENTA / RECAUDO DIARIO
        ↓
Resultado aprobado por fecha
        ↓
VENTA / RECAUDO MENSUAL
        ↓
Resultado mensual aprobado
        ↓
LIQUIDACIÓN DE INCENTIVOS
        ↓
Resultado aprobado
        ↓
VOUCHERS / CONTABILIZACIÓN
```

Cada etapa recibe información, ejecuta las reglas correspondientes, genera un resultado revisable y permite continuar cuando el resultado ha sido aprobado.

## 1. Inicio del proceso

El usuario selecciona:

- proceso;
- período;
- origen de información cuando exista más de una alternativa.

Los archivos requeridos se presentan separados entre obligatorios y opcionales.

El nombre físico del archivo no determina su función; la aplicación reconoce la fuente según el espacio donde se carga y la configuración de hoja/columnas vigente.

## 2. Procesamiento

El cálculo utiliza, según el proceso:

- archivos cargados;
- maestros;
- relaciones comerciales;
- presupuesto;
- parrillas;
- parámetros;
- reglas de negocio;
- fuentes complementarias.

El procesamiento genera resultados de negocio y advertencias accionables cuando exista información que requiera revisión.

## 3. Revisión

El usuario puede:

- consultar el resultado;
- descargarlo;
- revisar advertencias;
- realizar correcciones autorizadas;
- aprobar o devolver el resultado según el flujo definido.

## 4. Ajustes sobre resultados

La plataforma contempla dos mecanismos:

### Corrección mediante archivo
El usuario descarga el resultado, realiza modificaciones permitidas y carga nuevamente el archivo para validación y aprobación.

### Ajustes y Reasignación de Ventas
El módulo de ajustes permitirá registrar directamente cambios controlados sobre facturas o reglas de asignación sin modificar la información original de SAP.

Podrá soportar:

- distribución porcentual;
- reasignación total o parcial;
- cambio de representante;
- reglas temporales;
- reglas retroactivas;
- ajustes masivos;
- reversión.

Los ajustes incluirán simulación, soportes, aprobación y trazabilidad.

## 5. Retroactividad y reprocesamiento

Una regla aprobada en un mes podrá tener una fecha efectiva anterior.

El sistema podrá reprocesar:

- un mes;
- un rango;
- el año completo;
- facturas seleccionadas;
- todos los períodos desde una fecha efectiva.

Para períodos cerrados o pagados se conservará el resultado original y se generarán diferencias mediante débito, crédito o compensación según corresponda.

## 6. Aprobación y encadenamiento

Un resultado aprobado puede alimentar el proceso siguiente.

```text
Diario aprobado
→ Mensual

Mensual aprobado
→ Liquidación

Liquidación aprobada
→ Voucher / Contabilización
```

Los cambios posteriores deben reflejarse sobre los procesos y salidas impactadas.

## 7. Trazabilidad

La solución registra información suficiente para reconstruir el proceso:

- usuario;
- fecha;
- período;
- archivos;
- parámetros utilizados;
- resultado;
- aprobaciones;
- modificaciones;
- soportes;
- impacto de ajustes.

## 8. Resultado final

El sistema produce:

- resultados diarios;
- resultado mensual oficial;
- resultado detallado de Liquidación;
- resultado final por colaborador;
- vouchers;
- salidas de contabilización cuando corresponda.

El objetivo es que cada valor pueda explicarse desde la fuente y parametrización utilizada hasta el resultado aprobado.
