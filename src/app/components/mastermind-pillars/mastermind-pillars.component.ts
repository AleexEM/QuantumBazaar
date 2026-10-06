import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { GooglyEyeComponent } from '../googly-eye/googly-eye.component';

@Component({
  selector: 'app-mastermind-pillars',
  standalone: true,
  imports: [CommonModule, GooglyEyeComponent],
  template: `
    <!-- Seção: Como Funciona o Multiverso da QuantumBazaar -->
    <section id="como-funciona" class="py-20 relative bg-scanlines">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Título -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d946ef]/15 border border-[#d946ef]/30 text-[#d946ef] font-mono text-xs uppercase tracking-widest font-bold">
            <app-googly-eye [size]="18" [pair]="true"></app-googly-eye>
            <span>Mecânica do Multiverso</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Como Funciona a <span class="holo-text">QuantumBazaar</span>?
          </h2>
          <p class="text-base text-slate-300 leading-relaxed font-light">
            Inspirada na teoria dos muitos mundos: nós não inventamos novos produtos; nós importamos os objetos comuns do cotidiano de dimensões onde as propriedades da matéria foram alteradas.
          </p>
        </div>

        <!-- 3 Passos da Experiência Multiversal -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          <div class="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#06b6d4] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              01
            </div>
            <h3 class="font-heading text-xl font-bold text-white">Escolha o Objeto Base</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Um isqueiro, uma caneca de café, um guarda-chuva ou um caderno. O mesmo item que você encontra em qualquer lugar da Terra-001.
            </p>
          </div>

          <div class="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d946ef] to-[#ec4899] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              02
            </div>
            <h3 class="font-heading text-xl font-bold text-white">Desdobre as Dimensões</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Analise as versões paralelas: chamas negras de absorção, canecas congelantes de nevasca ou mochilas com o fundo infinito.
            </p>
          </div>

          <div class="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#eab308] to-[#f59e0b] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              03
            </div>
            <h3 class="font-heading text-xl font-bold text-white">Teleporte Interdimensional</h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pagamento instantâneo via PIX, Cartão ou Cripto. O item é despachado com segurança direto para o seu endereço tridimensional.
            </p>
          </div>

        </div>

        <!-- As 6 Dimensões Principais do Multiverso -->
        <div id="dimensoes" class="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 relative overflow-hidden">
          
          <div class="max-w-3xl space-y-3 mb-8">
            <span class="font-mono text-xs uppercase tracking-widest text-[#06b6d4] font-bold">
              Atlas das Dimensões
            </span>
            <h3 class="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              Assinaturas Físicas das Realidades Catalogadas
            </h3>
            <p class="text-xs sm:text-sm text-slate-300">
              Cada universo alternativo altera o comportamento do objeto por meio de leis térmicas, quânticas ou ópticas exclusivas:
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div class="p-4 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/25 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo Aquático</span>
                <span class="font-mono text-[10px] text-[#06b6d4] font-bold">#06b6d4</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Toda combustão se converte em jatos de água e fluidos frios sob pressão.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-[#0f0b1a] border border-white/15 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo Sombrio / Vazio</span>
                <span class="font-mono text-[10px] text-slate-400 font-bold">#0f0b1a</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                A matéria absorve luminosidade e gera sensação de vácuo existencial.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-[#d946ef]/10 border border-[#d946ef]/25 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo de Vidro Orgânico</span>
                <span class="font-mono text-[10px] text-[#d946ef] font-bold">#d946ef</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Materiais translúcidos que barram a chuva física, mas deixam fluir chuvas emocionais.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-white/5 border border-white/15 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo dos Olhos Sencientes</span>
                <span class="font-mono text-[10px] text-emerald-400 font-bold">#f8fafc</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Objetos ganham olhos de boneco hiper-expressivos que acompanham o observador.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-[#3b82f6]/10 border border-[#3b82f6]/25 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo Térmico-Inverso</span>
                <span class="font-mono text-[10px] text-[#3b82f6] font-bold">#3b82f6</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                Líquidos quentes entram em congelamento absoluto e emitem nevascas compactas.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-[#eab308]/10 border border-[#eab308]/25 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-heading font-bold text-white text-sm">Universo Elástico-Temporal</span>
                <span class="font-mono text-[10px] text-[#eab308] font-bold">#eab308</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                A passagem dos minutos se molda de acordo com o nível de tédio do observador.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class MastermindPillarsComponent {
  readonly store = inject(StoreService);
}
