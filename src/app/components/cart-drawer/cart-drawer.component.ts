import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    @if (store.isCartOpen()) {
      <div class="fixed inset-0 z-50 overflow-hidden">
        
        <!-- Backdrop -->
        <div 
          (click)="store.closeCart()"
          class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        ></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md glass-panel border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl relative">
            
            <!-- Cabeçalho -->
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-white/10">
                <div class="flex items-center gap-3">
                  <app-googly-eye [size]="34" [pair]="true"></app-googly-eye>
                  <div>
                    <h3 class="font-heading font-bold text-lg text-white">Cofre Dimensional</h3>
                    <span class="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      {{ store.cartCount() }} {{ store.cartCount() === 1 ? 'item guardado' : 'itens guardados' }}
                    </span>
                  </div>
                </div>

                <button 
                  (click)="store.closeCart()"
                  class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-mono text-xs border border-white/10"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <!-- Lista de Itens no Carrinho -->
              <div class="mt-6 space-y-4 max-h-[48vh] overflow-y-auto pr-1">
                @if (store.cartItems().length === 0) {
                  <div class="py-12 text-center space-y-3">
                    <p class="font-heading text-sm text-white font-semibold">Seu cofre está vazio</p>
                    <p class="text-xs text-slate-400 font-mono">Explore o catálogo para adicionar variações do multiverso.</p>
                  </div>
                } @else {
                  @for (ci of store.cartItems(); track ci.product.id + ci.selectedVariant.id; let idx = $index) {
                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                      
                      <!-- Ícone / Thumbnail -->
                      <div class="w-14 h-14 rounded-xl bg-[#150f28] border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        @if (ci.selectedVariant.imageUrl) {
                          <img [src]="ci.selectedVariant.imageUrl" [alt]="ci.product.name" class="w-full h-full object-cover"/>
                        } @else {
                          <app-googly-eye [size]="28" [pair]="false"></app-googly-eye>
                        }
                      </div>

                      <!-- Detalhes -->
                      <div class="flex-1 min-w-0">
                        <h4 class="text-xs font-bold text-white truncate">{{ ci.product.name }}</h4>
                        <span class="text-[10px] font-mono text-[#06b6d4] block truncate">
                          {{ ci.selectedVariant.dimensionName }} ({{ ci.selectedVariant.dimensionCode }})
                        </span>
                        <span class="text-xs font-mono font-bold text-[#d946ef]">
                          {{ store.formatPrice(ci.product.basePriceUSD) }}
                        </span>
                      </div>

                      <!-- Controles de Quantidade -->
                      <div class="flex items-center gap-2">
                        <div class="flex items-center rounded-lg bg-black/40 border border-white/10">
                          <button 
                            (click)="store.updateQuantity(idx, -1)"
                            class="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span class="px-2 font-mono text-xs text-white font-bold">{{ ci.quantity }}</span>
                          <button 
                            (click)="store.updateQuantity(idx, 1)"
                            class="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button 
                          (click)="store.removeItem(idx)"
                          class="text-xs text-slate-400 hover:text-rose-400 px-1"
                          title="Remover"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>

                    </div>
                  }
                }
              </div>
            </div>

            <!-- Rodapé do Carrinho com Cupom e Checkout -->
            <div class="pt-4 border-t border-white/10 space-y-4">
              
              <div class="flex items-center gap-2">
                <input 
                  type="text"
                  [value]="couponInput()"
                  (input)="couponInput.set($any($event.target).value)"
                  placeholder="Cupom: TUDOAOMESMOTEMPO"
                  class="flex-1 bg-[#120a22] text-xs font-mono text-white placeholder-slate-500 rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#d946ef]"
                />
                <button 
                  (click)="applyCoupon()"
                  class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/15 uppercase tracking-wider"
                >
                  Aplicar
                </button>
              </div>

              <div class="space-y-1.5 text-xs font-mono">
                <div class="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span class="text-white">{{ store.formatPrice(store.cartSubtotalUSD()) }}</span>
                </div>

                @if (store.appliedDiscountPercent() > 0) {
                  <div class="flex justify-between text-emerald-400 font-bold">
                    <span>Desconto ({{ store.appliedCouponCode() }} -{{ store.appliedDiscountPercent() }}%)</span>
                    <span>-{{ store.formatPrice(store.cartDiscountUSD()) }}</span>
                  </div>
                }

                <div class="flex justify-between text-slate-400">
                  <span>Teleporte</span>
                  <span class="text-emerald-400 uppercase font-bold">Grátis</span>
                </div>

                <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Final</span>
                  <span class="text-[#d946ef] font-black text-lg">
                    {{ store.formatPrice(store.cartTotalUSD()) }}
                  </span>
                </div>
              </div>

              <button 
                (click)="store.openCheckout()"
                [disabled]="store.cartItems().length === 0"
                class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d946ef]/25 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
              >
                <span>Finalizar Teleporte</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

            </div>

          </div>
        </div>

      </div>
    }
  `
})
export class CartDrawerComponent {
  readonly store = inject(StoreService);
  readonly couponInput = signal<string>('');

  applyCoupon() {
    if (this.couponInput()) {
      this.store.applyCoupon(this.couponInput());
    }
  }
}
