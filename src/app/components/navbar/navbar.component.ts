import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';
import { CurrencyCode } from '../../models/store.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    <header class="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080511]/90 backdrop-blur-xl transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        <!-- Logo com Olho de Boneco Interativo -->
        <a href="#hero" class="flex items-center gap-3.5 group cursor-pointer text-decoration-none">
          <div class="relative p-1.5 rounded-2xl bg-gradient-to-tr from-[#d946ef]/20 via-[#3b82f6]/20 to-transparent border border-white/10 group-hover:border-[#d946ef]/50 transition-all duration-300 shadow-sm">
            <app-googly-eye [size]="44" [pair]="true"></app-googly-eye>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-[#d946ef] transition-colors">
                QUANTUM<span class="text-[#d946ef]">BAZAAR</span>
              </span>
              <span class="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/15 font-semibold tracking-widest">
                ED. 2026
              </span>
            </div>
            <p class="text-[10px] font-mono text-slate-400 tracking-widest hidden sm:block uppercase">
              Sobrecarga de Realidades // Catálogo Conceitual
            </p>
          </div>
        </a>

        <!-- Links de Navegação -->
        <nav class="hidden md:flex items-center gap-1 font-medium text-xs font-mono uppercase tracking-wider text-slate-300">
          <a href="#catalogo" class="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-colors">
            Catálogo
          </a>
          <a href="#como-funciona" class="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-colors">
            Mecânica
          </a>
          <a href="#dimensoes" class="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#d946ef] animate-pulse"></span>
            As 6 Dimensões
          </a>
          <a href="#depoimentos" class="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-colors">
            Relatos
          </a>
        </nav>

        <!-- Botões e Moeda -->
        <div class="flex items-center gap-2.5">
          
          <!-- Botão de Salto Dimensional Rápido (Verse-Jump) com SVG minimalista -->
          <button 
            (click)="store.triggerRandomVerseJump()"
            class="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono font-medium transition-all hover:border-[#eab308]/50 active:scale-95"
            title="Sorteia uma realidade alternativa aleatória"
          >
            <svg class="w-3.5 h-3.5 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Salto Aleatório</span>
          </button>

          <!-- Seletor de Moeda Interdimensional -->
          <div class="relative">
            <select 
              [value]="store.currentCurrency()" 
              (change)="onCurrencyChange($event)"
              class="appearance-none bg-[#120b22] text-xs font-mono text-slate-200 border border-white/15 rounded-xl px-3 py-2 pr-7 hover:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] cursor-pointer"
            >
              <option value="BRL">BRL (R$)</option>
              <option value="USD">USD ($)</option>
              <option value="ETH">ETH (Ξ)</option>
              <option value="QC">QC (Credits)</option>
            </select>
            <div class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Botão de Login Opcional / Perfil do Usuário com SVG -->
          @if (store.currentUser(); as user) {
            <button 
              (click)="store.openAuthModal()"
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#d946ef]/15 hover:bg-[#d946ef]/25 border border-[#d946ef]/30 text-white font-mono text-xs transition-all active:scale-95"
              [title]="'Passaporte de ' + user.name + ' (' + user.originDimension + ')'"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span class="font-bold max-w-[85px] truncate hidden sm:inline">{{ user.name }}</span>
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          } @else {
            <button 
              (click)="store.openAuthModal()"
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-mono text-xs transition-all active:scale-95"
              title="Acesso Opcional de Viajante"
            >
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="hidden sm:inline">Identidade</span>
            </button>
          }

          <!-- Botão do Carrinho (Cofre Quântico) -->
          <button 
            (click)="store.openCart()"
            class="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Abrir Cofre Quântico"
          >
            <svg class="w-4 h-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (store.cartCount() > 0) {
              <span class="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#d946ef] text-white font-mono text-[10px] font-bold shadow-md">
                {{ store.cartCount() }}
              </span>
            }
          </button>

        </div>

      </div>
    </header>
  `
})
export class NavbarComponent {
  readonly store = inject(StoreService);

  onCurrencyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.store.setCurrency(target.value as CurrencyCode);
  }
}
