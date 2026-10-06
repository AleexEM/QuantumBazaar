export type CurrencyCode = 'BRL' | 'USD' | 'ETH' | 'QC';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  originDimension: string; // Ex: "Terra-001", "Universo dos Olhos (Terra-042)"
  avatarUrl?: string;
  clearanceLevel: string; // Ex: "Viajante Alfa", "Navegador de Fótons"
  quantumCredits: number;
}

export interface ProductVariant {
  id: string;
  dimensionCode: string; // Ex: "TERRA-001", "DIM-SOMBRIO", "DIM-AQUATICO"
  dimensionName: string; // Ex: "Universo Padrão", "Universo Sombrio", "Universo Aquático"
  title: string;
  anomalyEffect: string; // O que faz de diferente
  imagePrompt: string;
  imageUrl?: string; // Prompt de imagem otimizado
  colorHex: string;
  accentGlow: string;
  hazardLevel: 'Estável' | 'Anomalia Crítica' | 'Colapso Temporal' | 'Sensorial Inverso';
  stock: number;
}

export interface CatalogProduct {
  id: string;
  number: number;
  name: string; // "O Isqueiro", "O Guarda-Chuva", etc.
  baseItemName: string;
  baseItemDesc: string; // "Um isqueiro de metal escovado comum, elegante e polido."
  basePriceUSD: number;
  category: 'essenciais' | 'utilitarios' | 'vestuario' | 'instrumentos' | 'conforto';
  rating: number;
  reviewCount: number;
  variants: ProductVariant[]; // [Base (Universo Padrão), Variante 1, Variante 2]
}

export interface CartItem {
  product: CatalogProduct;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
