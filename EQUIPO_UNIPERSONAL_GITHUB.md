# Equipo unipersonal SGCSW + GitHub

Este archivo deja el escenario de demo como si una sola persona cubriera todos los roles del flujo. Todos los usuarios pueden operar sobre el mismo workspace GitHub mediante un unico token compartido.

## Credenciales locales

Password comun para usuarios seed:

```text
Sgcsw2026!
```

Usuarios disponibles:

| Rol operativo | Email |
| --- | --- |
| Administrador | admin@sgcsw.local |
| Solicitante / usuario final | solicitante@sgcsw.local |
| Jefe de proyecto | jefe@sgcsw.local |
| Lider tecnico | lider@sgcsw.local |
| CCB | ccb@sgcsw.local |
| Bibliotecario SCM | bibliotecario@sgcsw.local |
| Desarrollador | dev@sgcsw.local |
| QA / tester | qa@sgcsw.local |

## Token GitHub compartido

Configurar un token unico para todo el workspace:

```env
GITHUB_WORKSPACE_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_WEBHOOK_SECRET=un-secreto-largo
NEXT_PUBLIC_APP_URL=https://tu-dominio-publico
```

El sistema intenta usar `GITHUB_WORKSPACE_TOKEN` primero. Si no existe, usa `GITHUB_TOKEN`. Los tokens cifrados por usuario quedan solo como respaldo de compatibilidad.

Permisos recomendados del token:

```text
repo
admin:repo_hook
workflow
read:user
```

Para fine-grained personal access token, dar acceso al owner/organizacion y permisos de Contents, Pull requests, Issues, Metadata y Webhooks segun aplique.

## Flujo automatico de un solo operador

1. Entrar como `admin@sgcsw.local` y crear/vincular el proyecto con un repositorio GitHub.
2. Entrar como `jefe@sgcsw.local` para aprobar solicitud y crear orden.
3. Entrar como `dev@sgcsw.local`, iniciar implementacion y dejar marcada la opcion de crear rama GitHub.
4. Subir cambios a la rama. Si el webhook esta configurado, GitHub llama a `/api/github/webhook`, SGCSW marca la orden como `READY_FOR_QA` y notifica automaticamente a QA.
5. Alternativa sin webhook: registrar prueba unitaria OK. SGCSW crea/reutiliza PR, marca la orden como lista para QA y notifica al usuario con rol QA.
6. Entrar como `qa@sgcsw.local` para ejecutar pruebas QA, UAT, validacion final y liberacion.

## Endpoint webhook

Ruta interna:

```text
POST /api/github/webhook
```

Evento requerido en GitHub:

```text
push
```

El repositorio debe estar vinculado al proyecto por `githubOwner` y `githubRepo`. La rama del push debe coincidir con `ChangeOrder.gitBranch`.
