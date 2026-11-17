export type ProductStatus = 'live' | 'coming-soon' | 'sandbox-demo' | 'backend-development';
export const productStatusLabels: Record<'en' | 'es', Record<ProductStatus, string>> = {
  en: { live: 'Live', 'coming-soon': 'In development', 'sandbox-demo': 'Sandbox demo available', 'backend-development': 'Backend implemented · MVP in development' },
  es: { live: 'Publicado', 'coming-soon': 'En desarrollo', 'sandbox-demo': 'Demo sandbox disponible', 'backend-development': 'Backend implementado · MVP en desarrollo' },
};
