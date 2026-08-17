import { en } from './en';
import { es } from './es';

export const defaultLang = 'en';

export const ui = {
  en,
  es,
} as const;

export type UiKey = keyof typeof en;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UiKey) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getNavItems(lang: 'en' | 'es') {
  if (lang === 'es') {
    return [
      { label: 'Inicio', href: '/es/' },
      { label: 'Servicios', href: '/es/servicios' },
      { label: 'Experiencia', href: '/es/casos-de-exito' },
      { label: 'Ingeniería', href: '/es/ingenieria' },
      { label: 'Productos', href: '/es/productos' },
      { label: 'Sobre mí', href: '/es/sobre-mi' },
      { label: 'Contacto', href: '/es/contacto' },
    ];
  }

  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Experience', href: '/case-studies' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
}

export function getEquivalentRoute(pathname: string, targetLang: 'en' | 'es'): string {
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (targetLang === 'es') {
    if (cleanPath === '' || cleanPath === '/') return '/es/';
    if (cleanPath === '/services') return '/es/servicios';
    if (cleanPath === '/case-studies') return '/es/casos-de-exito';
    if (cleanPath.startsWith('/case-studies/')) return cleanPath.replace('/case-studies/', '/es/casos-de-exito/');
    if (cleanPath === '/engineering') return '/es/ingenieria';
    if (cleanPath.startsWith('/engineering/')) return cleanPath.replace('/engineering/', '/es/ingenieria/');
    if (cleanPath === '/products') return '/es/productos';
    if (cleanPath.startsWith('/products/')) return cleanPath.replace('/products/', '/es/productos/');
    if (cleanPath === '/about') return '/es/sobre-mi';
    if (cleanPath === '/contact') return '/es/contacto';
    return '/es/';
  } else {
    if (cleanPath === '/es' || cleanPath === '/es/') return '/';
    if (cleanPath === '/es/servicios') return '/services';
    if (cleanPath === '/es/casos-de-exito') return '/case-studies';
    if (cleanPath.startsWith('/es/casos-de-exito/')) return cleanPath.replace('/es/casos-de-exito/', '/case-studies/');
    if (cleanPath === '/es/ingenieria') return '/engineering';
    if (cleanPath.startsWith('/es/ingenieria/')) return cleanPath.replace('/es/ingenieria/', '/engineering/');
    if (cleanPath === '/es/productos') return '/products';
    if (cleanPath.startsWith('/es/productos/')) return cleanPath.replace('/es/productos/', '/products/');
    if (cleanPath === '/es/sobre-mi') return '/about';
    if (cleanPath === '/es/contacto') return '/contact';
    return '/';
  }
}
