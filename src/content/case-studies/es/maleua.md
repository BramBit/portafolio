---
title: "Fundación Maleua — Sitio Institucional"
slug: "maleua"
impactSummary: "Construí un sitio institucional estático con una estructura de contenido diseñada para facilitar su mantenimiento."
summary: "Desarrollo de un sitio institucional estático con Astro, con el contenido desacoplado de la presentación para simplificar su mantenimiento."
technologies:
  - "Astro"
  - "Vercel"
company: "Alaska Tech"
role: "Desarrollador"
timeframe: "ene. 2023 – actualidad"
publishedAt: 2026-08-01
---

## Problema

La Fundación Maleua necesitaba un sitio institucional para presentar la organización, sus programas y sus servicios a la comunidad — con tiempos de carga reducidos, bajo costo de mantenimiento y un proceso de despliegue simple, porque el equipo que lo mantendría después no serían desarrolladores.

## Solución

Construí el sitio como un sitio estático con Astro, desplegado en Vercel, con el contenido totalmente desacoplado de la capa de presentación.

## Arquitectura

Static Site Generation sobre Astro, con todo el copy, las imágenes y la configuración centralizados en archivos de datos en vez de incrustados en los componentes.

## Implementación

Estructurar el contenido así significa que actualizar textos, imágenes o configuraciones no requiere tocar directamente los componentes de la interfaz — alguien puede actualizar un archivo de datos sin saber cómo está construido el sitio.

## Retos

La restricción principal fue diseñar pensando en un equipo que no mantendría el código directamente — la arquitectura de contenido tenía que hacer que futuras actualizaciones fueran seguras sin necesitar un desarrollador.

## Resultado

La landing de la fundación carga rápido, se despliega de forma simple, y puede actualizarse por personas no desarrolladoras sin tocar los componentes del sitio.
