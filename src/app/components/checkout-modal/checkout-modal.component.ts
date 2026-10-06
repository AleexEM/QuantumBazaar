import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, GooglyEyeComponent],
  template: `
    @if (store.isCheckoutOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        <!-- Backdrop -->
        <div 
          (click)="store.closeCheckout()"
          class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        ></div>

        <!-- Caixa de Checkout -->
        <div class="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 z-10 my-8">
          
          <!-- Botão Fechar -->
          <button 
            (click)="store.closeCheckout()"
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-xs border border-white/15"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- Cabeçalho do Checkout -->
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div class="flex items-center gap-3">
              <app-googly-eye [size]="36" [pair]="true"></app-googly-eye>
              <div>
                <h3 class="font-heading font-extrabold text-xl text-white">Teleporte e Entrega</h3>
                <p class="font-mono text-xs text-[#d946ef] uppercase tracking-wider">Liquidação Dimensional</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold" [class.bg-[#d946ef]]="step() === 1" [class.bg-white/10]="step() !== 1">1</div>
              <div class="w-4 h-0.5 bg-white/20"></div>
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold" [class.bg-[#d946ef]]="step() === 2" [class.bg-white/10]="step() !== 2">2</div>
              <div class="w-4 h-0.5 bg-white/20"></div>
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold" [class.bg-emerald-500]="step() === 3" [class.bg-white/10]="step() !== 3">3</div>
            </div>
          </div>

          <!-- Etapa 1: Dados do Viajante e Destino -->
          @if (step() === 1) {
            <form (ngSubmit)="goToStep2()" class="space-y-4">
              
              @if (store.currentUser(); as user) {
                <div class="p-3 rounded-xl bg-[#d946ef]/10 border border-[#d946ef]/30 flex items-center justify-between text-xs font-mono">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Identificado como: <strong>{{ user.name }}</strong> ({{ user.originDimension }})</span>
                  </div>
                  <span class="text-[10px] text-slate-400">Preenchido</span>
                </div>
              }

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.name" 
                    name="name" 
                    required 
                    placeholder="ex: Alex Mercer"
                    class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">E-mail para Despacho</label>
                  <input 
                    type="email" 
                    [(ngModel)]="formData.email" 
                    name="email" 
                    required 
                    placeholder="viajante@quantumbazaar.io"
                    class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Endereço de Entrega Tridimensional</label>
                <input 
                  type="text" 
                  [(ngModel)]="formData.address" 
                  name="address" 
                  required
                  placeholder="Av. Paulista, 1000 - Apto 42, São Paulo - SP"
                  class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                />
              </div>

              <div class="pt-4 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-400">Total: <strong class="text-[#d946ef]">{{ store.formatPrice(store.cartTotalUSD()) }}</strong></span>
                <button 
                  type="submit"
                  class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white font-mono text-xs uppercase font-bold tracking-wider hover:opacity-95"
                >
                  Continuar para Pagamento →
                </button>
              </div>
            </form>
          }

          <!-- Etapa 2: Forma de Pagamento -->
          @if (step() === 2) {
            <div class="space-y-5">
              <span class="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">Canal de Liquidação:</span>
              
              <div class="grid grid-cols-2 gap-3">
                <button 
                  (click)="paymentMethod = 'pix'"
                  [class.border-[#d946ef]]="paymentMethod === 'pix'"
                  [class.bg-[#d946ef]/15]="paymentMethod === 'pix'"
                  class="p-4 rounded-2xl bg-white/5 border border-white/15 text-left transition-all"
                >
                  <div class="font-bold text-sm text-white">PIX Instantâneo</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-1">Aprovação em 2 segundos</div>
                </button>

                <button 
                  (click)="paymentMethod = 'card'"
                  [class.border-[#d946ef]]="paymentMethod === 'card'"
                  [class.bg-[#d946ef]/15]="paymentMethod === 'card'"
                  class="p-4 rounded-2xl bg-white/5 border border-white/15 text-left transition-all"
                >
                  <div class="font-bold text-sm text-white">Cartão de Crédito</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-1">Até 12 parcelas</div>
                </button>

                <button 
                  (click)="paymentMethod = 'crypto'"
                  [class.border-[#d946ef]]="paymentMethod === 'crypto'"
                  [class.bg-[#d946ef]/15]="paymentMethod === 'crypto'"
                  class="p-4 rounded-2xl bg-white/5 border border-white/15 text-left transition-all"
                >
                  <div class="font-bold text-sm text-white">Web3 / Ethereum</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-1">Contrato Inteligente</div>
                </button>

                <button 
                  (click)="paymentMethod = 'qc'"
                  [class.border-[#d946ef]]="paymentMethod === 'qc'"
                  [class.bg-[#d946ef]/15]="paymentMethod === 'qc'"
                  class="p-4 rounded-2xl bg-white/5 border border-white/15 text-left transition-all"
                >
                  <div class="font-bold text-sm text-white">Quantum Credits</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-1">Saldo Multiversal</div>
                </button>
              </div>

              <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400">Total a Pagar:</span>
                <span class="text-lg font-bold text-[#d946ef]">{{ store.formatPrice(store.cartTotalUSD()) }}</span>
              </div>

              <div class="flex items-center justify-between pt-2">
                <button 
                  (click)="step.set(1)"
                  class="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  ← Voltar
                </button>
                <button 
                  (click)="processPayment()"
                  [disabled]="isProcessing()"
                  class="px-8 py-3 rounded-xl bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#eab308] text-white font-mono text-xs uppercase font-extrabold tracking-wider hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#d946ef]/25"
                >
                  @if (isProcessing()) {
                    <span>Sintonizando Feixe de Teleporte...</span>
                  } @else {
                    <span>Autorizar {{ store.formatPrice(store.cartTotalUSD()) }}</span>
                  }
                </button>
              </div>
            </div>
          }

          <!-- Etapa 3: Confirmação de Sucesso -->
          @if (step() === 3) {
            <div class="py-8 text-center space-y-5 animate-fade-in">
              <div class="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto">
                OK
              </div>

              <div>
                <h3 class="font-heading font-black text-2xl text-white">Teleporte Concluído</h3>
                <p class="font-mono text-xs text-emerald-400 mt-1">Protocolo: #QB-{{ orderId }}</p>
              </div>

              <p class="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Confirmado para <strong>{{ formData.name }}</strong>. Os objetos selecionados foram encapsulados para entrega em <strong>{{ formData.address }}</strong>.
              </p>

              <div class="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto font-mono text-xs text-slate-300 text-left space-y-1">
                <div>Status: <span class="text-emerald-400 font-bold">DESPACHO AUTORIZADO</span></div>
                <div>Canal: <span class="text-[#d946ef] uppercase">{{ paymentMethod }}</span></div>
                <div>Comprovante: <span class="text-white">{{ formData.email }}</span></div>
              </div>

              <button 
                (click)="finishOrder()"
                class="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase font-bold border border-white/15"
              >
                Voltar à QuantumBazaar
              </button>
            </div>
          }

        </div>

      </div>
    }
  `
})
export class CheckoutModalComponent {
  readonly store = inject(StoreService);

  readonly step = signal<number>(1);
  readonly isProcessing = signal<boolean>(false);
  paymentMethod: 'card' | 'pix' | 'crypto' | 'qc' = 'pix';
  orderId = Math.floor(100000 + Math.random() * 900000);

  formData = {
    name: '',
    email: '',
    address: ''
  };

  ngOnInit() {
    const user = this.store.currentUser();
    if (user) {
      this.formData.name = user.name;
      this.formData.email = user.email;
    }
  }

  goToStep2() {
    if (!this.formData.name || !this.formData.email) {
      this.store.showToast('Formulário Incompleto', 'Por favor, informe seu nome e e-mail.', 'warning');
      return;
    }
    this.step.set(2);
  }

  processPayment() {
    this.isProcessing.set(true);
    setTimeout(() => {
      this.isProcessing.set(false);
      this.step.set(3);
      this.store.clearCart();
      this.store.showToast('Teleporte Confirmado', `Comprovante #QB-${this.orderId} emitido.`, 'success');
    }, 1200);
  }

  finishOrder() {
    this.store.closeCheckout();
    this.step.set(1);
  }
}
