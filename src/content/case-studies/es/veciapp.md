---
title: "VeciApp — Backend y Plataforma para un Marketplace Local"
slug: "veciapp"
impactSummary: "Diseñé y construí el backend y panel administrativo de un marketplace multirrol utilizado por cerca de 300 comerciantes locales."
summary: "Diseño e implementación del Backend de un marketplace multirrol, incluyendo autenticación, geolocalización con PostGIS, pagos e integraciones externas."
technologies:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "PostgreSQL"
  - "PostGIS"
  - "Redis"
  - "React"
  - "Render"
company: "Alaska Tech"
role: "Co-fundador / Backend & Full Stack"
timeframe: "ene. 2023 – actualidad"
storeLink: "https://play.google.com/store/apps/details?id=com.alaskatech.veciapp"
publishedAt: 2026-08-02
---

## Contexto del Producto y Problema

VeciApp es un marketplace multirrol desarrollado en el contexto de **Alaska Tech** para la Fundación Maleua, concebido para ayudar a pequeños comerciantes locales de la región de Santa Marta a digitalizar sus catálogos y conectarse con consumidores de proximidad.

Según los datos provistos por la plataforma, el sistema atiende a cerca de 300 comerciantes que requerían una herramienta confiable para administrar productos, actualizar inventarios y procesar pedidos sin depender de las comisiones elevadas de grandes aplicaciones de delivery.

## Rol y Responsabilidad Individual

Como co-fundador y responsable técnico del backend en Alaska Tech:
- Diseñé y desarrollé la totalidad de la API REST y el modelo de datos relacional y geoespacial.
- Implementé la arquitectura de autenticación segura multirrol y la integración de la pasarela de pagos.
- Construí el panel de administración web en React para la gestión de tiendas, clientes y métricas operativas.
- Configuré la infraestructura de base de datos y despliegue en Render.

## Funcionalidades Implementadas

1. **Autenticación y Seguridad Multirrol:** Flujos de registro y login con JWT, sesiones protegidas, códigos de verificación de cuenta y control de acceso estricto según rol (comerciante, consumidor o administrador).
2. **Descubrimiento Geoespacial con PostGIS:** Consultas de proximidad geográfica en tiempo real basadas en coordenadas para calcular distancias tienda-cliente y filtrar comercios con cobertura activa.
3. **Flujo de Pagos con Wompi:** Integración del widget oficial de Wompi con webhook seguro para confirmación transaccional y actualización atómica del estado de las órdenes.
4. **Gestión de Medios y Notificaciones:** Subida, compresión y distribución de imágenes de catálogo mediante Cloudinary, y entrega de correos transaccionales automatizados con Resend.
5. **Dashboard Administrativo Web:** Panel en React para la validación de nuevos comercios, administración de catálogos y visualización de indicadores financieros.

## Retos Técnicos y Decisiones de Arquitectura

- **Business Object Pattern vs. Sobreingeniería:** Se eligió deliberadamente el *Business Object Pattern* sobre patrones más densos. Para la escala de un marketplace local y un equipo de ingeniería reducido, este enfoque proporcionó la velocidad de desarrollo necesaria manteniendo la lógica de negocio desacoplada y fácilmente testeable.
- **Direccionamiento en Zonas de Baja Estandarización:** Ante la falta de nomenclatura urbana precisa en sectores informales, las consultas de cobertura se implementaron calculando distancias directas sobre geometrías espaciales en PostGIS mediante índices GiST, evitando fallos de geocodificación textual.

## Resultados Verificables

- Backend operando de manera continua en Render sosteniendo la operativa de los comercios afiliados.
- Cerca de 300 comerciantes locales incorporados a la plataforma según los registros del sistema.
- Aplicación para clientes y comercios publicada y activa en tienda oficial: [Ver VeciApp en Google Play Store](https://play.google.com/store/apps/details?id=com.alaskatech.veciapp).
