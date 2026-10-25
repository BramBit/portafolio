---
title: "Fundación Maleua — Sitio Institucional"
slug: "maleua"
impactSummary: "Diseñé y construí un sitio institucional estático en Astro con arquitectura de contenido desacoplada para mantenedores no técnicos."
summary: "Desarrollo de un sitio institucional estático con Astro sobre Vercel, con el contenido desacoplado de la presentación para garantizar mantenimiento autónomo y costo cero."
technologies:
  - "Astro"
  - "TypeScript"
  - "Vercel"
company: "Alaska Tech"
role: "Desarrollador"
timeframe: "ene. 2023 – actualidad"
publishedAt: 2026-08-01
---

## Contexto del Producto y Problema

La Fundación Maleua es una organización sin ánimo de lucro orientada a proyectos comunitarios y sociales en la región de Santa Marta. La entidad requería un portal institucional para presentar sus programas, convocatorias y rendición de cuentas a aliados y comunidad.

Las restricciones del proyecto eran claras:
- Tiempos de carga mínimos en redes móviles.
- Cero costo recurrente de infraestructura de servidores o bases de datos.
- Proceso de actualización simple, dado que el equipo que administraría la información posteriormente no contaría con perfil técnico ni conocimientos de desarrollo.

## Rol y Responsabilidad Individual

Como desarrollador en Alaska Tech, asumí la concepción técnica, desarrollo y despliegue del sitio institucional:
- Selección de la arquitectura basada en Generación de Sitios Estáticos (SSG) con Astro.
- Diseño de la estructura de desacoplamiento entre datos y componentes.
- Configuración del flujo de despliegue continuo en Vercel.

## Funcionalidades Implementadas

1. **Generación de Sitio Estático (SSG):** Pre-renderizado completo de las páginas institucionales, garantizando entrega directa desde el borde (*edge*) con tiempos de respuesta instantáneos.
2. **Capa de Contenido Desacoplada:** Toda la información textual, imágenes, datos de contacto y programas sociales se organizaron en archivos de datos estructurados e independientes, separados de los componentes Astro.
3. **Optimización de Rendimiento y Assets:** Carga diferida de imágenes, fuentes del sistema para eliminar bloqueos de renderizado y diseño responsivo sin librerías externas de CSS.

## Retos Técnicos y Decisiones de Arquitectura

- **Mantenibilidad sin CMS pesado:** Montar un CMS tradicional (como WordPress o Strapi) habría introducido costos de hosting, mantenimiento de base de datos y riesgos de seguridad. La solución adoptada fue centralizar el contenido en esquemas de datos planos que pueden ser editados de forma segura sin riesgo de romper los componentes visuales ni la estructura semántica de la web.
- **Despliegues continuos sin fricción:** La integración con Vercel permite que cualquier cambio en los archivos de datos desencadene una compilación y publicación automática en segundos.

## Resultados Verificables

- Portal institucional en producción con costo cero de infraestructura de servidores.
- Calificaciones de rendimiento sobresalientes en Core Web Vitals gracias a la entrega estática sin JavaScript bloqueante.
- Mantenimiento autónomo por parte del personal de la fundación sin requerir intervención de ingeniería para la actualización regular de programas y actividades.
