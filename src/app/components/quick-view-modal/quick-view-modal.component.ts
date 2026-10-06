import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { ProductVariant } from '../../models/store.models';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    @if (store.selectedProductForQuickView(); as product) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        <!-- Backdrop -->
        <div 
          (click)="store.closeQuickView()"
          class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        ></div>

        <!-- Modal Box -->
        <div class="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 my-8">
          
          <!-- Botão Fechar -->
          <button 
            (click)="store.closeQuickView()"
            class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-sm border border-white/15 transition-all"
            aria-label="Fechar modal"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            
            <!-- Lado Esquerdo: Imagem Gerada & Prompt -->
            <div class="space-y-4">
              <div class="relative w-full h-80 rounded-2xl bg-[#120c22] border border-white/15 overflow-hidden flex flex-col items-center justify-center">
                
                @if (activeVar().imageUrl) {
                  <img 
                    [src]="activeVar().imageUrl" 
                    [alt]="product.name + ' - ' + activeVar().dimensionName"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                    <app-googly-eye [size]="30" [pair]="false"></app-googly-eye>
                  </div>
                } @else {
                  <div class="flex flex-col items-center justify-center gap-3">
                    <app-googly-eye [size]="110" [pair]="product.number % 2 === 0"></app-googly-eye>
                    <span class="text-xs font-mono text-[#d946ef] bg-[#d946ef]/10 px-3 py-1 rounded-full border border-[#d946ef]/30 font-bold uppercase tracking-wider">
                      {{ activeVar().dimensionCode }} // Sintonizado
                    </span>
                  </div>
                }

                <div class="absolute top-3 left-3 font-mono text-[10px] px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold uppercase flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" [style.backgroundColor]="activeVar().colorHex"></span>
                  Item #{{ product.number < 10 ? '0' + product.number : product.number }}
                </div>
              </div>

              <!-- Prompt Otimizado de Geração da Imagem Antigravity -->
              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div class="flex items-center justify-between text-xs font-mono font-bold text-[#06b6d4] uppercase tracking-wider">
                  <span>Prompt de Imagem:</span>
                  <span class="text-[10px] text-slate-400">8k Photorealistic</span>
                </div>
                <p class="text-[11px] font-mono text-slate-300 bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed selection:bg-[#3b82f6]">
                  {{ activeVar().imagePrompt }}
                </p>
              </div>
            </div>

            <!-- Lado Direito: Informações & Seletor de Dimensão -->
            <div class="flex flex-col justify-between space-y-6">
              <div class="space-y-4">
                <div>
                  <span class="text-xs font-mono text-[#06b6d4] uppercase tracking-wider font-semibold">
                    {{ product.baseItemName }}
                  </span>
                  <h2 class="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
                    {{ product.name }}: <span class="text-[#d946ef]">{{ activeVar().dimensionName }}</span>
                  </h2>
                  <p class="text-xs font-mono text-slate-400 mt-1">
                    Item Base: {{ product.baseItemDesc }}
                  </p>
                </div>

                <!-- Preço -->
                <div class="font-mono text-3xl font-black text-white">
                  {{ store.formatPrice(product.basePriceUSD) }}
                </div>

                <!-- O que faz de diferente -->
                <div class="p-3.5 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-2 border-[#d946ef]">
                  <span class="text-[11px] font-mono uppercase text-[#eab308] block font-semibold mb-1 tracking-wider">
                    Efeito Dimensional:
                  </span>
                  <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {{ activeVar().anomalyEffect }}
                  </p>
                </div>

                <!-- Seletor das 3 Dimensões -->
                <div class="space-y-2">
                  <span class="text-xs font-mono uppercase text-slate-400 block font-semibold tracking-wider">
                    Selecione a Dimensão:
                  </span>
                  <div class="flex flex-wrap gap-2">
                    @for (v of product.variants; track v.id) {
                      <button 
                        (click)="activeVar.set(v)"
                        [class.border-[#d946ef]]="activeVar().id === v.id"
                        [class.bg-[#d946ef]/20]="activeVar().id === v.id"
                        [class.text-white]="activeVar().id === v.id"
                        [class.border-white/15]="activeVar().id !== v.id"
                        [class.text-slate-300]="activeVar().id !== v.id"
                        class="px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all"
                      >
                        <span class="w-2 h-2 rounded-full" [style.backgroundColor]="v.colorHex"></span>
                        <span>{{ v.dimensionName }}</span>
                      </button>
                    }
                  </div>
                </div>
              </div>

              <!-- Quantidade e Botão Comprar -->
              <div class="pt-4 border-t border-white/10 space-y-3">
                <div class="flex items-center gap-4">
                  <div class="flex items-center rounded-xl bg-white/5 border border-white/15 overflow-hidden">
                    <button 
                      (click)="decrementQty()" 
                      class="px-3 py-2 text-slate-300 hover:text-white font-mono hover:bg-white/10"
                    >
                      -
                    </button>
                    <span class="px-4 py-2 font-mono text-sm font-bold text-white">{{ quantity() }}</span>
                    <button 
                      (click)="incrementQty()" 
                      class="px-3 py-2 text-slate-300 hover:text-white font-mono hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    (click)="confirmAddToCart(product)"
                    class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#3b82f6] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d946ef]/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Adicionar ao Cofre</span>
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    }
  `
})
export class QuickViewModalComponent {
  readonly store = inject(StoreService);

  readonly quantity = signal<number>(1);
  readonly activeVar = signal<ProductVariant>({} as ProductVariant);

  ngOnInit() {
    const initialVar = this.store.selectedVariantForQuickView() || this.store.selectedProductForQuickView()?.variants[1] || this.store.selectedProductForQuickView()?.variants[0];
    if (initialVar) {
      this.activeVar.set(initialVar);
    }
  }

  incrementQty() {
    this.quantity.update(q => q + 1);
  }

  decrementQty() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  confirmAddToCart(product: any) {
    this.store.addToCart(product, this.activeVar(), this.quantity());
    this.store.closeQuickView();
    this.store.openCart();
  }
}
