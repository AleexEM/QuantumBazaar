import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-floating-dock',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    <div class="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div class="pointer-events-auto glass-panel rounded-full px-4 py-2 border border-white/20 shadow-2xl flex items-center gap-2 sm:gap-4 bg-[#0a0714]/95 backdrop-blur-2xl">
        
        <!-- Topo -->
        <a 
          href="#hero" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm"
          title="Início"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>

        <!-- Catálogo -->
        <a 
          href="#catalogo" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-[#d946ef] hover:bg-[#d946ef]/10 transition-all text-sm"
          title="Catálogo Multiversal"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </a>

        <!-- Salto Aleatório -->
        <button 
          (click)="store.triggerRandomVerseJump()"
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-[#eab308] hover:bg-[#eab308]/10 transition-all text-sm"
          title="Salto Dimensional Aleatório"
        >
          <svg class="w-4 h-4 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <!-- Botão Login / Passport no Dock -->
        <button 
          (click)="store.openAuthModal()"
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all text-sm"
          [title]="store.currentUser() ? 'Ver Identidade' : 'Login Opcional'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        <div class="w-px h-6 bg-white/15"></div>

        <!-- Mini Olho de Boneco Consciente no Dock -->
        <div class="px-1 py-0.5" title="Olho de Boneco Observador">
          <app-googly-eye [size]="28" [pair]="false"></app-googly-eye>
        </div>

        <div class="w-px h-6 bg-white/15"></div>

        <!-- Abrir Cofre -->
        <button 
          (click)="store.openCart()"
          class="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-[#d946ef]/30 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Cofre</span>
          @if (store.cartCount() > 0) {
            <span class="w-4 h-4 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">
              {{ store.cartCount() }}
            </span>
          }
        </button>

      </div>
    </div>
  `
})
export class FloatingDockComponent {
  readonly store = inject(StoreService);
}
