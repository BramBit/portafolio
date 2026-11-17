---
title: "Product Checkout Platform"
slug: "product-checkout-platform"
tagline: "Plataforma de checkout y pagos con arquitectura hexagonal, Railway-Oriented Programming y PostgreSQL nativo."
status: "sandbox-demo"
capabilities: ["React + NestJS", "Pagos sandbox", "PostgreSQL"]
problem: "Un checkout necesita conectar selección de productos, tokenización de tarjeta, estado del pago y actualización de inventario entre interfaz, API y pasarela."
solution: "Checkout demostrativo con React y NestJS, persistencia PostgreSQL, pagos sandbox, puertos y adaptadores y valores Result tipados."
website: "https://product-checkout-platform-web.vercel.app"
repository: "https://github.com/BramBit/product-checkout-platform"
demo: "https://product-checkout-platform-web.vercel.app"
docs: "https://product-checkout-platform.onrender.com/docs"
featured: true
---

## Problema y alcance

Este proyecto demostrativo conecta un checkout React con una API NestJS y una pasarela de pagos externa en modo sandbox. Incluye selección de productos, información de entrega, tokenización de tarjeta desde el navegador, creación de transacciones y consulta de estados de pago.

La demo utiliza pagos sandbox. Es un proyecto técnico con pruebas automatizadas, no una plataforma de pagos validada para operación comercial.

## Arquitectura y decisiones

El código se organiza mediante entidades de dominio, casos de uso, puertos y adaptadores. NestJS proporciona inyección de dependencias y controladores HTTP; los casos de uso se integran con NestJS y su servicio de configuración. La persistencia PostgreSQL utiliza el driver nativo `pg` y consultas parametrizadas.

```text
Checkout React / Tokenización en navegador
                  │
                  ▼
       Controladores HTTP NestJS
                  │
                  ▼
 Casos de uso / Result / Reglas de dominio
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
Adaptador PostgreSQL  Adaptador pasarela sandbox
(driver pg nativo)    (Peticiones HTTP)
```

Los casos de uso devuelven valores `Result` para errores de negocio modelados, como inventario insuficiente y fallos de pasarela. Esto hace explícitos esos resultados para quien los consume.

## Flujo de pago e inventario

La API consulta el producto y el inventario disponible, crea una transacción pendiente y envía la solicitud de pago tokenizada a la pasarela sandbox. Otro caso de uso consulta el estado cuando existe una referencia de la pasarela y actualiza el inventario cuando un pago pendiente pasa a aprobado.

Estas lecturas y escrituras son operaciones separadas. La coordinación del inventario y el estado del pago ante peticiones concurrentes, y la recuperación de resultados inciertos tras un timeout, son áreas de mejora pendientes.

Los cambios de esquema utilizan migraciones versionadas con `node-pg-migrate`.

## Frontend

React, TypeScript y Vite proporcionan la interfaz. Redux Toolkit y Redux Persist gestionan el estado del checkout entre recargas. Los formularios muestran feedback de tarjeta y entrega, y la tokenización de tarjeta se realiza desde el navegador antes de crear la transacción.

## Pruebas automatizadas

Las pruebas Jest cubren reglas de dominio y casos de uso. Vitest y React Testing Library cubren componentes y flujos de usuario del frontend. Estas pruebas verifican comportamientos específicos; no establecen garantías de pagos en producción.

## Demo y código

- [Demo sandbox](https://product-checkout-platform-web.vercel.app)
- [Repositorio de código](https://github.com/BramBit/product-checkout-platform)
- [Documentación de la API](https://product-checkout-platform.onrender.com/docs)
