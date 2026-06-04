# Manual de usuario SGCSW

Fecha de la simulacion: 2026-06-04  
Proyecto usado en la guia: `MANUAL-001 - Portal SGCSW Manual`  
Cambio usado en la guia: `SC-0001 - Implementar autenticacion MFA con documentacion RUP`

Este manual describe el flujo completo validado con Playwright: creacion del proyecto, seleccion de metodologia y cronograma, configuracion del equipo, solicitud de cambio, analisis, diseno, codigo, documentacion, QA, UAT, integracion, release, cierre y linea base.

## 1. Acceso

URL local usada: `http://localhost:3000`

Todas las cuentas demo usan la misma contrasena:

```text
carlosdaniel
```

| Rol | Correo | Uso en el flujo |
| --- | --- | --- |
| Administrador | `carlosdaniel@gmail.com` | Crea proyectos, usuarios, roles, metodologia, equipo y configuracion inicial. |
| Solicitante | `solicitante@gmail.com` | Crea la solicitud de cambio, acepta UAT y cierra la solicitud liberada. |
| Jefe de proyecto | `jefeproyecto@gmail.com` | Valida la solicitud, evalua impacto, crea ordenes y work items. |
| Lider tecnico | `lidertecnico@gmail.com` | Atiende aprobaciones tecnicas de bajo impacto y apoya analisis/diseno. |
| CCB | `ccb@gmail.com` | Aprueba cambios de alto impacto. |
| Bibliotecario | `bibliotecario@gmail.com` | Administra ECS, versiones, bibliotecas y lineas base. |
| Desarrollador | `desarrollador@gmail.com` | Inicia la orden, sube codigo, documentacion y pruebas unitarias. |
| QA | `qa@gmail.com` | Revisa artefactos, prueba, integra, valida final y ejecuta releases. |
| Sistema de configuracion | `sistemaconfiguracion@gmail.com` | Actor logico para trazabilidad, bloqueos y control de configuracion. |
| Sistema de liberacion | `sistemaliberacion@gmail.com` | Actor logico para liberacion y registros de release. |

Nota: el token de GitHub queda configurado/cifrado en la aplicacion cuando se registra en el perfil o usuario. No debe copiarse en el manual ni en capturas.

## 2. Evidencia Playwright

Las capturas quedaron en `output/playwright/`:

| Paso | Captura |
| --- | --- |
| Admin: dashboard | `output/playwright/01-admin-dashboard.png` |
| Admin: usuarios, roles y proyecto | `output/playwright/02-admin-usuarios-roles-proyecto.png` |
| Metodologia RUP y cronograma | `output/playwright/03-metodologia-rup-cronograma.png` |
| Actividades del cronograma | `output/playwright/04-cronograma-actividades.png` |
| Solicitante: solicitud creada | `output/playwright/05-solicitante-solicitud-cambio.png` |
| Jefe: impacto alto | `output/playwright/06-jefe-impacto-alto.png` |
| CCB: aprobacion | `output/playwright/07-ccb-aprobacion.png` |
| Jefe: orden de cambio | `output/playwright/08-jefe-orden-cambio.png` |
| Jefe: backlog y matriz documental | `output/playwright/09-jefe-backlog-matriz-artefactos.png` |
| Desarrollador: inicio de orden | `output/playwright/10-desarrollador-inicia-orden.png` |
| Desarrollador: versiones ECS | `output/playwright/11-desarrollador-versiones-ecs.png` |
| Desarrollador: prueba unitaria | `output/playwright/12-desarrollador-prueba-unitaria.png` |
| QA: matriz aprobada | `output/playwright/13-qa-matriz-aprobada.png` |
| QA: prueba aprobada | `output/playwright/14-qa-prueba-aprobada.png` |
| Solicitante: UAT aceptado | `output/playwright/15-solicitante-uat-aceptado.png` |
| QA: integracion | `output/playwright/16-qa-integracion.png` |
| QA: validacion final y release aprobado | `output/playwright/17-qa-validacion-final-release.png` |
| QA: release ejecutado | `output/playwright/18-qa-release-ejecutado.png` |
| Solicitante: cierre | `output/playwright/19-solicitante-cierre-solicitud.png` |
| Bibliotecario: linea base | `output/playwright/20-bibliotecario-linea-base.png` |
| Lider tecnico: bandeja tecnica | `output/playwright/21-lider-tecnico-aprobacion.png` |

## 3. Flujo resumido

1. Administrador crea el proyecto y asigna el equipo.
2. Administrador o jefe configura metodologia, cronograma, plantilla y elementos de configuracion esperados.
3. Solicitante registra la solicitud de cambio.
4. Jefe valida alineacion y clasifica impacto.
5. CCB aprueba si el impacto es alto. Lider tecnico aprueba si el impacto es bajo.
6. Jefe crea orden de cambio y work item.
7. Al crearse el primer work item, la configuracion del proyecto queda bloqueada.
8. Desarrollador inicia la orden y sube codigo y documentacion versionada.
9. QA revisa la matriz documental exigida por la metodologia.
10. Desarrollador registra pruebas unitarias.
11. QA ejecuta pruebas funcionales.
12. Solicitante acepta UAT.
13. QA registra integracion y validacion final.
14. QA ejecuta o registra release.
15. Solicitante cierra y archiva la solicitud.
16. Bibliotecario congela la linea base con las versiones exactas.

## 4. Administrador: crear y preparar el proyecto

1. Iniciar sesion con `carlosdaniel@gmail.com`.
2. Entrar al contexto global de administrador.
3. Crear o verificar usuarios de todos los roles.
4. Crear el proyecto `MANUAL-001 - Portal SGCSW Manual`.
5. Vincular, si aplica, propietario y repositorio GitHub. En la simulacion se uso una referencia de repositorio demo y no se creo tag remoto.
6. Asignar responsables del proyecto antes de iniciar el trabajo:
   - Solicitante: `solicitante@gmail.com`
   - Jefe de proyecto: `jefeproyecto@gmail.com`
   - Lider tecnico: `lidertecnico@gmail.com`
   - CCB: `ccb@gmail.com`
   - Bibliotecario: `bibliotecario@gmail.com`
   - Desarrollador: `desarrollador@gmail.com`
   - QA: `qa@gmail.com`
7. Configurar la metodologia `RUP`.
8. Configurar cronograma por fases:
   - Inicio
   - Elaboracion
   - Construccion
   - Transicion
9. Configurar actividades principales:
   - Levantamiento y validacion de requerimientos
   - Modelado de analisis y diseno
   - Implementacion y versionamiento
   - QA, UAT, linea base y liberacion
10. Guardar la configuracion como plantilla si se desea reutilizar en otro proyecto.

Regla importante: el proyecto puede modificarse mientras no exista ningun work item/tarea. Cuando se crea el primer work item (`WI-0001` en esta guia), la configuracion inicial queda bloqueada por trazabilidad.

## 5. Solicitud de cambio: solicitante

1. Iniciar sesion con `solicitante@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir a `Cambios > Solicitudes`.
4. Registrar la solicitud:
   - Titulo: `Implementar autenticacion MFA con documentacion RUP`
   - Prioridad: `Alta`
   - Tipo esperado: preventivo/evolutivo segun clasificacion del equipo
   - Descripcion: explicar el objetivo funcional.
   - Justificacion: explicar valor, riesgo o necesidad.
5. Guardar. El sistema genera `SC-0001`.

Despues de guardar, la solicitud queda disponible para validacion del jefe de proyecto.

## 6. Validacion y clasificacion: jefe de proyecto

1. Iniciar sesion con `jefeproyecto@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir a `Cambios > Solicitudes`.
4. Revisar `SC-0001`.
5. Validar alineacion:
   - Si esta alineada, marcar `Alineada`.
   - Si no esta alineada, marcar `No alineada` e indicar motivo.
   - Si el formato esta incompleto, usar `Observar` para devolverla al solicitante.
6. Crear la evaluacion de impacto:
   - Impacto: `Alto`
   - Motivo: cambios en autenticacion, seguridad y documentacion obligatoria.
7. En cambios de alto impacto, enviar a CCB.

Si el impacto es bajo, el flujo puede ir por aprobacion tecnica del lider tecnico en vez de CCB.

## 7. Aprobacion: CCB y lider tecnico

Para alto impacto:

1. Iniciar sesion con `ccb@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir a la bandeja de CCB.
4. Revisar impacto, alcance, riesgos y trazabilidad.
5. Aprobar `SC-0001`.

Para bajo impacto:

1. Iniciar sesion con `lidertecnico@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir a `Cambios > Aprobacion tecnica`.
4. Aprobar o rechazar la solicitud de aprobacion rapida.

En esta simulacion `SC-0001` fue de alto impacto, por eso la bandeja del lider tecnico queda sin pendientes. La captura `21-lider-tecnico-aprobacion.png` evidencia esa ruta.

## 8. Orden de cambio y work item: jefe de proyecto

1. Volver como `jefeproyecto@gmail.com`.
2. Crear la orden de cambio:
   - Codigo generado: `OC-0001`
   - Solicitud origen: `SC-0001`
   - Responsable: `desarrollador@gmail.com`
3. Crear el work item:
   - Codigo generado: `WI-0001`
   - Solicitud: `SC-0001`
   - Orden: `OC-0001`
   - Rama: `feature/wi-0001-mfa-login`
4. Confirmar que se genera la matriz de artefactos segun metodologia RUP.

Desde este momento el proyecto ya no debe cambiar su configuracion inicial, porque existe trabajo real trazable.

## 9. Desarrollo: codigo y documentacion versionada

1. Iniciar sesion con `desarrollador@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir a la orden `OC-0001`.
4. Iniciar la orden.
5. Subir cada artefacto como ECS y versionarlo.

Artefactos de analisis usados en la simulacion:

| Codigo ECS | Version | Archivo demo |
| --- | --- | --- |
| `MFA-AN-ENT-001` | `1.0.0` | `tmp/manual-artifacts/entrevista-interesado-v1.0.0.md` |
| `MFA-AN-SRS-001` | `1.0.0` | `tmp/manual-artifacts/srs-mfa-v1.0.0.md` |
| `MFA-AN-CU-001` | `1.0.0` | `tmp/manual-artifacts/casos-uso-mfa-v1.0.0.md` |

Artefactos de diseno usados:

| Codigo ECS | Version | Archivo demo |
| --- | --- | --- |
| `MFA-DI-SAD-001` | `1.0.0` | `tmp/manual-artifacts/sad-mfa-v1.0.0.md` |
| `MFA-DI-CLS-001` | `1.0.0` | `tmp/manual-artifacts/diagrama-clases-mfa-v1.0.0.md` |
| `MFA-DI-SEQ-001` | `1.0.0` | `tmp/manual-artifacts/diagrama-secuencia-mfa-v1.0.0.md` |

Artefactos de codigo y pruebas usados:

| Codigo ECS | Version | Archivo demo |
| --- | --- | --- |
| `MFA-CO-AUTH-001` | `1.0.0` | `tmp/manual-artifacts/auth-mfa-service-v1.0.0.ts` |
| `MFA-QA-UNIT-001` | `1.0.0` | `tmp/manual-artifacts/pruebas-unitarias-mfa-v1.0.0.md` |

Reglas al subir una version:

1. Usar SemVer: `1.0.0`, `1.1.0`, `1.1.1`, etc.
2. Asociar la version al work item `WI-0001`.
3. Asociar la version a la solicitud `SC-0001`.
4. Asociar la version a la orden `OC-0001`.
5. Asociar la version al requisito documental correspondiente.
6. Registrar comentario claro sobre el cambio.
7. Si se crea PR o tag GitHub, usar el token cifrado en la cuenta; no escribirlo en campos visibles ni en manuales.

La idea del sistema es que codigo y documentacion avancen juntos: si se implementa una funcionalidad, tambien se suben los casos de uso, diagramas, especificaciones o artefactos que exija la metodologia configurada.

## 10. QA documental

1. Iniciar sesion con `qa@gmail.com`.
2. Entrar a `MANUAL-001`.
3. Ir al backlog o matriz de artefactos.
4. Revisar cada requisito documental de `WI-0001`.
5. Aprobar cada artefacto correcto.
6. Rechazar el artefacto si no corresponde, no esta versionado o no cubre el alcance.
7. Marcar como exceptuado solo lo que realmente no aplica. En la simulacion el modelo de datos quedo `WAIVED` porque MFA no modifico esquema de datos.

El sistema bloquea el avance de QA si hay artefactos obligatorios sin version aprobada.

Resultado validado:

```text
8 requisitos documentales QA_APPROVED
1 requisito WAIVED
```

## 11. Pruebas unitarias y QA funcional

Desarrollador:

1. Registrar prueba unitaria para `OC-0001`.
2. Asociarla a la version `MFA-QA-UNIT-001 v1.0.0`.
3. Marcar resultado satisfactorio si corresponde.

QA:

1. Ir a `QA > Pruebas`.
2. Seleccionar `OC-0001`.
3. Ejecutar o registrar prueba funcional.
4. Si falla, crear defecto y devolver a desarrollo.
5. Si pasa, marcar `PASSED`.

Resultado de la simulacion: QA paso y la orden avanzo a UAT.

## 12. UAT: solicitante

1. Iniciar sesion con `solicitante@gmail.com`.
2. Ir a `QA > UAT`.
3. Seleccionar `OC-0001`.
4. Revisar la funcionalidad y la documentacion entregada.
5. Aceptar UAT.
6. Subir acta:
   - `tmp/manual-artifacts/acta-uat-mfa-v1.0.0.md`

Si UAT observa el cambio, la orden vuelve al equipo para correccion.

## 13. Integracion y validacion final: QA

1. Iniciar sesion con `qa@gmail.com`.
2. Ir a `QA > Validacion final`.
3. Registrar integracion:
   - Orden: `OC-0001`
   - SemVer: `1.1.0`
   - Rama destino: `main`
   - Commit merge: `merge-mfa-1-1-0`
4. Registrar criterios finales:
   - Orden integrada: `OC-0001`
   - Resultado: `Todo correcto`
   - SemVer: `1.1.0`
   - Ambiente: `produccion`
   - Observaciones: indicar que codigo, documentacion, pruebas y UAT quedan trazados.
5. Guardar. El sistema crea el release aprobado `1.1.0`.

## 14. Release: QA o gestor de liberacion

1. Ir a `Liberacion > Releases`.
2. Verificar release `1.1.0` en estado `Aprobada`.
3. Registrar ejecucion:
   - Resultado: `Release 1.1.0 ejecutado en produccion...`
4. Si se desea tag remoto, marcar `Crear tag GitHub`.
5. En esta simulacion se dejo desmarcado para no hacer llamada externa.
6. Guardar.

Resultado validado:

```text
Release 1.1.0 = EXECUTED
Ambiente = produccion
```

## 15. Cierre y archivo: solicitante

1. Iniciar sesion con `solicitante@gmail.com`.
2. Ir a `Cambios > Solicitudes`.
3. Verificar que `SC-0001` este en estado `Liberada`.
4. Usar `Cerrar y archivar`.
5. El sistema crea un archivo de cierre y actualiza la solicitud a `Cerrada`.

Resultado validado:

```text
SC-0001 = CLOSED
```

## 16. Linea base: bibliotecario

1. Iniciar sesion con `bibliotecario@gmail.com`.
2. Ir a `Configuracion > Lineas base`.
3. Crear linea base:
   - Codigo: `LB-MFA-1.0.0`
   - Nombre: `Linea base MFA documentacion y codigo`
   - Hito: `Release 1.1.0`
   - Descripcion: `Congela las versiones aprobadas por QA de analisis, diseno, codigo y pruebas del work item WI-0001.`
4. Seleccionar las ocho versiones exactas `v1.0.0`.
5. Guardar con `Congelar linea base`.

Resultado validado:

```text
LB-MFA-1.0.0 = FROZEN
ECS incluidos = 8
```

## 17. Versionado y trazabilidad

Cada cambio de codigo o documentacion debe generar una nueva version. Reglas recomendadas:

| Cambio | Ejemplo |
| --- | --- |
| Primera entrega aprobable | `1.0.0` |
| Nueva funcionalidad compatible | `1.1.0` |
| Correccion menor o ajuste documental | `1.1.1` |
| Cambio incompatible o redisenio mayor | `2.0.0` |

Cada version debe tener:

1. ECS.
2. Version SemVer.
3. Archivo o referencia.
4. Hash SHA-256.
5. Usuario que sube.
6. Work item.
7. Solicitud de cambio.
8. Orden de cambio.
9. Requisito documental, si aplica.
10. Estado QA.

Esto permite responder preguntas como:

1. Que codigo implemento `SC-0001`.
2. Que casos de uso justifican ese codigo.
3. Que diagramas de diseno se usaron.
4. Que pruebas lo validaron.
5. Que release lo llevo a produccion.
6. Que linea base congelo la entrega.

## 18. Rutas alternativas y errores esperados

Solicitud incompleta:

1. Jefe usa `Observar`.
2. Solicitante corrige campos faltantes.
3. Jefe vuelve a validar.

Solicitud no alineada:

1. Jefe marca `No alineada`.
2. Debe registrar motivo.
3. La solicitud no avanza a aprobacion.

Cambio de bajo impacto:

1. Jefe clasifica bajo impacto.
2. Lider tecnico revisa en `Aprobacion tecnica`.
3. Si aprueba, jefe puede crear orden sin pasar por CCB.

QA documental rechaza:

1. QA rechaza el artefacto.
2. Desarrollador sube nueva version, por ejemplo `1.0.1`.
3. QA reevalua esa version.

QA funcional falla:

1. QA crea defecto.
2. La orden vuelve a desarrollo.
3. Desarrollador corrige codigo y documentacion relacionada.
4. Se sube nueva version.

UAT observado:

1. Solicitante observa.
2. Jefe/desarrollador atienden observaciones.
3. QA revalida si aplica.
4. Solicitante vuelve a aceptar.

Release con GitHub:

1. Solo marcar `Crear tag GitHub` cuando el token este configurado y el commit exista.
2. Si el tag remoto falla, registrar la liberacion interna sin exponer secretos y corregir el repositorio despues.

## 19. Estado final de la simulacion

La verificacion final en base de datos dio:

```json
{
  "change": { "ticketId": "SC-0001", "status": "CLOSED" },
  "order": { "code": "OC-0001", "status": "INTEGRATED" },
  "release": { "semver": "1.1.0", "status": "EXECUTED", "environment": "produccion" },
  "baseline": { "code": "LB-MFA-1.0.0", "status": "FROZEN", "items": 8 },
  "artifactRequirementStatus": [
    { "status": "QA_APPROVED", "count": 8 },
    { "status": "WAIVED", "count": 1 }
  ],
  "versions": 8
}
```

Con esto queda completo el flujo de extremo a extremo: analisis, diseno, codigo, documentacion, QA, UAT, integracion, release, cierre y linea base.
