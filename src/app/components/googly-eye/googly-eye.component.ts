import { Component, ElementRef, HostListener, Input, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-googly-eye',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="eye-container flex items-center justify-center select-none cursor-pointer group"
      [style.width.px]="size"
      [style.height.px]="size"
      (click)="triggerBlink()"
      [title]="'Interactive Quantum Observer Eye (Click to blink)'"
    >
      <!-- Pair Mode or Single Mode -->
      @if (pair) {
        <div class="flex items-center gap-1.5 sm:gap-2.5">
          <!-- Left Eye -->
          <div 
            #leftEye
            class="eye-sclera relative rounded-full bg-gradient-to-b from-white via-[#f1f5f9] to-[#cbd5e1] border border-black/20 overflow-hidden shadow-2xl transition-transform duration-150 group-hover:scale-105"
            [style.width.px]="size * 0.48"
            [style.height.px]="size * 0.48"
            [class.blinking]="isBlinking()"
          >
            <!-- Sclera Rim Glow / 3D Specular ring -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/70 pointer-events-none"></div>
            
            <!-- Pupil with Glare -->
            <div 
              class="pupil absolute rounded-full bg-[#0a0614] transition-all duration-75 ease-out shadow-inner flex items-center justify-center"
              [style.width.px]="size * 0.48 * pupilRatio"
              [style.height.px]="size * 0.48 * pupilRatio"
              [style.left.px]="leftPupilX()"
              [style.top.px]="leftPupilY()"
            >
              <!-- Specular Light Reflection (fixed to upper-right light source) -->
              <div class="specular-glare absolute top-1 right-1 w-2 h-2 rounded-full bg-white/90 shadow-sm pointer-events-none"></div>
              <div class="specular-glare-micro absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-white/50 pointer-events-none"></div>
            </div>

            <!-- Prismatic Edge Refraction -->
            <div class="absolute inset-0 rounded-full border border-[#d946ef]/30 pointer-events-none"></div>
          </div>

          <!-- Right Eye -->
          <div 
            #rightEye
            class="eye-sclera relative rounded-full bg-gradient-to-b from-white via-[#f1f5f9] to-[#cbd5e1] border border-black/20 overflow-hidden shadow-2xl transition-transform duration-150 group-hover:scale-105"
            [style.width.px]="size * 0.48"
            [style.height.px]="size * 0.48"
            [class.blinking]="isBlinking()"
          >
            <!-- Sclera Rim Glow / 3D Specular ring -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/70 pointer-events-none"></div>
            
            <!-- Pupil with Glare -->
            <div 
              class="pupil absolute rounded-full bg-[#0a0614] transition-all duration-75 ease-out shadow-inner flex items-center justify-center"
              [style.width.px]="size * 0.48 * pupilRatio"
              [style.height.px]="size * 0.48 * pupilRatio"
              [style.left.px]="rightPupilX()"
              [style.top.px]="rightPupilY()"
            >
              <!-- Specular Light Reflection -->
              <div class="specular-glare absolute top-1 right-1 w-2 h-2 rounded-full bg-white/90 shadow-sm pointer-events-none"></div>
              <div class="specular-glare-micro absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-white/50 pointer-events-none"></div>
            </div>

            <!-- Prismatic Edge Refraction -->
            <div class="absolute inset-0 rounded-full border border-[#3b82f6]/30 pointer-events-none"></div>
          </div>
        </div>
      } @else {
        <!-- Single Big Eye -->
        <div 
          #singleEye
          class="eye-sclera relative rounded-full bg-gradient-to-b from-white via-[#f8fafc] to-[#cbd5e1] border border-black/20 overflow-hidden shadow-2xl transition-transform duration-150 group-hover:scale-105"
          [style.width.px]="size"
          [style.height.px]="size"
          [class.blinking]="isBlinking()"
        >
          <!-- 3D Convex Lens Effect -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-black/30 via-transparent to-white/90 pointer-events-none"></div>
          <div class="absolute inset-1 rounded-full bg-radial from-transparent via-transparent to-black/10 pointer-events-none"></div>
          
          <!-- Moving Pupil -->
          <div 
            class="pupil absolute rounded-full bg-[#0a0614] transition-all duration-75 ease-out shadow-lg flex items-center justify-center"
            [style.width.px]="size * pupilRatio"
            [style.height.px]="size * pupilRatio"
            [style.left.px]="singlePupilX()"
            [style.top.px]="singlePupilY()"
          >
            <!-- Primary Light Reflection -->
            <div class="specular-glare absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-white shadow-sm pointer-events-none"></div>
            <!-- Secondary Light Reflection -->
            <div class="specular-glare-micro absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-white/60 pointer-events-none"></div>
          </div>

          <!-- Prismatic Refraction Ring -->
          <div class="absolute inset-0 rounded-full border border-[#d946ef]/40 pointer-events-none"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    .eye-sclera {
      box-shadow: 
        0 10px 25px -5px rgba(0, 0, 0, 0.5),
        0 0 15px rgba(217, 70, 239, 0.25),
        inset 0 -4px 8px rgba(0, 0, 0, 0.2),
        inset 0 4px 8px rgba(255, 255, 255, 0.8);
    }

    .blinking {
      animation: blinkAnimation 0.22s ease-in-out;
    }

    @keyframes blinkAnimation {
      0% { transform: scaleY(1); }
      50% { transform: scaleY(0.08); }
      100% { transform: scaleY(1); }
    }
  `]
})
export class GooglyEyeComponent implements OnInit {
  @Input() size: number = 44; // Total width/height in px
  @Input() pair: boolean = true; // Two eyes side-by-side or single large eye
  @Input() pupilRatio: number = 0.52; // Pupil diameter relative to sclera

  readonly leftPupilX = signal<number>(0);
  readonly leftPupilY = signal<number>(0);
  readonly rightPupilX = signal<number>(0);
  readonly rightPupilY = signal<number>(0);
  readonly singlePupilX = signal<number>(0);
  readonly singlePupilY = signal<number>(0);

  readonly isBlinking = signal<boolean>(false);

  private readonly leftEyeRef = viewChild<ElementRef>('leftEye');
  private readonly rightEyeRef = viewChild<ElementRef>('rightEye');
  private readonly singleEyeRef = viewChild<ElementRef>('singleEye');

  ngOnInit() {
    // Initial center resting positions
    this.centerPupils();
  }

  private centerPupils() {
    if (this.pair) {
      const eyeW = this.size * 0.48;
      const pupilW = eyeW * this.pupilRatio;
      const center = (eyeW - pupilW) / 2;
      this.leftPupilX.set(center);
      this.leftPupilY.set(center);
      this.rightPupilX.set(center);
      this.rightPupilY.set(center);
    } else {
      const eyeW = this.size;
      const pupilW = eyeW * this.pupilRatio;
      const center = (eyeW - pupilW) / 2;
      this.singlePupilX.set(center);
      this.singlePupilY.set(center);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.pair) {
      this.trackEye(this.leftEyeRef()?.nativeElement, event.clientX, event.clientY, (x, y) => {
        this.leftPupilX.set(x);
        this.leftPupilY.set(y);
      }, this.size * 0.48);

      this.trackEye(this.rightEyeRef()?.nativeElement, event.clientX, event.clientY, (x, y) => {
        this.rightPupilX.set(x);
        this.rightPupilY.set(y);
      }, this.size * 0.48);
    } else {
      this.trackEye(this.singleEyeRef()?.nativeElement, event.clientX, event.clientY, (x, y) => {
        this.singlePupilX.set(x);
        this.singlePupilY.set(y);
      }, this.size);
    }
  }

  private trackEye(
    eyeEl: HTMLElement | undefined,
    mouseX: number,
    mouseY: number,
    updateFn: (x: number, y: number) => void,
    eyeSize: number
  ) {
    if (!eyeEl) return;

    const rect = eyeEl.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.hypot(deltaX, deltaY);

    const pupilSize = eyeSize * this.pupilRatio;
    const maxRadius = (eyeSize - pupilSize) / 2;

    // Smooth nonlinear constraint so pupil moves freely inside the rim
    const travel = Math.min(distance * 0.12, maxRadius);

    const pupilX = (eyeSize - pupilSize) / 2 + Math.cos(angle) * travel;
    const pupilY = (eyeSize - pupilSize) / 2 + Math.sin(angle) * travel;

    updateFn(pupilX, pupilY);
  }

  triggerBlink() {
    this.isBlinking.set(true);
    setTimeout(() => this.isBlinking.set(false), 240);
  }
}
