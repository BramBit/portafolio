---
title: "Product Checkout Platform"
slug: "product-checkout-platform"
tagline: "Plataforma de checkout y pagos con arquitectura hexagonal, Railway-Oriented Programming y PostgreSQL nativo."
status: "coming-soon"
problem: "Integrar pasarelas de pago y procesar cobros exige fiabilidad absoluta: evitar cobros duplicados, garantizar consistencia de inventario en tiempo real y gestionar fallos de red sin excepciones descontroladas."
solution: "Plataforma full-stack construida con NestJS y React que implementa un flujo completo de pago con tarjeta, modelado con Arquitectura Hexagonal, transacciones ACID nativas y programación orientada a vías (ROP)."
website: "https://product-checkout-platform-web.vercel.app"
repository: "https://github.com/BramBit/product-checkout-platform"
demo: "https://product-checkout-platform-web.vercel.app"
docs: "https://product-checkout-platform.onrender.com/docs"
featured: true
---

## 1. Problema y Contexto

El procesamiento de pagos en comercio electrónico es una de las áreas más críticas del desarrollo de software. Un fallo de conexión durante una transacción no puede resultar en cobros fantasmas ni en inventarios desincronizados.

Este proyecto fue diseñado para demostrar cómo abordar un flujo completo de checkout con estándares de nivel de producción:
- Catálogo con stock validado en vivo.
- Captura de datos de tarjeta de crédito y dirección de entrega.
- Resumen de compra y procesamiento asíncrono con pasarela de pagos externa en entorno sandbox.
- Descuento atómico de inventario y generación del comprobante transaccional.

---

## 2. Decisiones de Arquitectura

### Arquitectura Hexagonal (Ports and Adapters)
El núcleo de la aplicación está estrictamente desacoplado del framework y de los servicios externos:
- **Dominio:** Define las entidades de negocio (`Order`, `Product`, `Transaction`) y sus reglas de validación independientes.
- **Puertos:** Interfaces tipadas para la persistencia de datos y la pasarela de pagos.
- **Adaptadores:** Implementaciones intercambiables que conectan el dominio con controladores HTTP en NestJS, el cliente nativo de PostgreSQL y el cliente HTTP de la pasarela sandbox.

```text
HTTP Request (NestJS Controller)
           │
           ▼
[ Puerto de Entrada: Use Case ]
           │
           ▼
[ Core de Dominio (Entidades y Reglas de Negocio) ]
           │
           ▼
[ Puerto de Salida: Database / Payment Gateway ]
           │
     ┌─────┴────────────────┐
     ▼                      ▼
Adapter PostgreSQL      Adapter Sandbox Gateway
(Driver pg nativo)      (HTTP Client con reintentos)
```

### Railway-Oriented Programming (ROP)
En lugar de depender de excepciones para el control de flujo, las operaciones de negocio devuelven estructuras `Result<T, E>`. Esto garantiza que los errores (fondos insuficientes, stock agotado, tarjeta rechazada o fallo de red) se traten como caminos alternativos previsibles y tipados en tiempo de compilación.

---

## 3. Implementación y Resiliencia en Pagos

### PostgreSQL Nativo sin ORM
Para garantizar total control sobre el comportamiento transaccional y la concurrencia, la persistencia utiliza el driver nativo `pg` con sentencias SQL parametrizadas:
- **Transacciones ACID explícitas:** Las operaciones críticas (`BEGIN`, `COMMIT`, `ROLLBACK`) envuelven la verificación de inventario y la creación de la orden.
- **Prevención de sobreventa:** Bloqueo a nivel de fila (`SELECT ... FOR UPDATE`) para evitar condiciones de carrera cuando múltiples usuarios intentan comprar la última unidad simultáneamente.
- **Migraciones versionadas:** Control de esquemas mediante `node-pg-migrate`.

### Flujos Asíncronos y Recuperación de Estado
Las transacciones siguen una máquina de estados estricta (`PENDING`, `APPROVED`, `DECLINED`, `ERROR`). Si una llamada a la pasarela entra en timeout, el sistema permite la consulta de conciliación del estado sin duplicar la solicitud de cobro.

---

## 4. Frontend y Experiencia de Usuario

- **React con TypeScript y Vite:** Interfaz reactiva, rápida y ligera construida sin librerías de UI pesadas.
- **Redux Toolkit y Redux Persist:** Gestión de estado predecible para el carrito y el proceso de checkout, persistiendo la sesión de compra ante recargas accidentales.
- **Feedback inmediato:** Validación en tiempo real de formato de tarjeta y formulario de envío.

---

## 5. Estrategia de Pruebas

- **Backend:** Suite de pruebas unitarias sobre casos de uso y lógica de dominio utilizando **Jest**.
- **Frontend:** Pruebas de integración de componentes y flujos de usuario con **Vitest** y **React Testing Library**.

---

## 6. Enlaces y Recursos Verificados

- **Aplicación desplegada (Demo en vivo):** [product-checkout-platform-web.vercel.app](https://product-checkout-platform-web.vercel.app)
- **Repositorio de código:** [github.com/BramBit/product-checkout-platform](https://github.com/BramBit/product-checkout-platform)
- **Documentación interactiva de la API:** [product-checkout-platform.onrender.com/docs](https://product-checkout-platform.onrender.com/docs) *(Swagger UI generado automáticamente)*
