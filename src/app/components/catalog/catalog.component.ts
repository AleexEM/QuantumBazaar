import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section id="catalogo" class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabeçalho do Catálogo -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d946ef]/15 border border-[#d946ef]/30 text-[#d946ef] font-mono text-xs uppercase tracking-wider mb-3">
              <span>Catálogo // 10 Itens Cotidianos</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Sobrecarga de <span class="holo-text">Realidades Paralelas</span>
            </h2>
            <p class="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Explore os 10 objetos comuns do dia a dia e desdobre cada um em suas respectivas variantes de universos alternativos.
            </p>
          </div>

          <!-- Barra de Busca -->
          <div class="relative w-full md:w-80">
            <input 
              type="text"
              [value]="store.searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Filtrar por nome ou anomalia..."
              class="w-full bg-[#120b22] text-xs font-mono text-white placeholder-slate-400 rounded-2xl px-4 py-3 pl-10 border border-white/15 focus:outline-none focus:border-[#d946ef] transition-colors"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            @if (store.searchQuery()) {
              <button 
                (click)="clearSearch()"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-mono"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            }
          </div>
        </div>

        <!-- Filtros por Categoria -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          @for (filter of categoryFilters; track filter.id) {
            <button 
              (click)="store.selectedCategoryFilter.set(filter.id)"
              [class.bg-[#d946ef]]="store.selectedCategoryFilter() === filter.id"
              [class.text-white]="store.selectedCategoryFilter() === filter.id"
              [class.border-[#d946ef]]="store.selectedCategoryFilter() === filter.id"
              [class.bg-white/5]="store.selectedCategoryFilter() !== filter.id"
              [class.text-slate-300]="store.selectedCategoryFilter() !== filter.id"
              [class.border-white/10]="store.selectedCategoryFilter() !== filter.id"
              class="px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap border hover:border-[#d946ef]/60 hover:text-white transition-all active:scale-95 uppercase tracking-wider"
            >
              {{ filter.label }}
            </button>
          }
        </div>

        <!-- Grid dos 10 Produtos Exatos -->
        @if (store.filteredProducts().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (product of store.filteredProducts(); track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        } @else {
          <div class="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <h3 class="text-lg font-heading font-bold text-white">Nenhum objeto encontrado</h3>
            <p class="text-xs text-slate-400 font-mono">
              Nenhum item correspondeu a "{{ store.searchQuery() }}".
            </p>
            <button 
              (click)="resetFilters()"
              class="px-4 py-2 rounded-xl bg-[#d946ef] text-white text-xs font-mono font-bold"
            >
              Restaurar Filtros
            </button>
          </div>
        }

      </div>
    </section>
  `
})
export class CatalogComponent {
  readonly store = inject(StoreService);

  readonly categoryFilters = [
    { id: 'all', label: 'Todos os 10 Objetos' },
    { id: 'essenciais', label: 'Essenciais (Isqueiro, Caderno, Escova)' },
    { id: 'utilitarios', label: 'Utilitários (Guarda-Chuva, Caneca)' },
    { id: 'vestuario', label: 'Vestuário (Óculos, Mochila)' },
    { id: 'instrumentos', label: 'Instrumentos (Fones, Relógio)' },
    { id: 'conforto', label: 'Conforto (Travesseiro)' },
  ];

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.store.searchQuery.set(input.value);
  }

  clearSearch() {
    this.store.searchQuery.set('');
  }

  resetFilters() {
    this.store.searchQuery.set('');
    this.store.selectedCategoryFilter.set('all');
  }
}
