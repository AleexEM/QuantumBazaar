import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      @for (toast of store.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl flex items-start gap-3 animate-fade-in transition-all"
          [class.border-[#d946ef]]="toast.type === 'success'"
          [class.border-[#3b82f6]]="toast.type === 'info'"
          [class.border-[#eab308]]="toast.type === 'warning'"
        >
          <div class="w-2 h-2 rounded-full mt-1.5"
            [class.bg-[#d946ef]]="toast.type === 'success'"
            [class.bg-[#3b82f6]]="toast.type === 'info'"
            [class.bg-[#eab308]]="toast.type === 'warning'"
          ></div>

          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider">{{ toast.title }}</h4>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">{{ toast.message }}</p>
          </div>

          <button 
            (click)="store.removeToast(toast.id)"
            class="text-xs font-mono text-slate-400 hover:text-white"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  readonly store = inject(StoreService);
}
