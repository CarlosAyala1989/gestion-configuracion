# SAD MFA v1.0.0

Componentes afectados:
- Modulo de autenticacion.
- Servicio de segundo factor.
- Auditoria de sesiones.

Decision de arquitectura:
La validacion MFA se ejecuta despues de la contrasena y antes de emitir la cookie de sesion.

Riesgos:
- Bloqueo de usuarios sin segundo factor.
- Regresion en login y seleccion de proyecto.
