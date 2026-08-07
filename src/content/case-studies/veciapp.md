---
title: "Multi-Role Regional E-Commerce Marketplace & Geo-Services Backend"
slug: "veciapp"
summary: "Full-stack marketplace architecture powering regional commerce digital enablement with spatial PostGIS querying, Wompi payment gateway integration, and JWT authentication."
problem: "Small regional merchants and micro-entrepreneurs lacked affordable technological infrastructure to digitize business operations, inventory, order processing, and payment reception within a centralized local marketplace."
solution: "Designed and implemented the complete RESTful backend and administrative portal modules using a Business Object Pattern, integrating spatial merchant discovery via PostGIS, Cloudinary media storage, Wompi payments, and transaction emails via Resend."
architecture: "Business Object Pattern establishing a clean, maintainable, lightweight architecture. Built with Node.js, Express, TypeScript, TypeORM, Redis, and PostgreSQL with PostGIS extension. Deployed on Render."
implementation: "Full backend design, database modeling, JWT authentication and session management with verification codes, geospatial queries for nearby merchants, Cloudinary image asset handling, Wompi payment widget integration, Resend transactional email services, and admin dashboard panels in React with TanStack Query."
challenges: "Executing efficient spatial bounding queries for local store coverage, managing multi-role store and product states, and maintaining a straightforward maintainable codebase tailored for rapid product evolution."
results: "Successfully enabled regional merchants to digitize product catalogs and accept digital payments, provided centralized store management, and established scalable backend APIs deployed on Render."
technologies:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "PostgreSQL"
  - "PostGIS"
  - "TypeORM"
  - "Redis"
  - "React"
  - "Cloudinary"
  - "Wompi"
  - "Resend"
publishedAt: 2023-06-15
---

## Problema

Los pequeños comerciantes y emprendedores locales en la región de Santa Marta carecían de herramientas tecnológicas propias para digitalizar la operación de sus negocios, publicar sus catálogos de productos, gestionar órdenes de pedido y recibir pagos en línea dentro de un mercado unificado.

La solución requería proveer una infraestructura tecnológica multirrol (comerciantes, consumidores y administradores) accesible, mantenible y de rápida evolución, que soportara la búsqueda de comercios según su ubicación geográfica sin generar altos costos operacionales.

## Solución

Se diseñó e implementó la totalidad del Backend y módulos clave del panel administrativo para la plataforma marketplace:

- **Infraestructura Backend RESTful:** Modelado completo de entidades, usuarios, comercios, catálogo de productos, órdenes de compra y ciclo de vida de pedidos.
- **Sistema de Autenticación Seguro:** Implementación de autenticación basada en JSON Web Tokens (JWT), registro de usuarios, verificación mediante códigos y protección de rutas.
- **Búsqueda Geoespacial con PostGIS:** Consultas de ubicación geográfica sobre comercios registrados para determinar cobertura y cercanía con el consumidor.
- **Gestión Multimedia y Pagos:** Integración con Cloudinary para la administración de imágenes y con Wompi para el procesamiento de transacciones financieras mediante widget oficial.
- **Comunicaciones Transaccionales:** Envío automático de notificaciones por correo electrónico asociadas al flujo de pedidos utilizando Resend.

## Arquitectura

Para este producto se aplicó el patrón **Business Object Pattern**, estructurando una arquitectura ligera y desacoplada priorizando la simplicidad, claridad y facilidad de mantenimiento según la escala del proyecto.

- **Lenguaje & Core:** Node.js y Express con TypeScript en modo estricto.
- **Base de Datos & ORM:** PostgreSQL gestionado a través de TypeORM, incorporando la extensión `PostGIS` para operaciones geoespaciales.
- **Caché:** Redis para optimización de sesiones y datos de acceso frecuente.
- **Infraestructura:** Despliegue de servicios Backend alojados en Render.

## Implementación

### Backend
- **Diseño de APIs REST:** Construcción end-to-end de controladores, servicios y validación de datos para la gestión comercial.
- **Autenticación:** Flujo de sesiones JWT con renovación, hash de contraseñas y validaciones transaccionales.
- **Geo-consultas:** Mapeo de coordenadas geoespaciales para la localización eficiente de establecimientos.
- **Integraciones:** Conexión con proveedores externos para activos multimedia (Cloudinary), pagos (Wompi) y correos transaccionales (Resend).

### Frontend Administrativo
- **Módulos de Gestión:** Desarrollo de interfaces administrativas en React con TypeScript y TanStack Query para la gestión de tiendas, productos, clientes y paneles de control con indicadores financieros.

## Retos

- **Modelado de Consultas Geoespaciales:** Optimizar las consultas de localización de tiendas con PostGIS para responder eficientemente ante la búsqueda de cobertura local.
- **Flujo de Integración de Pagos:** Garantizar la correcta reconciliación del estado de las órdenes en el backend tras el procesamiento del widget de pagos Wompi.
- **Consistencia Multi-rol:** Mantener el aislamiento y control de permisos entre administradores de plataforma, dueños de tiendas y consumidores.

## Resultado

- Desplegada la plataforma Backend completa en Render, permitiendo la incorporación fluida de pequeños comerciantes al ecosistema digital.
- Operación unificada de catálogos, pedidos y procesamiento de pagos en línea.
- Módulos administrativos operativos permitiendo el control centralizado de métricas e indicadores de comercio.
