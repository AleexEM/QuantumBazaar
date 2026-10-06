import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CatalogProduct, CurrencyCode, CurrencyConfig, ProductVariant, ToastMessage, User } from '../models/store.models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly currencies: Record<CurrencyCode, CurrencyConfig> = {
    BRL: { code: 'BRL', symbol: 'R$', rate: 5.65, name: 'Real Brasileiro' },
    USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'Dólar Quântico' },
    ETH: { code: 'ETH', symbol: 'Ξ', rate: 0.00038, name: 'Ethereum Interdimensional' },
    QC: { code: 'QC', symbol: 'QC ', rate: 10.0, name: 'Créditos Multiversais' },
  };

  readonly currentCurrency = signal<CurrencyCode>('BRL');

  // Os exatos 10 produtos fornecidos pelo usuário
  readonly products = signal<CatalogProduct[]>([
    {
      id: 'prod-01-isqueiro',
      number: 1,
      name: 'O Isqueiro',
      baseItemName: 'Isqueiro de Metal Escovado',
      baseItemDesc: 'Um isqueiro de metal escovado comum, elegante e polido.',
      basePriceUSD: 28,
      category: 'essenciais',
      rating: 4.98,
      reviewCount: 312,
      variants: [
        {
          id: 'v-isq-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Isqueiro Clássico Polido',
          anomalyEffect: 'Produz uma chama dourada comum para acender velas e incensos sem qualquer anomalia física.',
          imagePrompt: 'A professional studio product shot of a standard polished brushed metal cigarette lighter, placed on a transparent glass pedestal, clean minimalist background with a soft blue gradient studio lighting, 8k resolution, photorealistic.',
          colorHex: '#94a3b8',
          accentGlow: 'rgba(148, 163, 184, 0.3)',
          hazardLevel: 'Estável',
          stock: 50
        },
        {
          id: 'v-isq-sombrio',
          imageUrl: 'products/lighter_dark.jpg',
          dimensionCode: 'DIM-SOMBRIO',
          dimensionName: 'Universo Sombrio',
          title: 'Isqueiro de Fogo Negro',
          anomalyEffect: 'Emite uma chama negra que absorve a luz ao redor e cria uma leve sensação de vácuo existencial.',
          imagePrompt: 'A close-up product photo of an aged, slightly weathered dark metal cigarette lighter being held by dark gloves, emitting a dense, opaque black flame that absorbs the surrounding light, dark cosmic vortex background, dramatic cinematic lighting, 8k.',
          colorHex: '#0f0b1a',
          accentGlow: 'rgba(15, 11, 26, 0.9)',
          hazardLevel: 'Colapso Temporal',
          stock: 6
        },
        {
          id: 'v-isq-aquatico',
          imageUrl: 'products/lighter_water.jpg',
          dimensionCode: 'DIM-AQUATICO',
          dimensionName: 'Universo Aquático',
          title: 'Isqueiro de Jatos Glaciais',
          anomalyEffect: 'Em vez de fogo, acende jatos contínuos de água gelada sob pressão.',
          imagePrompt: 'A product photography of a cigarette lighter encrusted with small barnacles, sea shells, and tiny corals, resting on a wet rock. Instead of fire, it shoots a strong, crystalline jet of cold water and mist. Underwater background with sunrays filtering through, 8k.',
          colorHex: '#06b6d4',
          accentGlow: 'rgba(6, 182, 212, 0.45)',
          hazardLevel: 'Sensorial Inverso',
          stock: 14
        }
      ]
    },
    {
      id: 'prod-02-guarda-chuva',
      number: 2,
      name: 'O Guarda-Chuva',
      baseItemName: 'Guarda-Chuva Preto Clássico',
      baseItemDesc: 'Um guarda-chuva preto clássico, fechado e sóbrio.',
      basePriceUSD: 54,
      category: 'utilitarios',
      rating: 4.95,
      reviewCount: 184,
      variants: [
        {
          id: 'v-chuva-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Guarda-Chuva Urbano Sóbrio',
          anomalyEffect: 'Repele a água da chuva comum e abre com mecanismo automático por mola de aço.',
          imagePrompt: 'A professional studio product shot of a classic closed black umbrella standing upright on a minimalist reflective surface, clean studio lighting, elegant and modern, 8k resolution.',
          colorHex: '#64748b',
          accentGlow: 'rgba(100, 116, 139, 0.3)',
          hazardLevel: 'Estável',
          stock: 40
        },
        {
          id: 'v-chuva-invertido',
          imageUrl: 'products/umbrella_inverted.jpg',
          dimensionCode: 'DIM-INVERTIDO',
          dimensionName: 'Universo Invertido',
          title: 'Guarda-Chuva de Tempestade Ascendente',
          anomalyEffect: 'O tecido fica virado para dentro e armazena uma pequena tempestade particular que chove para cima.',
          imagePrompt: 'A surreal product photo of a black umbrella opened upside down like a bowl, holding a miniature glowing storm cloud inside from which rain falls upwards into the air. Abstract cosmic background, 8k, photorealistic.',
          colorHex: '#3b82f6',
          accentGlow: 'rgba(59, 130, 246, 0.45)',
          hazardLevel: 'Anomalia Crítica',
          stock: 8
        },
        {
          id: 'v-chuva-vidro',
          dimensionCode: 'DIM-VIDRO-ORGANICO',
          dimensionName: 'Universo de Vidro Orgânico',
          title: 'Guarda-Chuva de Vidro e Chuva Emocional',
          anomalyEffect: 'Feito de um material translúcido que protege da chuva física, mas deixa passar lembranças tristes e "chuvas emocionais".',
          imagePrompt: 'A product shot of an umbrella made entirely of translucent, glowing organic glass. Ghostly soft silhouettes and water droplets shaped like memories pass through the transparent canopy. Surreal parallel dimension background, 8k.',
          colorHex: '#d946ef',
          accentGlow: 'rgba(217, 70, 239, 0.45)',
          hazardLevel: 'Sensorial Inverso',
          stock: 11
        }
      ]
    },
    {
      id: 'prod-03-caneca',
      number: 3,
      name: 'A Caneca de Café',
      baseItemName: 'Caneca de Cerâmica Branca',
      baseItemDesc: 'Uma caneca de cerâmica branca lisa e tradicional.',
      basePriceUSD: 32,
      category: 'utilitarios',
      rating: 5.0,
      reviewCount: 429,
      variants: [
        {
          id: 'v-caneca-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Caneca Matinal Minimalista',
          anomalyEffect: 'Comporta 300ml de café quente ou chá sem alterar a temperatura ambiente.',
          imagePrompt: 'A professional studio product shot of a clean, plain white ceramic coffee mug standing on a light wooden surface, soft natural studio lighting, minimalist, 8k resolution.',
          colorHex: '#f1f5f9',
          accentGlow: 'rgba(241, 245, 249, 0.3)',
          hazardLevel: 'Estável',
          stock: 60
        },
        {
          id: 'v-caneca-termica',
          imageUrl: 'products/mug_ice.jpg',
          dimensionCode: 'DIM-TERMICO-INVERSO',
          dimensionName: 'Universo Térmico-Inverso',
          title: 'Caneca da Nevasca Perpétua',
          anomalyEffect: 'Mantém qualquer líquido em estado de congelamento absoluto, gerando uma nevasca própria.',
          imagePrompt: 'A product photo of a ceramic coffee mug completely covered in a thick layer of blue ice and sparkling frost, emitting a tiny miniature blizzard instead of steam. Rustic wooden shelf background, cinematic lighting, 8k.',
          colorHex: '#38bdf8',
          accentGlow: 'rgba(56, 189, 248, 0.5)',
          hazardLevel: 'Sensorial Inverso',
          stock: 9
        },
        {
          id: 'v-caneca-nostalgica',
          dimensionCode: 'DIM-NOSTALGICO',
          dimensionName: 'Universo Nostálgico',
          title: 'Caneca do Vórtice de Lembranças',
          anomalyEffect: 'Em vez de café líquido, abriga um vórtice holográfico de memórias e cheiros antigos.',
          imagePrompt: 'A product shot of a cracked, aged ceramic coffee mug glowing with a warm sepia tone. Floating just above the rim is a small ethereal holographic vortex showing faint memories like a tiny bicycle and blurred faces. Golden nebula background, 8k.',
          colorHex: '#eab308',
          accentGlow: 'rgba(234, 179, 8, 0.5)',
          hazardLevel: 'Anomalia Crítica',
          stock: 7
        }
      ]
    },
    {
      id: 'prod-04-oculos',
      number: 4,
      name: 'Os Óculos de Sol',
      baseItemName: 'Óculos de Sol Escuros Clássicos',
      baseItemDesc: 'Óculos de sol escuros clássicos e elegantes.',
      basePriceUSD: 78,
      category: 'vestuario',
      rating: 4.96,
      reviewCount: 260,
      variants: [
        {
          id: 'v-oculos-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Óculos de Sol Wayfarer Noir',
          anomalyEffect: 'Bloqueia 99% dos raios UV solares e proporciona visão nítida com lentes escuras polarizadas.',
          imagePrompt: 'A professional studio product shot of sleek black classic sunglasses resting on a glossy white pedestal, clean studio lighting, modern minimalist style, 8k resolution.',
          colorHex: '#334155',
          accentGlow: 'rgba(51, 65, 85, 0.3)',
          hazardLevel: 'Estável',
          stock: 35
        },
        {
          id: 'v-oculos-passado',
          imageUrl: 'products/sunglasses_past.jpg',
          dimensionCode: 'DIM-PASSADO-IMEDIATO',
          dimensionName: 'Universo do Passado Imediato',
          title: 'Óculos de Replay Temporal (-5s)',
          anomalyEffect: 'As lentes mostram o que aconteceu exatamente naquele mesmo lugar 5 segundos atrás.',
          imagePrompt: 'A product photo of stylish sunglasses where the dark lenses are transparent and glow faintly, projecting a ghostly translucent replay of the exact same room from five seconds ago floating right in front of them. Sci-fi surrealist background, 8k.',
          colorHex: '#a855f7',
          accentGlow: 'rgba(168, 85, 247, 0.45)',
          hazardLevel: 'Colapso Temporal',
          stock: 5
        },
        {
          id: 'v-oculos-cyber',
          imageUrl: 'products/sunglasses_cyber.jpg',
          dimensionCode: 'DIM-NEON-CIBERNETICO',
          dimensionName: 'Universo Neon-Cibernético',
          title: 'Óculos de Matrix & Visão NPC',
          anomalyEffect: 'Substituem a realidade por uma interface de código binário flutuante onde as pessoas parecem NPCs.',
          imagePrompt: 'A product shot of cyberpunk sunglasses with glowing neon frames, where the lenses display floating streams of green binary code and digital matrix interfaces overlapping reality. Dark cybernetic workshop background, 8k.',
          colorHex: '#22c55e',
          accentGlow: 'rgba(34, 197, 94, 0.5)',
          hazardLevel: 'Sensorial Inverso',
          stock: 12
        }
      ]
    },
    {
      id: 'prod-05-caderno',
      number: 5,
      name: 'O Caderno de Anotações',
      baseItemName: 'Caderno de Capa Dura Preta',
      baseItemDesc: 'Um caderno de capa dura preta com marcador de fita.',
      basePriceUSD: 36,
      category: 'essenciais',
      rating: 4.93,
      reviewCount: 154,
      variants: [
        {
          id: 'v-caderno-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Caderno Pautado Clássico',
          anomalyEffect: '192 páginas de papel marfim 90g para registros e anotações comuns.',
          imagePrompt: 'A professional studio product shot of a closed black hardcover notebook with a black ribbon bookmark, resting on a clean minimalist desk, soft studio lighting, 8k resolution.',
          colorHex: '#475569',
          accentGlow: 'rgba(71, 85, 105, 0.3)',
          hazardLevel: 'Estável',
          stock: 45
        },
        {
          id: 'v-caderno-profetico',
          imageUrl: 'products/notebook_prophetic.jpg',
          dimensionCode: 'DIM-PROFETICO-REVERSO',
          dimensionName: 'Universo Profético Reverso',
          title: 'Caderno de Escrita Retro-Causal',
          anomalyEffect: 'Tudo o que você escreve nele acontece com outras pessoas em dimensões aleatórias exatamente três dias atrás.',
          imagePrompt: 'A product photo of an open leather-bound notebook where the blank pages suddenly fill themselves with handwritten ink sentences that glow faintly, shifting and rewriting themselves automatically. Mysterious ambient background, 8k.',
          colorHex: '#d946ef',
          accentGlow: 'rgba(217, 70, 239, 0.5)',
          hazardLevel: 'Colapso Temporal',
          stock: 4
        },
        {
          id: 'v-caderno-desvanecente',
          dimensionCode: 'DIM-DESVANECENTE',
          dimensionName: 'Universo Desvanecente',
          title: 'Caderno do Peso Emocional Puro',
          anomalyEffect: 'As páginas absorvem a tinta e a apagam após 10 minutos, guardando apenas o peso emocional.',
          imagePrompt: 'A product shot of a modern minimalist notebook where ink text written on the page is dissolving into tiny floating glowing particles that fade into the air, leaving the paper completely blank again. Surreal abstract background, 8k.',
          colorHex: '#eab308',
          accentGlow: 'rgba(234, 179, 8, 0.45)',
          hazardLevel: 'Sensorial Inverso',
          stock: 16
        }
      ]
    },
    {
      id: 'prod-06-fones',
      number: 6,
      name: 'O Fone de Ouvido',
      baseItemName: 'Fones de Ouvido Sem Fio',
      baseItemDesc: 'Fones de ouvido sem fio modernos na cor preto fosco.',
      basePriceUSD: 140,
      category: 'instrumentos',
      rating: 4.97,
      reviewCount: 512,
      variants: [
        {
          id: 'v-fones-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Headphone Bluetooth Hi-Fi',
          anomalyEffect: 'Reproduz áudio estéreo de alta fidelidade com cancelamento ativo de ruído convencional.',
          imagePrompt: 'A professional studio product shot of modern over-ear wireless headphones in matte black, resting on a clean acrylic stand, soft minimalist studio lighting, 8k resolution.',
          colorHex: '#1e293b',
          accentGlow: 'rgba(30, 41, 59, 0.3)',
          hazardLevel: 'Estável',
          stock: 30
        },
        {
          id: 'v-fones-silencioso',
          dimensionCode: 'DIM-SILENCIOSO',
          dimensionName: 'Universo Silencioso',
          title: 'Fones de Eco dos Pensamentos Passados',
          anomalyEffect: 'Cancela o som ambiente e reproduz o eco dos seus próprios pensamentos da semana passada.',
          imagePrompt: 'A product photo of futuristic over-ear headphones made of sound-absorbing dark matte materials, with subtle shimmering ripples in the air around the earcups indicating absolute silence and vacuum. Minimalist cosmic background, 8k.',
          colorHex: '#3b82f6',
          accentGlow: 'rgba(59, 130, 246, 0.5)',
          hazardLevel: 'Colapso Temporal',
          stock: 7
        },
        {
          id: 'v-fones-sinfonico',
          imageUrl: 'products/headphones_symphonic.jpg',
          dimensionCode: 'DIM-SINFONICO-CAOTICO',
          dimensionName: 'Universo Sinfônico Caótico',
          title: 'Fones da Ópera Dramática em Dó Menor',
          anomalyEffect: 'Transforma qualquer barulho do ambiente em uma ópera dramática em dó menor.',
          imagePrompt: 'A product shot of elegant headphones where colorful musical notes, violin strings, and tiny abstract orchestral waves physically flow out of the speakers into the air like a visible melody. Surreal classical art background, 8k.',
          colorHex: '#ec4899',
          accentGlow: 'rgba(236, 72, 153, 0.5)',
          hazardLevel: 'Sensorial Inverso',
          stock: 13
        }
      ]
    },
    {
      id: 'prod-07-escova',
      number: 7,
      name: 'A Escova de Dentes',
      baseItemName: 'Escova de Dentes Minimalista',
      baseItemDesc: 'Escova de dentes minimalista em tons de branco e azul.',
      basePriceUSD: 18,
      category: 'essenciais',
      rating: 4.91,
      reviewCount: 98,
      variants: [
        {
          id: 'v-escova-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Escova de Cerdas Macias',
          anomalyEffect: 'Limpa a placa bacteriana com cerdas de nylon convencionais e cabo ergonômico.',
          imagePrompt: 'A professional studio product shot of a modern minimalist white and blue toothbrush resting on a clean bathroom counter, bright crisp studio lighting, 8k resolution.',
          colorHex: '#38bdf8',
          accentGlow: 'rgba(56, 189, 248, 0.3)',
          hazardLevel: 'Estável',
          stock: 70
        },
        {
          id: 'v-escova-memoria',
          dimensionCode: 'DIM-SABOR-MEMORIA',
          dimensionName: 'Universo Sabor Memória',
          title: 'Escova do Paladar aos 7 Anos',
          anomalyEffect: 'As cerdas liberam o exato gosto do último prato marcante que você comeu aos 7 anos.',
          imagePrompt: 'A product photo of a sleek toothbrush where the translucent bristles glow with a warm golden hue, and tiny fragrant wisps shaped like childhood memories and sweet treats swirl around the head. Nostalgic warm background, 8k.',
          colorHex: '#f59e0b',
          accentGlow: 'rgba(245, 158, 11, 0.45)',
          hazardLevel: 'Sensorial Inverso',
          stock: 20
        },
        {
          id: 'v-escova-eletrico',
          imageUrl: 'products/toothbrush_quantum.jpg',
          dimensionCode: 'DIM-ELETRICO-QUANTICO',
          dimensionName: 'Universo Elétrico-Quântico',
          title: 'Escova de Vibração Dimensional',
          anomalyEffect: 'Vibra em frequência alta limpando os dentes e deslocando microrrealidades da gengiva.',
          imagePrompt: 'A product shot of a futuristic electric toothbrush vibrating at a hyper-speed, surrounded by microscopic glowing quantum particles and tiny shifting dimensional ripples around the bristles. Sci-fi laboratory background, 8k.',
          colorHex: '#06b6d4',
          accentGlow: 'rgba(6, 182, 212, 0.5)',
          hazardLevel: 'Anomalia Crítica',
          stock: 10
        }
      ]
    },
    {
      id: 'prod-08-relogio',
      number: 8,
      name: 'O Relógio de Pulso',
      baseItemName: 'Relógio Analógico de Aço',
      baseItemDesc: 'Relógio analógico de aço inoxidável com pulseira de couro preto.',
      basePriceUSD: 165,
      category: 'instrumentos',
      rating: 4.99,
      reviewCount: 388,
      variants: [
        {
          id: 'v-relogio-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Cronógrafo de Pulso Clássico',
          anomalyEffect: 'Mede 24 horas terrestres por dia com mecanismo de quartzo suíço de alta precisão.',
          imagePrompt: 'A professional studio product shot of a classic stainless steel analog wristwatch with a black leather strap, clean minimalist white surface, sharp focus, 8k resolution.',
          colorHex: '#94a3b8',
          accentGlow: 'rgba(148, 163, 184, 0.3)',
          hazardLevel: 'Estável',
          stock: 25
        },
        {
          id: 'v-relogio-elastico',
          imageUrl: 'products/watch_elastic.jpg',
          dimensionCode: 'DIM-ELASTICO',
          dimensionName: 'Universo Elástico',
          title: 'Relógio de Tempo Psicossomático',
          anomalyEffect: 'Os minutos passam rápido ou devagar dependendo do nível de tédio de quem olha.',
          imagePrompt: 'A product photo of an analog wristwatch where the metallic clock face and hands are visibly bending and stretching like liquid metal, distorting time and space around it. Surreal melting Dali-esque background, 8k.',
          colorHex: '#eab308',
          accentGlow: 'rgba(234, 179, 8, 0.5)',
          hazardLevel: 'Colapso Temporal',
          stock: 6
        },
        {
          id: 'v-relogio-espacial',
          dimensionCode: 'DIM-ANALOGICO-ESPACIAL',
          dimensionName: 'Universo Analógico-Espacial',
          title: 'Relógio Radar de Doppelgänger',
          anomalyEffect: 'Os ponteiros indicam a probabilidade de encontrar um doppelgänger na esquina seguinte.',
          imagePrompt: 'A product shot of a wristwatch where the traditional dials are replaced by tiny glowing cosmic orbital rings and a needle pointing toward probabilities of alternate timelines. Deep space starry background, 8k.',
          colorHex: '#d946ef',
          accentGlow: 'rgba(217, 70, 239, 0.5)',
          hazardLevel: 'Anomalia Crítica',
          stock: 8
        }
      ]
    },
    {
      id: 'prod-09-travesseiro',
      number: 9,
      name: 'O Travesseiro',
      baseItemName: 'Travesseiro de Algodão Macio',
      baseItemDesc: 'Travesseiro de algodão fofo e macio sobre lençóis limpos.',
      basePriceUSD: 62,
      category: 'conforto',
      rating: 4.94,
      reviewCount: 215,
      variants: [
        {
          id: 'v-trav-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Travesseiro Anatômico Ortopédico',
          anomalyEffect: 'Espuma macia com suporte cervical para noites de sono convencionais de 8 horas.',
          imagePrompt: 'A professional studio product shot of a fluffy white cotton bed pillow resting neatly on a clean minimalist bed sheet, soft cozy studio lighting, 8k resolution.',
          colorHex: '#f8fafc',
          accentGlow: 'rgba(248, 250, 252, 0.3)',
          hazardLevel: 'Estável',
          stock: 40
        },
        {
          id: 'v-trav-sonhos',
          dimensionCode: 'DIM-SONHOS-COMPARTILHADOS',
          dimensionName: 'Universo dos Sonhos Compartilhados',
          title: 'Travesseiro Antena Onírica',
          anomalyEffect: 'Permite capturar vestígios de sonhos de outras pessoas de dimensões paralelas.',
          imagePrompt: 'A product photo of a soft pillow that emits a gentle, colorful nebula-like glow on its surface, with faint starry dream-like patterns shifting across the fabric texture. Dreamy ethereal bedroom background, 8k.',
          colorHex: '#8b5cf6',
          accentGlow: 'rgba(139, 92, 246, 0.5)',
          hazardLevel: 'Sensorial Inverso',
          stock: 9
        },
        {
          id: 'v-trav-gravidade',
          imageUrl: 'products/pillow_gravity.jpg',
          dimensionCode: 'DIM-GRAVIDADE-ZERO',
          dimensionName: 'Universo Gravidade Zero',
          title: 'Travesseiro do Abismo Flutuante',
          anomalyEffect: 'Densidade flutuante que dá a sensação perpétua de queda leve em um abismo fofo.',
          imagePrompt: 'A product shot of a plush white pillow floating completely levitated in mid-air, defying gravity, casting a soft shadow on the surface below while glowing with a light anti-gravity field. Surreal surrealist room, 8k.',
          colorHex: '#06b6d4',
          accentGlow: 'rgba(6, 182, 212, 0.45)',
          hazardLevel: 'Anomalia Crítica',
          stock: 5
        }
      ]
    },
    {
      id: 'prod-10-mochila',
      number: 10,
      name: 'A Mochila',
      baseItemName: 'Mochila Urbana de Lona',
      baseItemDesc: 'Mochila urbana de lona cinza-escuro.',
      basePriceUSD: 95,
      category: 'vestuario',
      rating: 4.98,
      reviewCount: 467,
      variants: [
        {
          id: 'v-mochila-padrao',
          dimensionCode: 'TERRA-001',
          dimensionName: 'Universo Padrão',
          title: 'Mochila Executiva Impermeável',
          anomalyEffect: 'Compartimento para notebook de 15.6 polegadas e bolsos organizadores padrão.',
          imagePrompt: 'A professional studio product shot of a modern canvas everyday backpack in dark gray, standing on a minimalist concrete floor, crisp studio lighting, 8k resolution.',
          colorHex: '#475569',
          accentGlow: 'rgba(71, 85, 105, 0.3)',
          hazardLevel: 'Estável',
          stock: 35
        },
        {
          id: 'v-mochila-infinito',
          imageUrl: 'products/backpack_infinite.jpg',
          dimensionCode: 'DIM-FUNDO-INFINITO',
          dimensionName: 'Universo do Fundo Infinito',
          title: 'Mochila do Vórtice Singular',
          anomalyEffect: 'Interior com bolsão espacial onde cabe qualquer coisa, mas o que cai demora dias úteis para voltar.',
          imagePrompt: 'A product photo of an open backpack whose main zipper reveals a deep, glowing cosmic abyss inside, showing swirling stars and galaxies instead of fabric lining. Surreal multi-dimensional background, 8k.',
          colorHex: '#0f0b1a',
          accentGlow: 'rgba(15, 11, 26, 0.9)',
          hazardLevel: 'Colapso Temporal',
          stock: 4
        },
        {
          id: 'v-mochila-empatica',
          dimensionCode: 'DIM-EMPATICO',
          dimensionName: 'Universo Empático',
          title: 'Mochila do Peso Psicológico',
          anomalyEffect: 'Fica mais pesada ou leve dependendo do nível de estresse ou culpa que você carrega.',
          imagePrompt: 'A product shot of a smart canvas backpack that subtly changes its shape and color tones based on emotional weight, glowing with soft empathetic pulse lights along its straps. Minimalist artistic studio background, 8k.',
          colorHex: '#ec4899',
          accentGlow: 'rgba(236, 72, 153, 0.5)',
          hazardLevel: 'Sensorial Inverso',
          stock: 12
        }
      ]
    }
  ]);

  // Cart state
  readonly cartItems = signal<CartItem[]>([]);
  readonly isCartOpen = signal<boolean>(false);
  readonly selectedProductForQuickView = signal<CatalogProduct | null>(null);
  readonly selectedVariantForQuickView = signal<ProductVariant | null>(null);
  readonly isCheckoutOpen = signal<boolean>(false);
  readonly isAuthModalOpen = signal<boolean>(false);
  readonly currentUser = signal<User | null>(null);

  // Filters & Search
  readonly searchQuery = signal<string>('');
  readonly selectedCategoryFilter = signal<string>('all');
  readonly appliedDiscountPercent = signal<number>(0);
  readonly appliedCouponCode = signal<string>('');

  // Toast Notifications
  readonly toasts = signal<ToastMessage[]>([]);

  // Computed Cart metrics
  readonly cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  readonly cartSubtotalUSD = computed(() => {
    return this.cartItems().reduce((acc, cartItem) => acc + (cartItem.product.basePriceUSD * cartItem.quantity), 0);
  });

  readonly cartDiscountUSD = computed(() => {
    return this.cartSubtotalUSD() * (this.appliedDiscountPercent() / 100);
  });

  readonly cartTotalUSD = computed(() => {
    const sub = this.cartSubtotalUSD() - this.cartDiscountUSD();
    return sub > 0 ? sub : 0;
  });

  // Filtered Products
  readonly filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategoryFilter();

    return this.products().filter(prod => {
      const matchCat = cat === 'all' || prod.category === cat;
      const matchQuery = !q || 
        prod.name.toLowerCase().includes(q) || 
        prod.baseItemName.toLowerCase().includes(q) ||
        prod.baseItemDesc.toLowerCase().includes(q) ||
        prod.variants.some(v => v.title.toLowerCase().includes(q) || v.dimensionName.toLowerCase().includes(q) || v.anomalyEffect.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  });

  // Salto Dimensional Aleatório
  triggerRandomVerseJump(): { product: CatalogProduct; variant: ProductVariant } {
    const all = this.products();
    const randomProd = all[Math.floor(Math.random() * all.length)];
    // Prefer parallel variations (index 1 or 2)
    const variantsList = randomProd.variants;
    const randomVar = variantsList[Math.floor(Math.random() * variantsList.length)];

    this.openQuickView(randomProd, randomVar);
    this.showToast(
      'SALTO DIMENSIONAL ATIVADO!',
      `Você aterrissou na ${randomVar.dimensionCode} (${randomVar.dimensionName})! Objeto: ${randomProd.name}.`,
      'info'
    );

    return { product: randomProd, variant: randomVar };
  }

  // Currency
  setCurrency(currency: CurrencyCode) {
    this.currentCurrency.set(currency);
    this.showToast('Moeda Interdimensional Atualizada', `Preços calculados em ${this.currencies[currency].name} (${this.currencies[currency].symbol})`, 'info');
  }

  formatPrice(priceInUSD: number): string {
    const cur = this.currencies[this.currentCurrency()];
    const converted = priceInUSD * cur.rate;

    if (cur.code === 'ETH') {
      return `${cur.symbol} ${converted.toFixed(4)}`;
    }
    if (cur.code === 'QC') {
      return `${Math.round(converted).toLocaleString('pt-BR')} ${cur.symbol}`;
    }
    if (cur.code === 'BRL') {
      return `R$ ${converted.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$ ${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Cart actions
  addToCart(product: CatalogProduct, variant?: ProductVariant, quantity: number = 1) {
    const selectedVar = variant || product.variants[1] || product.variants[0];
    const current = [...this.cartItems()];
    const index = current.findIndex(
      ci => ci.product.id === product.id && ci.selectedVariant.id === selectedVar.id
    );

    if (index > -1) {
      current[index] = {
        ...current[index],
        quantity: current[index].quantity + quantity
      };
    } else {
      current.push({
        product,
        selectedVariant: selectedVar,
        quantity
      });
    }

    this.cartItems.set(current);
    this.showToast(
      'Objeto Ancorado ao Cofre!',
      `${product.name}: ${selectedVar.title} (${selectedVar.dimensionName}) adicionado com sucesso.`,
      'success'
    );
  }

  updateQuantity(itemIndex: number, delta: number) {
    const current = [...this.cartItems()];
    if (!current[itemIndex]) return;

    const newQty = current[itemIndex].quantity + delta;
    if (newQty <= 0) {
      current.splice(itemIndex, 1);
    } else {
      current[itemIndex] = { ...current[itemIndex], quantity: newQty };
    }
    this.cartItems.set(current);
  }

  removeItem(itemIndex: number) {
    const current = [...this.cartItems()];
    current.splice(itemIndex, 1);
    this.cartItems.set(current);
  }

  clearCart() {
    this.cartItems.set([]);
  }

  applyCoupon(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'TUDOAOMESMOTEMPO' || normalized === 'MULTIVERSO' || normalized === 'FOUNDER2026') {
      this.appliedDiscountPercent.set(25);
      this.appliedCouponCode.set(normalized);
      this.showToast('Salto Quântico Autorizado!', 'Desconto de 25% em todas as realidades paralelas aplicado.', 'success');
      return true;
    }
    if (normalized === 'OLHODEBONECO' || normalized === 'BAGEL') {
      this.appliedDiscountPercent.set(50);
      this.appliedCouponCode.set(normalized);
      this.showToast('Superposição Revelada!', '50% de desconto multiversal desbloqueado.', 'success');
      return true;
    }
    this.showToast('Código Temporal Inválido', 'Código não registrado nesta linha do tempo. Tente TUDOAOMESMOTEMPO ou OLHODEBONECO.', 'warning');
    return false;
  }

  // Modals
  openQuickView(product: CatalogProduct, variant?: ProductVariant) {
    this.selectedProductForQuickView.set(product);
    this.selectedVariantForQuickView.set(variant || product.variants[1] || product.variants[0]);
  }

  closeQuickView() {
    this.selectedProductForQuickView.set(null);
    this.selectedVariantForQuickView.set(null);
  }

  openCart() {
    this.isCartOpen.set(true);
  }

  closeCart() {
    this.isCartOpen.set(false);
  }

  openCheckout() {
    if (this.cartItems().length === 0) {
      this.showToast('Cofre Vazio', 'Adicione variações dimensionais ao cofre antes de realizar o teleporte.', 'warning');
      return;
    }
    this.isCartOpen.set(false);
    this.isCheckoutOpen.set(true);
  }

  closeCheckout() {
    this.isCheckoutOpen.set(false);
  }

  
  // Auth Modal & User State (Opcional)
  openAuthModal() {
    this.isAuthModalOpen.set(true);
  }

  closeAuthModal() {
    this.isAuthModalOpen.set(false);
  }

  loginUser(user: User) {
    this.currentUser.set(user);
  }

  logoutUser() {
    this.currentUser.set(null);
    this.showToast('Desconectado', 'Sua sessão foi encerrada com segurança.', 'info');
  }

  showToast(title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') {
    const toast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
    };
    this.toasts.update(list => [...list, toast]);

    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== toast.id));
    }, 4500);
  }

  removeToast(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
