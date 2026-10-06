import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';
import { User } from '../../models/store.models';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, GooglyEyeComponent],
  template: `
    @if (store.isAuthModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        <!-- Backdrop -->
        <div 
          (click)="store.closeAuthModal()"
          class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
        ></div>

        <!-- Auth Modal Box -->
        <div class="relative w-full max-w-lg glass-panel rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
          
          <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#d946ef]/20 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#3b82f6]/20 blur-3xl pointer-events-none"></div>

          <!-- Botão Fechar -->
          <button 
            (click)="store.closeAuthModal()"
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-xs border border-white/15 transition-all"
            aria-label="Fechar modal"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- SE O USUÁRIO JÁ ESTIVER LOGADO -->
          @if (store.currentUser(); as user) {
            <div class="space-y-6 text-center animate-fade-in">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d946ef]/15 border border-[#d946ef]/30 text-[#d946ef] font-mono text-xs uppercase tracking-widest font-bold">
                <span>Passaporte Dimensional Ativo</span>
              </div>

              <div class="flex flex-col items-center justify-center">
                <div class="relative p-2 rounded-full bg-gradient-to-tr from-[#d946ef] to-[#3b82f6] shadow-xl mb-3">
                  <div class="w-20 h-20 rounded-full bg-[#080511] flex items-center justify-center overflow-hidden">
                    <app-googly-eye [size]="48" [pair]="true"></app-googly-eye>
                  </div>
                </div>
                <h3 class="font-heading font-extrabold text-2xl text-white">{{ user.name }}</h3>
                <p class="font-mono text-xs text-[#06b6d4] mt-0.5">{{ user.email }}</p>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Origem: {{ user.originDimension }}</span>
                </div>
              </div>

              <!-- Cartão de Credenciais -->
              <div class="grid grid-cols-2 gap-3 text-left font-mono text-xs">
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span class="text-slate-400 text-[10px] block uppercase tracking-wider">Acesso</span>
                  <strong class="text-[#eab308] text-sm">{{ user.clearanceLevel }}</strong>
                </div>
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span class="text-slate-400 text-[10px] block uppercase tracking-wider">Saldo Quântico</span>
                  <strong class="text-[#d946ef] text-sm">{{ user.quantumCredits }} QC</strong>
                </div>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button 
                  (click)="store.closeAuthModal()"
                  class="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all"
                >
                  Continuar
                </button>
                <button 
                  (click)="logout()"
                  class="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold transition-all"
                >
                  Desconectar
                </button>
              </div>
            </div>
          } @else {
            <!-- SE O USUÁRIO NÃO ESTIVER LOGADO -->
            <div class="space-y-5 animate-fade-in">
              
              <!-- Cabeçalho -->
              <div class="flex items-center gap-3 pb-3 border-b border-white/10">
                <app-googly-eye [size]="34" [pair]="true"></app-googly-eye>
                <div>
                  <h3 class="font-heading font-extrabold text-xl text-white">Identidade Dimensional</h3>
                  <p class="font-mono text-xs text-slate-400">
                    Opcional: conecte-se para sincronizar seus pedidos
                  </p>
                </div>
              </div>

              <!-- Aviso Amigável de Não-Obrigatoriedade -->
              <div class="p-3 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-start gap-2.5 text-xs text-slate-300">
                <p class="leading-relaxed">
                  <strong class="text-[#06b6d4]">Acesso 100% livre:</strong> Você pode navegar pelo catálogo e comprar como <em>Viajante Anônimo</em> sem obrigação de criar conta.
                </p>
              </div>

              <!-- Alternador entre Login e Cadastro -->
              <div class="flex rounded-xl bg-black/40 p-1 border border-white/10">
                <button 
                  (click)="activeTab = 'login'"
                  [class.bg-[#d946ef]]="activeTab === 'login'"
                  [class.text-white]="activeTab === 'login'"
                  [class.text-slate-400]="activeTab !== 'login'"
                  class="flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all uppercase tracking-wider"
                >
                  Entrar
                </button>
                <button 
                  (click)="activeTab = 'register'"
                  [class.bg-[#d946ef]]="activeTab === 'register'"
                  [class.text-white]="activeTab === 'register'"
                  [class.text-slate-400]="activeTab !== 'register'"
                  class="flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all uppercase tracking-wider"
                >
                  Criar Conta
                </button>
              </div>

              <!-- FORMULÁRIO -->
              <form (ngSubmit)="submitForm()" class="space-y-3.5">
                
                @if (activeTab === 'register') {
                  <div>
                    <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                      Nome de Viajante
                    </label>
                    <input 
                      type="text" 
                      [(ngModel)]="nameInput" 
                      name="nameInput" 
                      required 
                      placeholder="ex: Alex Mercer"
                      class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                      Dimensão de Origem
                    </label>
                    <select 
                      [(ngModel)]="dimensionInput" 
                      name="dimensionInput"
                      class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none cursor-pointer"
                    >
                      <option value="Terra-001 (Realidade Padrão)">Terra-001 (Realidade Padrão)</option>
                      <option value="Terra-042 (Universo dos Olhos Sencientes)">Terra-042 (Universo dos Olhos)</option>
                      <option value="Dimensão HY7 (Universo Aquático)">Dimensão HY7 (Universo Aquático)</option>
                      <option value="Dimensão VD0 (Universo Sombrio)">Dimensão VD0 (Universo Sombrio)</option>
                    </select>
                  </div>
                }

                <div>
                  <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                    E-mail
                  </label>
                  <input 
                    type="email" 
                    [(ngModel)]="emailInput" 
                    name="emailInput" 
                    required 
                    placeholder="viajante@quantumbazaar.io"
                    class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                    Senha
                  </label>
                  <input 
                    type="password" 
                    [(ngModel)]="passwordInput" 
                    name="passwordInput" 
                    required 
                    placeholder="••••••••"
                    class="w-full bg-[#120a22] text-xs font-mono text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:border-[#d946ef] focus:outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  class="w-full py-3 rounded-xl bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] text-white font-mono text-xs uppercase font-extrabold tracking-wider shadow-lg shadow-[#d946ef]/25 hover:opacity-95 active:scale-95 transition-all mt-2"
                >
                  {{ activeTab === 'login' ? 'Autenticar' : 'Criar Passaporte' }}
                </button>
              </form>

              <!-- Acesso Rápido com Demo ou Convidado -->
              <div class="pt-3 border-t border-white/10 space-y-2.5">
                <button 
                  type="button"
                  (click)="loginDemo()"
                  class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#eab308] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Entrar com Conta de Demonstração</span>
                </button>

                <button 
                  type="button"
                  (click)="store.closeAuthModal()"
                  class="w-full py-2 text-center text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Continuar como Convidado Anônimo →
                </button>
              </div>

            </div>
          }

        </div>

      </div>
    }
  `
})
export class AuthModalComponent {
  readonly store = inject(StoreService);

  activeTab: 'login' | 'register' = 'login';
  nameInput: string = '';
  emailInput: string = '';
  dimensionInput: string = 'Terra-001 (Realidade Padrão)';
  passwordInput: string = '';

  submitForm() {
    if (!this.emailInput || !this.passwordInput) {
      this.store.showToast('Campos Incompletos', 'Por favor, preencha o e-mail e a senha.', 'warning');
      return;
    }

    const userName = this.nameInput || this.emailInput.split('@')[0];
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userName,
      email: this.emailInput,
      originDimension: this.dimensionInput,
      clearanceLevel: 'Viajante Alfa',
      quantumCredits: 250,
    };

    this.store.loginUser(newUser);
    this.store.closeAuthModal();
    this.store.showToast('Login Realizado', `Bem-vindo(a), ${newUser.name}.`, 'success');
  }

  loginDemo() {
    const demoUser: User = {
      id: 'usr-evelyn-042',
      name: 'Evelyn Wang',
      email: 'evelyn@multiverso.io',
      originDimension: 'Terra-042 (Universo dos Olhos)',
      clearanceLevel: 'Navegadora Suprema',
      quantumCredits: 888,
    };

    this.store.loginUser(demoUser);
    this.store.closeAuthModal();
    this.store.showToast('Modo Demonstração', 'Você está conectado como Evelyn Wang.', 'success');
  }

  logout() {
    this.store.logoutUser();
    this.store.closeAuthModal();
  }
}
