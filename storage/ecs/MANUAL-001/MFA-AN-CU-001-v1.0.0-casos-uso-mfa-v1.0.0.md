# Casos de uso afectados v1.0.0

CU-LOGIN-001: Iniciar sesion.

Flujo principal:
1. El usuario ingresa correo y contrasena.
2. El sistema valida credenciales.
3. El sistema solicita segundo factor.
4. El usuario ingresa el codigo.
5. El sistema crea la sesion y registra auditoria.

Flujos alternos:
- Codigo vencido.
- Codigo incorrecto.
- Usuario sin segundo factor configurado.
