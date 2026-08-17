---
title: "VeciApp — Backend para un Marketplace Local"
slug: "veciapp"
impactSummary: "Diseñé y construí el backend de un marketplace multirrol que conecta comerciantes locales con sus clientes."
summary: "Diseño e implementación del Backend de un marketplace multirrol, incluyendo autenticación, geolocalización, pagos e integraciones externas."
technologies:
  - "Node.js"
  - "TypeScript"
  - "PostgreSQL"
  - "PostGIS"
  - "Redis"
company: "Alaska Tech"
role: "Co-fundador / Backend"
timeframe: "ene. 2023 – actualidad"
publishedAt: 2026-08-02
---

## Problema

VeciApp es un marketplace multirrol construido para la Fundación Maleua, orientado a ayudar a pequeños comerciantes locales de la región de Santa Marta a digitalizar sus negocios — comerciantes que normalmente no cuentan con recursos para desarrollar tecnología propia. Debía permitir que los comerciantes administraran su negocio, publicaran productos y recibieran pedidos, mientras los consumidores accedían a un marketplace centralizado, y todo esto tenía que construirse y lanzarse con un equipo pequeño, de cero.

## Solución

Diseñé y construí todo el backend de VeciApp, además de módulos específicos del frontend administrativo. Eso incluyó el modelo de datos completo para usuarios, comercios, productos, pedidos y las relaciones entre ellos, un sistema de autenticación completo basado en JWT con verificación de cuentas, funcionalidades geoespaciales para descubrimiento de comercios por ubicación, gestión de medios mediante Cloudinary, procesamiento de pagos mediante el widget de Wompi, correos transaccionales mediante Resend, y despliegue en Render. En el frontend construí los módulos de administración de tiendas, clientes y productos, y el dashboard principal con indicadores financieros.

## Arquitectura

El backend usa Node.js, TypeScript, Express, PostgreSQL con PostGIS, TypeORM y Redis, siguiendo el Business Object Pattern — una arquitectura ligera elegida deliberadamente para un proyecto de este tamaño, priorizando simplicidad y facilidad de mantenimiento por encima de los patrones más pesados usados en plataformas más grandes.

## Implementación

La autenticación cubre login basado en JWT, registro de usuarios, verificación de cuenta mediante códigos, gestión de sesiones y protección de rutas. PostGIS potencia las consultas geográficas sobre comercios registrados, dando soporte a funcionalidades de ubicación y cobertura. Cloudinary maneja la carga de imágenes, su organización y la persistencia de referencias, consumido tanto desde el frontend administrativo como desde la app móvil del equipo. Los pagos corren sobre el widget oficial de Wompi, y Resend maneja los correos transaccionales durante todo el ciclo de vida de la aplicación.

## Retos

Construir un marketplace de punta a punta con un equipo pequeño implicó elegir una arquitectura acorde al tamaño real del proyecto en vez de sobre-diseñarlo — el Business Object Pattern fue una decisión deliberada priorizando mantenibilidad y velocidad por encima de los patrones más elaborados usados en proyectos más grandes como los de Belvi. Las funcionalidades geoespaciales y el acceso multirrol (comerciantes, consumidores, administradores) tenían que funcionar bien desde el primer día, porque el valor central del marketplace depende de que los comerciantes se puedan encontrar por ubicación.

## Resultado

Hoy el backend de VeciApp sostiene toda la operación comercial de la plataforma —gestión de usuarios y comercios, catálogos de productos, pedidos, pagos y descubrimiento por ubicación— con un frontend administrativo que el equipo de la Fundación Maleua usa para gestionar tiendas, clientes y desempeño financiero.
