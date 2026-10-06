import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    <section id="hero" class="relative pt-12 pb-20 overflow-hidden">
      
      <!-- Orbes de Luz Cósmica de Fundo -->
      <div class="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#d946ef]/15 blur-[120px]"></div>
      <div class="pointer-events-none absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#3b82f6]/15 blur-[120px]"></div>
      <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#eab308]/10 blur-[100px]"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Lado Esquerdo: Conceito & Manifesto -->
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d946ef] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#d946ef]"></span>
              </span>
              <span class="font-mono text-[11px] text-slate-300 uppercase tracking-widest font-semibold">
                Multiverso Conceitual // Linhas Temporais Simultâneas
              </span>
            </div>

            <h1 class="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              O mesmo objeto cotidiano. <br/>
              <span class="holo-text">Em dimensões paralelas surreais.</span>
            </h1>

            <p class="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
              Você busca um <strong>isqueiro comum</strong>? No <em>Universo Sombrio</em> ele emite uma chama negra que absorve a luz e gera vácuo existencial; no <em>Universo Aquático</em> ele acende jatos contínuos de água gelada sob pressão. Navegue pelas realidades e adquira variações de 10 objetos simples.
            </p>

            <!-- Botões de Ação -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#catalogo"
                class="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#d946ef]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explorar os 10 Produtos</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <button 
                (click)="store.triggerRandomVerseJump()"
                class="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:border-[#eab308]/50 active:scale-95 flex items-center gap-2"
              >
                <svg class="w-4 h-4 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Salto Aleatório</span>
              </button>
            </div>

            <!-- Fita de Cores do Moodboard -->
            <div class="pt-6 border-t border-white/10">
              <p class="text-[11px] font-mono uppercase text-slate-400 mb-3 tracking-widest font-semibold">
                Índice Cromático do Moodboard:
              </p>
              <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f0b1a] border border-white/10">
                  <div class="w-3 h-3 rounded-full bg-[#0f0b1a] border border-white/30"></div>
                  <span class="text-[10px] font-mono text-slate-300">#0f0b1a Deep Void</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div class="w-3 h-3 rounded-full bg-[#d946ef]"></div>
                  <span class="text-[10px] font-mono text-slate-300">#d946ef Neon Magenta</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div class="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                  <span class="text-[10px] font-mono text-slate-300">#3b82f6 Cosmic Blue</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div class="w-3 h-3 rounded-full bg-[#eab308]"></div>
                  <span class="text-[10px] font-mono text-slate-300">#eab308 Golden Hour</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Lado Direito: Demonstração Interativa do Isqueiro com as Variantes -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-md">
              
              <!-- Glow Holográfico de Fundo -->
              <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d946ef] via-[#3b82f6] to-[#eab308] opacity-50 blur-xl animate-pulse-glow"></div>
              
              <!-- Card de Destaque -->
              <div class="relative glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl space-y-5">
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#d946ef]"></span>
                    <span class="font-mono text-[11px] uppercase tracking-widest text-slate-300 font-semibold">
                      {{ activeHeroVar().dimensionCode }} // DEMO
                    </span>
                  </div>
                  <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/10">
                    {{ activeHeroVar().hazardLevel }}
                  </span>
                </div>

                <!-- Imagem Gerada ou Olho de Boneco Interativo -->
                <div class="relative w-full h-56 rounded-2xl bg-[#150f28] border border-white/10 flex flex-col items-center justify-center overflow-hidden group">
                  @if (activeHeroVar().imageUrl) {
                    <img 
                      [src]="activeHeroVar().imageUrl" 
                      [alt]="heroLighter.name + ' - ' + activeHeroVar().dimensionName"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div class="absolute bottom-3 right-3 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                      <app-googly-eye [size]="24" [pair]="false"></app-googly-eye>
                    </div>
                  } @else {
                    <div class="relative z-10 transition-transform duration-300 group-hover:scale-110">
                      <app-googly-eye [size]="96" [pair]="false"></app-googly-eye>
                    </div>
                    <p class="relative z-10 mt-3 font-mono text-[10px] text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <span>Rastreando Cursor em Tempo Real</span>
                    </p>
                  }
                </div>

                <!-- Detalhes da Variante Ativa -->
                <div class="space-y-3">
                  <div>
                    <span class="text-[11px] font-mono text-[#06b6d4] uppercase tracking-wider font-semibold">
                      Item #01: O Isqueiro
                    </span>
                    <h3 class="font-heading text-xl font-extrabold text-white mt-0.5">
                      {{ activeHeroVar().title }} ({{ activeHeroVar().dimensionName }})
                    </h3>
                    <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                      {{ activeHeroVar().anomalyEffect }}
                    </p>
                  </div>

                  <!-- Seletor de Dimensões do Isqueiro -->
                  <div>
                    <span class="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
                      Alternar Linha Temporal:
                    </span>
                    <div class="flex items-center gap-2">
                      @for (v of heroLighter.variants; track v.id) {
                        <button 
                          (click)="activeHeroVar.set(v)"
                          [class.ring-2]="activeHeroVar().id === v.id"
                          [class.ring-white]="activeHeroVar().id === v.id"
                          [style.backgroundColor]="v.colorHex"
                          class="px-2.5 py-1 rounded-xl border border-white/20 transition-all hover:scale-105 text-[11px] font-mono font-bold flex items-center gap-1.5 text-white shadow-md"
                          [title]="v.dimensionName"
                        >
                          <span class="w-1.5 h-1.5 rounded-full bg-white/80"></span>
                          <span>{{ v.dimensionName.replace('Universo ', '') }}</span>
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Botão de Compra -->
                  <div class="pt-2 flex items-center gap-3">
                    <button 
                      (click)="buyHeroItem()"
                      class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#ec4899] text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#d946ef]/25"
                    >
                      Adquirir ({{ store.formatPrice(heroLighter.basePriceUSD) }})
                    </button>
                    <button 
                      (click)="inspectHeroItem()"
                      class="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all"
                    >
                      Inspecionar
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly store = inject(StoreService);

  readonly heroLighter = this.store.products()[0];
  readonly activeHeroVar = signal(this.heroLighter.variants[1]);

  buyHeroItem() {
    this.store.addToCart(this.heroLighter, this.activeHeroVar());
  }

  inspectHeroItem() {
    this.store.openQuickView(this.heroLighter, this.activeHeroVar());
  }
}
