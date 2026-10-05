# Summary Ejecutivo — Procesos de Incentivos

## Venta / Recaudo Diario

**Objetivo:** transformar los movimientos diarios de Venta y Recaudo en una base enriquecida con la asignación comercial correspondiente.

**Entradas principales**
- Venta.
- Recaudo.
- Asignación de Ortopedia, cuando aplique.

**Proceso**
- Valida Cliente, Grupo Producto y SBA.
- Obtiene Canal y destino comercial.
- Aplica Distribución Comercial por Cliente + Grupo Producto + SBA.
- Si no existe distribución específica, conserva el 100% en el destino base del cliente.
- Resuelve representante según Cluster, Zona, Canal, GP y SBA.
- Utiliza asignación documental / Ortopedia cuando corresponde.
- Mantiene conservación exacta de los valores monetarios.

**Resultado**
- Resultado por fecha.
- Información de Cliente, Material, GP, SBA, Cluster, Zona, Canal y representante.
- Venta y Recaudo distribuidos.
- Advertencias accionables.
- Resultado revisable y aprobable.

---

## Venta / Recaudo Mensual

**Objetivo:** obtener la base mensual oficial de Venta/Recaudo que alimenta Liquidación.

**Orígenes**
1. Resultados diarios aprobados.
2. Archivos mensuales.

**Entradas por archivo**
- Venta mensual.
- Recaudo mensual.
- DPP opcional.

**Proceso**
- Consolida Venta y Recaudo del período.
- Aplica el tratamiento mensual de facturas compensadas.
- Incorpora DPP cuando corresponda.
- Normaliza signos según la naturaleza financiera.
- Conserva las dimensiones necesarias para Liquidación: GP, SBA, Unidad, División, Cluster, Zona y Canal.
- Permite ajustes controlados sobre registros o asignaciones que requieran corrección.

**Resultado**
- Venta.
- Recaudo.
- DPP.
- Resultado mensual descargable.
- Resultado mensual revisable y aprobable.
- Base aprobada disponible para Liquidación.

---

## Liquidación de Incentivos

**Objetivo:** determinar el incentivo de cada colaborador según su parrilla, resultados comerciales y parámetros aplicables.

**Origen financiero**
1. Resultado mensual aprobado.
2. Archivo de Real Venta/Recaudo.

En el archivo de Real Venta/Recaudo:

```text
Total_Facturado → Venta
Valor_Neto      → Recaudo
```

**Información utilizada**
- Presupuesto.
- Parrilla 2026.
- Venta/Recaudo.
- GP, SBA, Unidad, División, Cluster y Zona.
- Salario variable.
- Fecha de ingreso.
- Curvas de pago.
- Rentabilidad.
- Variables cualitativas.
- Calidad e indicadores Surgical.
- Venta Otras Compañías.
- Venta/Recaudo KAMS cuando aplique.
- Tasas y parámetros definidos por la parrilla.

**Fórmulas principales**

```text
Base de Liquidación
=
Target acumulado × Peso
```

```text
Cumplimiento
=
Real acumulado / Cuota acumulada
```

```text
Factor
=
Curva de pago(Cumplimiento)
```

```text
Incentivo acumulado
=
Base de Liquidación × Factor
```

```text
Valor a pagar del mes
=
Liquidación total acumulada
− Pago acumulado anterior
```

**Reglas especiales**
- Fecha de ingreso define desde qué mes participan los hechos acumulables.
- No existe prorrateo diario dentro del mes.
- Pago Garantizado: primeros tres meses calendario con salario variable completo.
- Variables cualitativas e indicadores Surgical aplican sus reglas y curvas correspondientes.
- Rentabilidad COGs+ se considera acumulada al cierre del mes.

**Resultado**
- Resultado Detallado por colaborador, variable y componente.
- Resultado Final por colaborador.
- Incidencias.
- Aprobación.
- Vouchers.
- Información para contabilización.

---

## Ajustes y Reasignación de Ventas

Como capacidad transversal, la plataforma permitirá registrar ajustes sin modificar el dato original de SAP.

Podrá incluir:

- distribución porcentual;
- reasignación de factura;
- cambio de representante;
- reglas temporales;
- reglas retroactivas;
- ajustes masivos;
- reversión.

Antes de aplicar un reproceso retroactivo se realizará una simulación del impacto. Para meses cerrados o pagados se conservará el resultado original y se generarán diferencias para su compensación.
