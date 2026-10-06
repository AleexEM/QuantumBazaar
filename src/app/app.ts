import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MastermindPillarsComponent } from './components/mastermind-pillars/mastermind-pillars.component';
import { QuickViewModalComponent } from './components/quick-view-modal/quick-view-modal.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';
import { FloatingDockComponent } from './components/floating-dock/floating-dock.component';
import { ToastComponent } from './components/toast/toast.component';
import { GooglyEyeComponent } from './components/googly-eye/googly-eye.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    CatalogComponent,
    MastermindPillarsComponent,
    QuickViewModalComponent,
    CartDrawerComponent,
    CheckoutModalComponent,
    FloatingDockComponent,
    ToastComponent,
    GooglyEyeComponent,
    AuthModalComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
