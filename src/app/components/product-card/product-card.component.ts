import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogProduct, ProductVariant } from '../../models/store.models';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    <div class="glass-panel glass-panel-hover rounded-3xl p-5 flex flex-col justify-between h-full border border-white/10 relative group overflow-hidden">
      
      <!-- Brilho Dimensional de Fundo no Card -->
      <div 
        class="absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-25"
        [style.background]="'radial-gradient(circle at top right, ' + activeVariant().accentGlow + ', transparent 70%)'"
      ></div>

      <div>
        <!-- Visualizador do Objeto Dimensional -->
        <div class="relative w-full h-56 rounded-2xl bg-[#120c22] border border-white/10 overflow-hidden mb-4 flex flex-col items-center justify-center">
          
          @if (activeVariant().imageUrl) {
            <img 
              [src]="activeVariant().imageUrl" 
              [alt]="product.name + ' - ' + activeVariant().dimensionName"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute bottom-3 right-3 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
              <app-googly-eye [size]="24" [pair]="false"></app-googly-eye>
            </div>
          } @else {
            <div class="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <app-googly-eye [size]="72" [pair]="product.number % 2 === 0"></app-googly-eye>
              <span class="mt-2 text-[10px] font-mono text-[#d946ef] bg-[#d946ef]/10 px-2.5 py-0.5 rounded-full border border-[#d946ef]/30 font-semibold">
                {{ activeVariant().dimensionCode }}
              </span>
            </div>
          }

          <!-- Badge do Número do Item -->
          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-md">
            <span class="w-1.5 h-1.5 rounded-full" [style.backgroundColor]="activeVariant().colorHex"></span>
            #{{ product.number < 10 ? '0' + product.number : product.number }}
          </div>

          <!-- Nível de Risco da Realidade -->
          <div class="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
            {{ activeVariant().hazardLevel }}
          </div>

          <!-- Botão Inspecionar ao Hover -->
          <button 
            (click)="store.openQuickView(product, activeVariant())"
            class="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#d946ef] shadow-lg uppercase tracking-wider"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Inspecionar</span>
          </button>
        </div>

        <!-- Nome Principal do Objeto -->
        <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
          <span class="uppercase tracking-wider text-[#06b6d4] font-semibold">
            {{ product.baseItemName }}
          </span>
          <div class="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <span class="text-white font-bold">{{ product.rating }}</span>
            <span class="text-slate-500">/ 5.0</span>
          </div>
        </div>

        <h3 class="font-heading font-extrabold text-xl text-white group-hover:text-[#d946ef] transition-colors leading-snug">
          {{ product.name }}: <span class="font-normal text-slate-200">{{ activeVariant().dimensionName }}</span>
        </h3>

        <!-- O que faz de diferente -->
        <p class="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
          <strong class="text-[#eab308]">Anomalia:</strong> {{ activeVariant().anomalyEffect }}
        </p>

        <!-- Seletor das 3 Dimensões Disponíveis -->
        <div class="mt-4 pt-3 border-t border-white/10">
          <span class="text-[10px] font-mono uppercase text-slate-400 block mb-1.5 font-semibold tracking-wider">
            Linha Temporal:
          </span>
          <div class="flex items-center gap-1.5 flex-wrap">
            @for (v of product.variants; track v.id) {
              <button 
                (click)="activeVariant.set(v)"
                [class.border-[#d946ef]]="activeVariant().id === v.id"
                [class.bg-[#d946ef]/20]="activeVariant().id === v.id"
                [class.text-white]="activeVariant().id === v.id"
                [class.border-white/15]="activeVariant().id !== v.id"
                [class.text-slate-300]="activeVariant().id !== v.id"
                class="px-2 py-1 rounded-lg border text-[10px] font-mono hover:text-white transition-all flex items-center gap-1"
                [title]="v.dimensionName + ': ' + v.anomalyEffect"
              >
                <span class="w-1.5 h-1.5 rounded-full" [style.backgroundColor]="v.colorHex"></span>
                <span>{{ v.dimensionName.replace('Universo ', '') }}</span>
              </button>
            }
          </div>
        </div>

      </div>

      <!-- Rodapé do Card: Preço e Comprar -->
      <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <span class="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">Preço Temporal</span>
          <div class="font-mono text-lg font-bold text-white">
            {{ store.formatPrice(product.basePriceUSD) }}
          </div>
        </div>

        <button 
          (click)="store.addToCart(product, activeVariant())"
          class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-[#d946ef] hover:to-[#3b82f6] text-white font-mono text-xs font-semibold uppercase tracking-wider border border-white/15 transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-md"
        >
          <span>Comprar</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: CatalogProduct;
  readonly store = inject(StoreService);

  readonly activeVariant = signal<ProductVariant>({} as ProductVariant);

  ngOnInit() {
    this.activeVariant.set(this.product.variants[1] || this.product.variants[0]);
  }
}
